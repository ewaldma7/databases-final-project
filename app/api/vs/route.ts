import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(request: NextRequest) {
    try {
      const BatterName = request.nextUrl.searchParams.get("BatterName");
      const PitcherName = request.nextUrl.searchParams.get("PitcherName");
      const MinPA = request.nextUrl.searchParams.get("MinPA");
  
      console.log('BatterName:', BatterName);
      console.log('PitcherName:', PitcherName);
      console.log("MinPA:", MinPA);

      if (!BatterName && !PitcherName) {
        return NextResponse.json(
          { error: 'Specify either BatterName or PitcherName' },
          { status: 400 }
        );
      }
  
      const rows = await prisma.vs_pitcher.findMany({
        where: {
          BatterName: BatterName ? { equals: BatterName } : undefined,
          PitcherName: PitcherName ? { equals: PitcherName } : undefined,
          PA: {gte: Number(MinPA)}
        },
      });
      console.log('Retrieved Rows:', rows);
  
      // Return the rows in the response
      return NextResponse.json(rows, { status: 200 });
    } catch (error: any) {
      // Log detailed error information
      console.error('Error fetching rows:', error.message, error.stack);
  
      // Return the error in the response
      return NextResponse.json(error, { status: 500 });
    }
  }
  