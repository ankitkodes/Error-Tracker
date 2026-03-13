import {useQuery} from "@tanstack/react-query";
import {getProject, getProjectError, getProjectReport, getProjects } from "./projects.api";

// fetching all projects
export function useProjects(){
    return useQuery({
        queryKey:["projects"],
        queryFn:getProjects,
    });
}

// fetch specific project details
export function useProject(projectId:string){
    return useQuery({
        queryKey:["getproject", projectId],
        queryFn: () => getProject(projectId),
        enabled: !! projectId,
    })
}

// fetching project reports 
export function useProjectReport(projectId:string){
    return useQuery({
        queryKey:["projectreport", projectId],
        queryFn:()=> getProjectReport(projectId)
    })
}

// fetch all error of specific project 
export function useProjectError(projectId:string){
    return useQuery({
        queryKey:["projectError", projectId],
        queryFn:() => getProjectError(projectId),
        enabled:!! projectId,
    })
}
 
