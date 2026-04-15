import { fetchData } from "@/lib/api";

export function getError(projectId: string, errorId: string) {
    return fetchData(`/api/projects/${projectId}/errors/${errorId}`)
}

export function getSearchResult(query: string) {
    return fetchData(`/api/search?q=${query}`)
    // console.log("search query ran successfully:- ", query)
}

export function getTodayError() {
    return fetchData('/api/analytics/error')
}

export function getSortedErrorResult(query1: string, query2: string, query3: string) {
    return fetchData(`/api/ingest?severity=${query1}&status=${query2}&errortype=${query3}`);
}

