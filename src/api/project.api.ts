import { API_URL } from "../config/api.config";
import { ProjectType } from "../types/Project.type";

const projectsURL = `${API_URL}/projects`;

export async function getProducts<T>() {
  const response = await fetch(projectsURL);
  if (!response.ok) {
    throw new Error("Failed To Fetch Products");
  }
  const data = (await response.json()) as T;
  return data;
}

export async function createProject(project: ProjectType) {
  const date = new Date();
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
      createdAt: date.toISOString(),
    }),
  };
  fetch(projectsURL, requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
