import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlert, updateAlert } from "./alerts.api";

export function useCreateAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { name: string, projectId: string, condition: string }) => 
            createAlert(data.name, data.projectId, data.condition),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
        }
    })
}

export function useUpdateAlert() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: { name: string, projectId: string, condition: string } }) => 
            updateAlert(id, data.name, data.projectId, data.condition),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] });
        }
    })
}