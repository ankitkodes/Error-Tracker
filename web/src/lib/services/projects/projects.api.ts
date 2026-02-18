import { fetchData } from "@/lib/api";

export async function getProject() {
  return fetchData("/api/projects");
}
