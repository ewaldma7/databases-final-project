import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest) {
  try {
    const batterName = request.nextUrl.searchParams.get("BatterName");
    const attendedCollege = request.nextUrl.searchParams.get("AttendedCollege");
    const minPA = Number(request.nextUrl.searchParams.get("MinPA"));
    const pitcherHandedness = request.nextUrl.searchParams.get("Handedness");
    const minAge = Number(request.nextUrl.searchParams.get("MinAge"));
    const isActivePitcher = request.nextUrl.searchParams.get("Active");

    console.log('Batter Name:', batterName);
    console.log('Attended College:', attendedCollege);
    console.log('Min PA:', minPA);
    console.log('Pitcher Handedness Value:', pitcherHandedness);
    console.log('Min Age:', minAge);
    console.log('Is Active Pitcher:', isActivePitcher);
    
    // const strikeouts = Number(request.nextUrl.searchParams.get("Strikeouts"));
    // const teamPlayedFor = request.nextUrl.searchParams.get("PlayedFor");
    // const year = request.nextUrl.searchParams.get("Year");
    //subquery
    if (!batterName) {
      return NextResponse.json(
        { error: 'Specify BatterName' },
        { status: 400 }
      );
    }
    const info_rows = await prisma.pitcher_info.findMany({
      select: {id: true},
      where: {
        College: attendedCollege && attendedCollege.length > 0
          ? attendedCollege === 'true'
            ? { not: null }
            : { equals: null }
          : undefined,
        Age: {gte: minAge},
        Handedness: pitcherHandedness && pitcherHandedness.length > 0
        ? {equals: pitcherHandedness}
        : undefined,
        EndYear: isActivePitcher && isActivePitcher.length > 0
        ? isActivePitcher === 'true'
          ? { equals: 0}
          : { not: 0}
        : undefined
      },
    });
    console.log('Info Rows:', info_rows);
    const rows = await prisma.vs_pitcher.findMany({
      where: {
        BatterName: { equals: batterName },
        PA: { gte: Number(minPA) },
        PitcherID: { in: info_rows.map(row => row.id)}
      },
    });

    console.log('Retrieved Rows:', rows);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching rows:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
