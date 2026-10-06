import { fetchApi } from "./apiClient";

export function getCourses() {
    return fetchApi("course");
}

export function addCourse(course) {
    return fetchApi("course", {
        method: "POST",
        body: JSON.stringify(course),
    });
}

export function deleteCourse(id) {
    return fetchApi(`course/${id}`, {
        method: "DELETE",
    });
}
