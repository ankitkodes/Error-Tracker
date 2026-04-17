import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UpdateErrorStatusParams {
  projectId: string;
  errorId: number;
  status: string;
}

async function updateErrorStatus({ projectId, errorId, status }: UpdateErrorStatusParams) {
  const response = await axios.put(
    `/api/projects/${projectId}/errors/${errorId}`,
    { status }
  );
  return response.data;
}

interface DeleteErrorParams {
  projectId: string;
  errorId: number;
}

async function deleteError({ projectId, errorId }: DeleteErrorParams) {
  const response = await axios.delete(
    `/api/projects/${projectId}/errors/${errorId}`
  );
  return response.data;
}

export function useUpdateErrorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateErrorStatus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["geterror", variables.projectId, String(variables.errorId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectError", variables.projectId],
      });
    },
  });
}

export function useDeleteError() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteError,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectError", variables.projectId],
      });
    },
  });
}
