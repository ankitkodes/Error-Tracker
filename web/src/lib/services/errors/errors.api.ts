import { fetchData } from "@/lib/api";

export function getError(projectId: string, errorId: string){
    return fetchData(`/api/projects/${projectId}/errors/${errorId}`)
}

export function getSearchResult(query:string){
    return fetchData(`api/search?q=${query}`)
    // console.log("search query ran successfully:- ", query)
}

