import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.NEXTAUTH_SECRET;

if (!SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set in environment variables.");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Extract query params
    const token = searchParams.get("token"); // Get the token from query

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Step 1: Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Check if the token has expired
    const now = new Date();
    if (verificationToken.expires < now) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const user = verificationToken.user;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 2: Update the emailVerified status
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    // Step 3: Delete the used verification token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Step 4: Generate a new JWT for the user
    const userToken = jwt.sign(
      { id: user.id, email: user.email, emailVerified: true },
      SECRET,
      { expiresIn: "7d" } // Token valid for 7 days
    );

    // Set token as an HttpOnly cookie
    const response = NextResponse.json(
      { message: "Email successfully verified" },
      { status: 200 }
    );
    response.cookies.set("authToken", userToken, {
  
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
