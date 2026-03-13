import { NextResponse } from "next/server"
import { prisma as client } from "@repo/db/client";

export const GET = async () => {
    await client.user.create({
        data: {
            username: "asd",
            password: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}