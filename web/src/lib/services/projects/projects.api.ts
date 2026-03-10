import { fetchData} from "@/lib/api";
import axios from "axios";

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

interface project{
  name:string,
  language:string,
  env:string,
  team:string
}

export async function addProject({name , language , env , team}:project){
  const response = await axios({
     method:'POST',
     url:'/api/projects', 
     data: {
        name: name,
        language: language,
        environment: env,
        team: team,
      },
  });
  return response.data
}
