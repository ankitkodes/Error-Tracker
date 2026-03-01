import { useQuery } from "@tanstack/react-query";
import { getProject } from "./projects.api";

export function useProjects(){
    return useQuery({
        queryKey:["projects"],
        queryFn:getProject,
    })
}