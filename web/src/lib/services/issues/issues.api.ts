import { fetchData } from "@/lib/api";

export function getIssues(){
    return fetchData("/api/ingest");
}