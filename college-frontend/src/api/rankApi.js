import { fetchApi } from "./apiClient";

export async function getRankHolders() {
    return fetchApi("rank");
}

export async function addRankHolder(formData) {
    return fetchApi("rank", {
        method: "POST",
        body: formData,
    });
}

export async function deleteRankHolder(id) {
    return fetchApi(`rank/${id}`, {
        method: "DELETE",
    });
}