import prisma from "@/db/datasource";
import { NextResponse } from "next/server";

type RegisterUserRequest = {
  uid: string;
}

export async function POST(req: Request) {
  const { uid } = (await req.json()) as RegisterUserRequest;

  const existingUser = await prisma.user.findFirst({
    where: {
      uid
    }
  })

  if (!existingUser) {
    console.log(`no existing user found, registering new entry with id: ${uid}`)
    prisma.user.create({
      data: {
        uid,
      }
    })
  }

  NextResponse.json({ message: 'ok' }, { status: 201 })
}