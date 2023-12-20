import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
      const rows = await prisma.vs_pitcher.findMany();
      const batterNames = rows.map(row => ({
        "BatterName": row.BatterName,
        "BatterId": row.BatterId
      }));
      return NextResponse.json(batterNames, {status: 200});
    } catch (error) {
      console.error('Error fetching rows:', error);
      return NextResponse.json(error, {status: 500});
    }
  }