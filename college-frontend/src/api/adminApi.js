import { fetchApi } from "./apiClient";

export async function loginAdmin(credentials) {
    return fetchApi("admin/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}