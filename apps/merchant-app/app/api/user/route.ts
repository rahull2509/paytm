import { NextResponse } from "next/server"
import { prisma as client } from "@repo/db/client";

export const GET = async () => {
    await client.user.create({
        data: {
            number: "1111111111",
            password: "password123"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}