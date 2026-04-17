import prisma from "@/lib/db";
import { Severity, Status } from "../../../prisma/generated/prisma/enums";

//  get today error 
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
            },

        },
        select: {
            error: true,
            occurrence: true,
            id: true,
            message: true,
            projectId: true,
            errorType: true,
            status: true
        }
    })
}



// get all the error based on the query 
export async function getSortedError(userId: number, severity: Severity, status: Status, errorType: string) {
    return await prisma.error.findMany({
        where: {
            project: {
                userId: userId
            },
            ...(severity && { severity }),
            ...(status && { status }),
            ...(errorType && { errorType })
        },
        select: {
            id: true,
            message: true,
            severity: true,
            error: true,
            status: true,
            occurrence: true,
            createdAt: true,
            project: {
                select: {
                    name: true,
                    language: true,
                    environment: true,
                },
            },
        },
    })
}

export async function projecterror(projectId: string) {
    return await prisma.error.findMany({
        where: {
            projectId: projectId,
        },
        select: {
            id: true,
            error: true,
            occurrence: true,
            message: true,
            projectId: true,
            errorType: true,
            status: true
        }
    });
}

export async function geterror(errorId: string) {
    return await prisma.error.findUnique({
        where: {
            id: Number(errorId),
        },
    });
}