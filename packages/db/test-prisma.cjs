const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const u = await prisma.user.create({ data: { username: "1234567890", password: "password" }});
        console.log("Success:", u);
    } catch(e) {
        console.error("Error:", e.message);
    }
}
main();
