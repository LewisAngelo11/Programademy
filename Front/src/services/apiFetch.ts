/*
    Esta función es la base central para realizar peticiones a la API.
    de aquí, parten todas las peticiones.
*/

const API_URL = import.meta.env.VITE_API_URL; // URL Base de la API

export async function apiFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token");

    const headers = new Headers(options.headers);

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return response;
}