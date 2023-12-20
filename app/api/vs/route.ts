import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
      const rows = await prisma.vs_pitcher.findMany();
      console.log(rows);
      return NextResponse.json(rows, {status: 200});
    } catch (error) {
      console.error('Error fetching rows:', error);
      return NextResponse.json(error, {status: 500});
    }
  }