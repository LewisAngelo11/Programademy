import { apiFetch } from "./apiFetch";

export class QuizService {
    static async getAllQuizzes() {
        const response = await apiFetch("/quiz/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los quizzes');
        }

        return await response.json();
    }

    static async getOneQuiz(idQuiz: number) {
        const response = await apiFetch(`/quiz/getOne/${idQuiz}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el quiz');
        }

        return await response.json();
    }

    static async getAllStudentsAttemptsQuizzes() {
        const response = await apiFetch(`/quiz/allStudents/allAttempts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los intentos de los estudiantes');
        }

        return await response.json();
    }

    static async createQuiz(data: any) {
        const response = await apiFetch(`/quiz/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al crear el quiz');
        }

        return await response.json();
    }

    static async updateQuiz(idQuiz: number, data: any) {
        const response = await apiFetch(`/quiz/update/${idQuiz}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el quiz');
        }

        return await response.json();
    }

    static async createAttempt(idQuiz: number, data: any) {
        const response = await apiFetch(`/quiz/attemptQuiz/${idQuiz}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al crear el intento');
        }

        return await response.json();
    }

    static async getAttemptComplete(idQuiz: number) {
        const response = await apiFetch(`/quiz/attemptComplete/${idQuiz}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el intento completo');
        }

        return await response.json();
    }

    static async getLastAttempt(idQuiz: number) {
        const response = await apiFetch(`/quiz/lastAttempt/${idQuiz}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el último intento');
        }

        return await response.json();
    }

    static async deleteQuiz(idQuiz: number) {
        const response = await apiFetch(`/delete/${idQuiz}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el quiz');
        }

        return await response.json();
    }
}