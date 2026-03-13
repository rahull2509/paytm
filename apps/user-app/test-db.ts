import { prisma } from "@repo/db/client";

async function main() {
    try {
        console.log("Testing DB connection...");
        const user = await prisma.user.findFirst();
        console.log("DB connection successful!", user);
    } catch(e) {
        console.error("Error connecting to DB:", e);
    }
}

main();
