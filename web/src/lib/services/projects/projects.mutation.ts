import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject, deleteProject, UpdateProject } from "./projects.api";

// creating new project 
export function useAddPojects() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        }
    })
}

export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            })
        }
    })
}

export function useUpdateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: UpdateProject,

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["projects"]
            });

            if (variables?.projectId) {
                queryClient.invalidateQueries({
                    queryKey: ["getproject", variables.projectId],
                });
            }
        }
    })
}