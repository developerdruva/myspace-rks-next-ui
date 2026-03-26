// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ success: true });

  const cookiesToDelete = [
    "next-auth.session-token",
    "next-auth.csrf-token",
    "next-auth.callback-url",
  ];

  cookiesToDelete.forEach((name) => {
    res.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
    });
  });

  return res;
}
