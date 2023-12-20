import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const pitcherName = request.nextUrl.searchParams.get("PitcherName");
    const minPA = Number(request.nextUrl.searchParams.get("MinPA"));
    const isActiveBatter = request.nextUrl.searchParams.get("Active");
    const vsBattersInLeague = request.nextUrl.searchParams.get("League");
    const vsBatterTeam = request.nextUrl.searchParams.get("Team");
    const vsBattersOnPitchersTeam = request.nextUrl.searchParams.get("PitchersTeam");
    const homeRunThreshold = Number(request.nextUrl.searchParams.get("Hr"));
    const avgThreshold = Number(request.nextUrl.searchParams.get("Avg"));
    const obpThreshold = Number(request.nextUrl.searchParams.get("Obp"));

    console.log('Pitcher Name:', pitcherName);
    console.log('Min Plate Appearances:', minPA);
    console.log('Is Active Batter:', isActiveBatter);
    console.log('Vs Batters in League:', vsBattersInLeague);
    console.log('Vs Batter Team:', vsBatterTeam);
    console.log('Vs Batters on Pitcher\'s Team:', vsBattersOnPitchersTeam);
    console.log('Home Run Threshold:', homeRunThreshold);
    console.log('Avg Threshold:', avgThreshold);
    console.log('Obp Threshold:', obpThreshold);

    
    // const strikeouts = Number(request.nextUrl.searchParams.get("Strikeouts"));
    // const teamPlayedFor = request.nextUrl.searchParams.get("PlayedFor");
    // const year = request.nextUrl.searchParams.get("Year");
    //subquery
    // const info_rows = await prisma.pitcher_info.findMany({
    //   select: {id: true},
    //   where: {
    //     College: attendedCollege && attendedCollege.length > 0
    //       ? attendedCollege === 'true'
    //         ? { not: null }
    //         : { equals: null }
    //       : undefined,
    //     Age: {gte: minAge},
    //     Handedness: pitcherHandedness && pitcherHandedness.length > 0
    //     ? {equals: pitcherHandedness}
    //     : undefined,
    //     EndYear: isActivePitcher && isActivePitcher.length > 0
    //     ? isActivePitcher === 'true'
    //       ? { equals: 0}
    //       : { not: 0}
    //     : undefined
    //   },
    // });
    // console.log('Info Rows:', info_rows);
    const rows = await prisma.vs_pitcher.findMany({
      where: {
        PitcherName: { equals: pitcherName },
        PA: { gte: Number(minPA) },
        // PitcherID: { in: info_rows.map(row => row.id)},
        OBP: {gte: obpThreshold},
        HR: {gte: homeRunThreshold},
        BA: {gte: avgThreshold},
        CurrentTm: isActiveBatter
        ? isActiveBatter === 'true'
            ? vsBatterTeam 
                ? {equals: vsBatterTeam}
                : {not: null}
            : {equals: null}
        : undefined,
      },
    });

    console.log('Retrieved Rows:', rows);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching rows:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}