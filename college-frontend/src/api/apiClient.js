import { getAuthorizationHeader } from "./auth";

const URL = "http://localhost:8080/";

export async function fetchApi(endpoint, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
    };

    const authorization = getAuthorizationHeader();

    if (authorization) {
        headers.Authorization = authorization;
    }

    const response = await fetch(`${URL}${endpoint}`,
        {
            ...options,
            method,
            headers
        }
    );


/*    const response = await fetch(
        `${URL}/${endpoint.replace(/^\/+/, "")}`,
        {
            ...options,
            method,
            headers,
        }
    );
*/

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}
