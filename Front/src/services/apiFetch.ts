/*
    Esta función es la base central para realizar peticiones a la API.
    de aquí, parten todas las peticiones.
*/

const API_URL = import.meta.env.VITE_API_URL || ""; // URL Base de la API (vacío = mismo origen)

function buildApiUrl(url: string): string {
    // Si hay una URL absoluta configurada (desarrollo con VITE_API_URL),
    // se usa directa. Si es vacío (producción en Render), usamos el mismo
    // origen: back y front comparten dominio, la cookie es first-party.
    return API_URL ? `${API_URL}${url}` : url;
}

interface ApiFetchOptions extends RequestInit {
    skipAuthRedirect?: boolean;
}

export async function apiFetch(
    url: string,
    options: ApiFetchOptions = {}
) {

    const { skipAuthRedirect, ...fetchOptions } = options;

    const response = await fetch(buildApiUrl(url), {
        ...fetchOptions,
        credentials: "include",
    });

    // Si es 401 y no fue en login, redireccionar al login!
    if (response.status === 401 && !skipAuthRedirect) {
        window.location.href = "/login";
    }

    return response;
}