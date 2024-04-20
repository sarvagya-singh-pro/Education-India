import { NextResponse } from "next/server";
import prisma from "@/app/database/prisma";
export  async function GET() {
        try {
            const universities = await prisma.university.findMany();
            console.log("ok")
            return NextResponse.json(universities);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal Server Error' });
        }
}
