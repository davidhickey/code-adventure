import { prisma } from "@/lib/prismaClient";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use", status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
      },
    });

    return NextResponse.json({ user, status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user", status: 500 });
  }
}
