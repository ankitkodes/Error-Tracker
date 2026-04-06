import { fetchData } from "@/lib/api";
import axios from "axios";

export async function getProjects() {
  const response = fetchData("/api/projects");
  return response;
}

export async function getProject(projectId: string) {
  return fetchData(`/api/projects/${projectId}`)
}

export async function getProjectError(projectId: string) {
  return fetchData(`/api/projects/${projectId}/errors`)
}

export async function getProjectReport(projectId: string) {
  return fetchData(`/api/projects/${projectId}/reports`)
}

interface project {
  name: string,
  language: string,
  env: string,
  team: string,
  projectId?: string
}

export async function addProject({ name, language, env, team }: project) {
  const response = await axios({
    method: 'POST',
    url: '/api/projects',
    data: {
      name: name,
      language: language,
      environment: env,
      team: team,
    },
  });
  return response.data
}

export async function deleteProject(projectId: string) {
  return await axios({
    method: 'DELETE',
    url: `/api/projects/${projectId}`
  });
}

export async function UpdateProject({ projectId, name, language, env, team }: project) {
  return await axios({
    method: 'PUT',
    url: `/api/projects/${projectId}`,
    data: {
      name: name,
      language: language,
      environment: env,
      team: team,
    }
  })
}
