import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "./projects.api";

// creating new project 
export function useAddPojects(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addProject,

        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["projects"]
            })
        }
    })
}