import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const { currentUser } = await getAuthenticatedAppForUser();

  const token = await currentUser?.getIdToken();

  return NextResponse.json({ token }, { status: 200 });
}