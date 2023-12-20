import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
      const BatterName = request.nextUrl.searchParams.get("BatterName");
      const PitcherName = request.nextUrl.searchParams.get("PitcherName");
  
      console.log('BatterName:', BatterName);
      console.log('PitcherName:', PitcherName);
  
      const rows = await prisma.vs_pitcher.findMany({
        where: {
          BatterName: BatterName,
          PitcherName: PitcherName,
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
  