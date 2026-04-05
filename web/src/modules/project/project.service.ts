import generateApiKey from "generate-api-key";
import { addProject, deleteProject, getProject, getProjectDetail } from "./project.repo";
import { ProjectSchema } from "./project.types"
import z from "zod";

type ProjectInput = z.infer<typeof ProjectSchema>;
export async function AddProject(userId: number, data: ProjectInput) {
    // validating the data 
    const validateData = ProjectSchema.parse(data);
    console.log(validateData)
    // create api key for specific project 
    const apikey = generateApiKey({ method: "base62", length: 35 }) as string;
    // create projectId 
    const projectid = validateData.name.slice(0, 5) + "_" + crypto.randomUUID();
    return addProject(userId, apikey, projectid, data);
}

export async function GetAllProject(userId: number) {
    return await getProject(userId)
}

export async function GetProjectDetail(id: string) {
    return await getProjectDetail(id);
}

export async function DeleteProject(id: string) {
    return await deleteProject(id);
}

export async function UpdateProject(projectid: string, data: ProjectInput) {
    const validateData = ProjectSchema.parse(data);
    console.log("updated project details:- ", validateData)
}