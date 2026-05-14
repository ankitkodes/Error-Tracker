import prisma from "@/lib/db";
import { alertSchema } from "./alerts.types";


export async function createalert(data: alertSchema) {
    return await prisma.alertRule.create({
        data: {
            name: data.name,
            project: { connect: { id: data.projectId } },
            condition: data.condition,
            lastTriggered: new Date(),
            active: true
        }
    })
}

export async function getalert(userId: number) {
    return await prisma.alertRule.findMany({
        where: {
            project: {
                userId: userId
            }
        },
        include: {
            project: true
        }
    })
}

export async function updatealert(alertruleid: string, data: alertSchema) {
    return await prisma.alertRule.update({
        where: {
            id: alertruleid
        },
        data: {
            name: data.name,
            project: { connect: { id: data.projectId } },
            condition: data.condition,
            lastTriggered: new Date(),
            active: true
        }
    })
}
