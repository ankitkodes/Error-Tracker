import { useQuery } from "@tanstack/react-query";
import { getProject, getProjectError, getProjects } from "./projects.api";

export function useProjects(){
    return useQuery({
        queryKey:["projects"],
        queryFn:getProjects,
    });
}

export function useProject(projectId:string){
    return useQuery({
        queryKey:["getproject", projectId],
        queryFn: () => getProject(projectId),
        enabled: !! projectId,
    })
}

export function useprojectError(projectId:string){
    return useQuery({
        queryKey:["projectError", projectId],
        queryFn:() => getProjectError(projectId),
        enabled:!! projectId,
    })
}