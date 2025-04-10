import { API_URL } from "../config/api.config";

export async function getProducts<T>() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed To Fetch Products");
  }
  const data = (await response.json()) as T;
  return data;
}
