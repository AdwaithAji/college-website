import { fetchApi } from "./apiClient";


export async function getApprovedImages() {
    return fetchApi("gallery/approved");
}

export async function uploadGalleryImage(image, caption) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    return fetchApi("gallery/upload", {
        method: "POST",
        body: formData,
    });

}

export async function getPendingImages() {
    return fetchApi("gallery/pending");
}

export async function approveGalleryImage(id) {
    return fetchApi(`gallery/approve/${id}`, {
        method: "POST",
    });
}

export async function rejectGalleryImage(id) {
    return fetchApi(`gallery/reject/${id}`, {
        method: "POST",
    })
}