import prisma from "@/db/datasource";
import validateToken from "@/lib/auth/validateToken";
import { NextResponse } from "next/server";

type RegisterUserRequest = {
  uid: string;
}

export async function POST(req: Request) {
  const validationResult = await validateToken(req);
  if (!validationResult) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  try {
    const { uid } = (await req.json()) as RegisterUserRequest;

    if (!uid) {
      return NextResponse.json({ message: 'bad request' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        uid
      }
    });
    console.log(`found existing user with id ${existingUser?.id}`);

    if (!existingUser) {
      console.log(`no existing user found, registering new entry with id: ${uid}`);
      const newUser = await prisma.user.create({
        data: {
          uid,
        }
      });

      console.log(`created new user with id ${newUser.id}`);

      return NextResponse.json({ message: 'ok' }, { status: 201 });
    }

    return NextResponse.json({ message: 'user record already exists' }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}