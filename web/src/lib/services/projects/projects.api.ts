import { fetchData, sendData } from "@/lib/api";

export async function getProjects() {
  const response = fetchData("/api/projects");
  console.log("this is tanstack query log", response);
  return response;  
}

export async function getProject(projectId:string){
  return fetchData(`/api/projects/${projectId}`)
}

export async function getProjectError(projectId:string){
  return fetchData(`/api/projects/${projectId}/errors`)
}

export async function addProject(projectdetails:{}){
  return sendData("/api/projects",projectdetails )
}
