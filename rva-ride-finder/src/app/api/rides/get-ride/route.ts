import prisma from "@/db/datasource";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const rideId = req.nextUrl.searchParams.get('rideId');

    if (!rideId) {
      return NextResponse.json({ message: 'bad request' }, { status: 400 });
    }

    const asNum = parseInt(rideId, 10);

    const ride = await prisma.ride.findUnique({
      where: {
        id: asNum
      }
    });

    if (!ride) {
      return NextResponse.json({ message: 'no ride found' }, { status: 404 });
    }

    return NextResponse.json(ride, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }

}