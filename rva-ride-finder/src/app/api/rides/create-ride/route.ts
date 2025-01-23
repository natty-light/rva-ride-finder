import prisma from "@/db/datasource";
import validateToken from "@/lib/auth/validateToken";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import type { Ride } from "@prisma/client";
import { NextResponse } from "next/server";

type CreateRideRequest = Omit<Ride, 'id' | 'userId' | 'routeId'>

export async function POST(req: Request) {

  const validationResult = await validateToken(req);

  if (!validationResult) {
    return NextResponse.json({ message: 'unauthorized ' }, { status: 401 });
  }

  const body = (await req.json()) as CreateRideRequest;

  const { currentUser } = await getAuthenticatedAppForUser();

  const dbUser = await prisma.user.findFirst({
    where: {
      uid: currentUser?.uid
    }
  });

  if (!dbUser) {
    return NextResponse.json({ message: 'user not found' }, { status: 404 })
  }

  const createResult = await prisma.ride.create({
    data: {
      ...body,
      user: {
        connect: {
          id: dbUser.id
        }
      },
    }
  })

  console.log(`created ride with id ${createResult.id}`)

  return NextResponse.json({ message: 'created' }, { status: 201 })
}