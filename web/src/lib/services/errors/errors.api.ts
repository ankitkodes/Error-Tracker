import { fetchData } from "@/lib/api";
import {ErrorsParams } from "./errors.hooks";

export function getError({projectId , errorId}:ErrorsParams){
    return fetchData(`/api/projects/${projectId}/errors/${errorId}`)
}