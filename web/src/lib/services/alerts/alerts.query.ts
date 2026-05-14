import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "./alerts.api";

export function useGetAlerts() {
    return useQuery({
        queryKey: ["alerts"],
        queryFn: getAlerts
    })
}