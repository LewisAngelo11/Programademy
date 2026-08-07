import { apiFetch } from "./apiFetch";

const API_URL = import.meta.env.VITE_API_URL;

export class ModuloService {
    static async getAllModulesFromCourse(idCurso: number) {
        const response = await apiFetch(`/modulo/course/all/${idCurso}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener los módulos');
        }

        return await response.json();
    }

    static async getOneModule(idModulo: number) {
        const response = await apiFetch(`/modulo/get/${idModulo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener el módulo');
        }

        return await response.json();
    }

    static async getAllModules() {
        const response = await apiFetch('/modulo/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener los módulos');
        }

        return await response.json();
    }

    static async deleteModulo(idModulo: number) {
        const response = await apiFetch(`/modulo/delete/${idModulo}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el módulo');
        }

        return await response.json();
    }
}

export const getAllModulesFromCourse = async (token: string, idCurso: number) => {
    const response = await fetch(`${API_URL}/modulo/course/all/${idCurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener los módulos');
    }

    return await response.json();
}

export const getOneModule = async (token: string, idModulo: number) => {
    const response = await fetch(`${API_URL}/modulo/get/${idModulo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al consultar el módulo');
    }

    return await response.json();
}