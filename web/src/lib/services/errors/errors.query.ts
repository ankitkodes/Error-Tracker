import { useQuery } from "@tanstack/react-query";
import { getError, getSearchResult, getSortedErrorResult, getTodayError } from "./errors.api";

export interface ErrorsParams {
  projectId: string,
  errorId: string
}

// get the specific error of specific project 
export function useGetErrors({ projectId, errorId }: ErrorsParams) {
  return useQuery({
    queryKey: ["geterror", projectId, errorId],
    queryFn: () => getError(projectId, errorId),
  })
}

// get the search result 
export function useGetSearchResult(query: string) {
  return useQuery({
    queryKey: ["getsearchresult", query],
    queryFn: () => getSearchResult(query),
    enabled: !!query
  })
}

// get all today error 
export function useGetTodayError() {
  return useQuery({
    queryKey: ["todayerror"],
    queryFn: getTodayError
  })
}

export function useGetallError(query1: string, query2: string, query3: string) {
  return useQuery({
    queryKey: ["sortedError", query1, query2, query3],
    queryFn: () => getSortedErrorResult(query1, query2, query3)
  })
}