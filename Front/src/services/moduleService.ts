import { apiFetch } from "./apiFetch";

export class ModuloService {
    static async getAllModulesFromCourse(idCurso: number) {
        const response = await apiFetch(`/modulo/course/all/${idCurso}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al obtener los módulos');
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al obtener el módulo');
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al obtener los módulos');
        }

        return await response.json();
    }

    static async createModule(data: any) {
        const response = await apiFetch('/modulo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al crear el módulo');
        }

        return await response.json();
    }

    static async updateModule(idModulo: number, data: any) {
        const response = await apiFetch(`/modulo/update/${idModulo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al actualizar el módulo');
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || 'Error al eliminar el módulo');
        }

        return await response.json();
    }
}