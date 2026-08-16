import { apiFetch } from "./apiFetch";

export class CourseService {
    static async getCourse(idCurso: number) {
        const response = await apiFetch(`/curso/getOne/${idCurso}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener el curso');
        }

        return await response.json();
    }

    static async getAllCourses() {
        const response = await apiFetch('/curso/all', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener los cursos');
        }

        return await response.json();
    }

    static async createCourse(data: any) {
        const response = await apiFetch('/curso/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al crear el curso');
        }

        return await response.json();
    }

    static async editCourse(idCourse: number, data: any) {
        const response = await apiFetch(`/curso/update/${idCourse}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al editar el curso');
        }

        return await response.json();
    }

    static async deleteCourse(idCourse: number) {
        const response = await apiFetch(`/curso/delete/${idCourse}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar el curso');
        }

        return await response.json();
    }

    static async startCourse(idCurso: number) {
        const response = await apiFetch(`/curso/started/${idCurso}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al iniciar el curso');
        }

        return await response.json();
    }
}