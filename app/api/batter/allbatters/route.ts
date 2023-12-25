import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest) {
  try {

    const batters = await prisma.vs_pitcher.findMany({
        select: {
            BatterName: true
        },
        distinct: ['BatterId'],
    });
    batters.sort((a, b) => {
        if (a.BatterName && b.BatterName) {
            return a.BatterName.localeCompare(b.BatterName);
        }
        return 0;
    });
    return NextResponse.json(batters, { status: 200 });
  } catch (error) {
    console.error('Error fetching batters:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}