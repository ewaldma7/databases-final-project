import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest) {
  try {
    const pitcherName = request.nextUrl.searchParams.get("PitcherName");
    const minPA = Number(request.nextUrl.searchParams.get("MinPA"));
    const isActiveBatter = request.nextUrl.searchParams.get("Active");
    const vsBattersInLeague = request.nextUrl.searchParams.get("League");
    const vsBatterTeam = request.nextUrl.searchParams.get("Team");
    const homeRunThreshold = Number(request.nextUrl.searchParams.get("Hr"));
    const avgThreshold = Number(request.nextUrl.searchParams.get("Avg"));
    const obpThreshold = Number(request.nextUrl.searchParams.get("Obp"));

    if (!pitcherName) {
        return NextResponse.json(
          { error: 'Specify PitcherName' },
          { status: 400 }
        );
      }
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