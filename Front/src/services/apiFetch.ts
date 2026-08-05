/*
    Esta función es la base central para realizar peticiones a la API.
    de aquí, parten todas las peticiones.
*/
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

    return fetch(url, {
        ...options,
        headers
    });
}