import prisma from "@/lib/db";


export async function getDailyError(userId: number) {
    // today date 

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // tomorrow date 
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // extract all error of today date 
    return await prisma.error.findMany({
        where: {
            project: {
                userId: userId
            },
            createdAt: {
                gte: today,
                lt: tomorrow
            }
        }
    })
}