import { fetchApi } from "./apiClient";

export async function getNotices() {
    return fetchApi("notice");
}

export async function addNotice(notice) {
    return fetchApi("notice", {
        method: "POST",
        body: JSON.stringify(notice),
    });
}

export async function deleteNotice(id) {
    return fetchApi(`notice/${id}`, {
        method: "DELETE",
    });
}