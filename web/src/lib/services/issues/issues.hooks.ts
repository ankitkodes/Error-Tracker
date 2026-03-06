import { useQuery } from "@tanstack/react-query";
import { getIssues } from "./issues.api";

export function useIssues(){
    return useQuery({
        queryKey:["issue"],
        queryFn:getIssues,
    })
}