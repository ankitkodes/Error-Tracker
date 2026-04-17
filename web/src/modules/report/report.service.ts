import { projectreport } from "./report.repo";

export function ProjectReport(projectId:string){
    return projectreport(projectId)
}