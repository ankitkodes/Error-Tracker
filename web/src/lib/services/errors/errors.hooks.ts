import { useQuery } from "@tanstack/react-query";
import { getError } from "./errors.api";

 export interface ErrorsParams{
    projectId:string,
    errorId:string
}
export function useGetErrors({projectId,errorId}:ErrorsParams){
  return useQuery({
    queryKey:["geterror", projectId , errorId],
    queryFn:() => getError(projectId , errorId),
  })
}