import { useQuery } from "@tanstack/react-query";
import { getErrorAnalytics } from "./analytics.api";

// fetching error analytics details 
export function useErrorAnalytics(){
    return useQuery({
        queryKey:["errorAnalytics"],
        queryFn:getErrorAnalytics,
    });
}