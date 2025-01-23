import prisma from "@/db/datasource";
import { adminAuth } from "@/lib/firebase/admin";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { NextResponse } from "next/server";

type RegisterUserRequest = {
  uid: string;
}

export async function POST(req: Request) {

  const idToken = req.headers.get('Authorization')?.split('Bearer')[1].trim()

  if (!idToken) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }

  const { currentUser } = await getAuthenticatedAppForUser();

  const decodedToken = await adminAuth.verifyIdToken(idToken)

  if (currentUser?.uid !== decodedToken.uid) {
    return NextResponse.json({ message: 'unauthorized ' }, { status: 401 })
  }


  try {
    const { uid } = (await req.json()) as RegisterUserRequest;

    if (!uid) {
      return NextResponse.json({ message: 'bad request' }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        uid
      }
    })
    console.log(`found existing user with id ${existingUser?.id}`)

    if (!existingUser) {
      console.log(`no existing user found, registering new entry with id: ${uid}`)
      const newUser = await prisma.user.create({
        data: {
          uid,
        }
      })

      console.log(`created new user with id ${newUser.id}`)

      return NextResponse.json({ message: 'ok' }, { status: 201 })
    }

    return NextResponse.json({ message: 'user record already exists' }, { status: 200 })

  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: (err as Error).message }, { status: 500 })
  }
}