import { getToken } from "next-auth/jwt";

import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXT_PUBLIC_AUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });

  return NextResponse.json({ token }, { status: 200 });
}