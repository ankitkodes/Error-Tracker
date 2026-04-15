import { fetchData } from "@/lib/api";

export async function getErrorAnalytics(){
    return fetchData('/api/analytics')
}