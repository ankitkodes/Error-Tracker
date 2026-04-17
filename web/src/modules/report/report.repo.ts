import prisma from "@/lib/db";

export async function projectreport(projectId: string) {
    return await prisma.projectHealth.findUnique({
        where: {
            projectId: projectId
        },
        select: {
            totalerrors: true,
            resolvederror: true,
            status: true,
            uptimepercentage: true,
        },
    });
}