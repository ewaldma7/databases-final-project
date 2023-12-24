import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest) {
  try {

    const pitchers = await prisma.pitcher_info.findMany({
        select: {
            Name: true
        },
        distinct: ['Name']
    });
    return NextResponse.json(pitchers, { status: 200 });
  } catch (error) {
    console.error('Error fetching pitchers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}