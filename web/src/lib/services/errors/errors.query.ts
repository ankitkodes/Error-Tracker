import { useQuery } from "@tanstack/react-query";
import { getError, getSearchResult } from "./errors.api";

 export interface ErrorsParams{
    projectId:string,
    errorId:string
}

// get the specific error of specific project 
export function useGetErrors({projectId,errorId}:ErrorsParams){
  return useQuery({
    queryKey:["geterror", projectId , errorId],
    queryFn:() => getError(projectId , errorId),
  })
}

// get the search result 
export function useGetSearchResult(query:string){
  return useQuery({
    queryKey:["getsearchresult", query],
    queryFn:() => getSearchResult(query),
    enabled: !! query
  })
}