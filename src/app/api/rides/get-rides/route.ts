import prisma from "@/db/datasource";
import { Ride } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const afterId = req.nextUrl.searchParams.get('afterId');

    let rides: Ride[] = [];

    if (!afterId) {
      rides = await prisma.ride.findMany({
        take: 10,
        skip: 0,
        orderBy: {
          id: 'asc'
        }
      });
    } else {
      const asNum = parseInt(afterId, 10);
      rides = await prisma.ride.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: asNum
        },
        orderBy: {
          id: 'asc'
        }
      });
    }

    return NextResponse.json({
      rides,
      afterId: rides[rides.length - 1]?.id ?? null,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}