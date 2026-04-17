
import prisma from "@/lib/db";
import z from "zod";
import { ProjectSchema } from "./project.types";

type ProjectInput = z.infer<typeof ProjectSchema>;
export async function addProject(userId: number, apikey: string, projectid: string, data: ProjectInput) {
    return await prisma.project.create({
        data: {
            id: projectid,
            name: data.name,
            userId: userId,
            environment: data.environment,
            language: data.language,
            team: data.team || "",
            apikey: apikey,
        },
    });
}

export async function getProject(userId: number) {
    return await prisma.project.findMany({
        where: {
            userId
        },
        include: {
            projecthealth: true,
            error: {
                orderBy: {
                    createdAt: "desc"
                },
                take: 1
            }
        }
    })
}

export async function getProjectDetail(id: string) {
    return await prisma.project.findFirst({
        where: {
            id
        }
    })
}

export async function deleteProject(id: string) {
    return await prisma.project.delete({
        where: {
            id
        }
    })
}

export async function updateProject(projectid: string, data: ProjectInput) {
    return await prisma.project.update({
        where: {
            id: projectid
        },
        data: {
            name: data.name,
            environment: data.environment,
            language: data.language,
            team: data.team || "",
        }
    })
}