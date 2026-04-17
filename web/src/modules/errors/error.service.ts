import { Severity, Status } from "../../../prisma/generated/prisma/enums";
import { getDailyError, geterror, getSortedError, projecterror } from "./error.repo";

export async function getDailyErrorServices(userId: number) {
    if (!userId) {
        throw new Error("Invalid userId");
    }
    return await getDailyError(userId);
}

export async function getSortedErrorService(userId: number, severity: Severity, status: Status, errortype: string) {
    if (!userId) {
        throw new Error("Invalid Error")
    }
    return await getSortedError(userId, severity, status, errortype);
}

export async function ProjectError(projectId: string) {
    return projecterror(projectId)
}

export async function getError(errorId:string) {
    return geterror(errorId);
}