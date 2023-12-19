import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
      const teams = await prisma.teamsInfo.findMany();
      console.log(teams);
      return NextResponse.json(teams, {status: 200});
    } catch (error) {
      console.error('Error fetching teams:', error);
      return NextResponse.json(error, {status: 400});
    }
  }