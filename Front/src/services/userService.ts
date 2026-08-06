import { apiFetch } from "./apiFetch";

export async function getInfo() {
    const response = await apiFetch('/usuario/info', {
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error("Error al obtener la información del usuario");
    }

    return response.json();
}

export async function getRange() {
    const response = await apiFetch('/usuario/getRange', {
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error("Error al obtener el rango de usuarios");
    }

    return response.json();
}

export async function getRanges() {
    const response = await apiFetch('/usuario/getRanges', {
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los rangos de usuarios");
    }

    return response.json();
}

export async function updateInfo(data: { nombre: string; email: string; }) {
    const response = await apiFetch('/usuario/update', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la información del usuario");
    }

    return response.json();
}
