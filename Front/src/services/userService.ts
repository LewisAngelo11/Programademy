import { apiFetch } from "./apiFetch";

export class UserService {
    static async getInfo() {
        const response = await apiFetch('/usuario/info', {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error("Error al obtener la información del usuario");
        }

        return response.json();
    }

    static async getRange() {
        const response = await apiFetch('/usuario/getRange', {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error("Error al obtener el rango del usuario");
        }

        return response.json();
    }

    static async getRanges() {
        const response = await apiFetch('/usuario/getRanges', {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error("Error al obtener todos los rangos");
        }

        return response.json();
    }

    static async getAllRanges() {
        const response = await apiFetch('/usuario/getAllRanges', {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error("Error al obtener todos los rangos de usuarios");
        }

        return response.json();
    }

    static async updateInfo(data: { nombre: string; email: string; }) {
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
}