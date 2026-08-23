import { CreateQuizDTO, UpdateQuizDTO } from '../types/quiz.types';
export declare class QuizService {
    private progressService;
    createQuiz(data: CreateQuizDTO): Promise<{
        pregunta: ({
            opcion: {
                orden: import("@prisma/client-runtime-utils").Decimal | null;
                id_pregunta: number | null;
                Texto: string;
                es_correcta: boolean;
                explicacion: string | null;
                id_opcion: number;
            }[];
        } & {
            orden: import("@prisma/client-runtime-utils").Decimal | null;
            id_quiz: number;
            enunciado: string;
            id_pregunta: number;
        })[];
    } & {
        titulo: string;
        id_modulo: number;
        id_quiz: number;
        tiempo_limite_segundos: number | null;
        puntos_recompensa: number | null;
    }>;
    getAllQuizzes(filters?: any): Promise<({
        pregunta: ({
            opcion: {
                orden: import("@prisma/client-runtime-utils").Decimal | null;
                id_pregunta: number | null;
                Texto: string;
                es_correcta: boolean;
                explicacion: string | null;
                id_opcion: number;
            }[];
        } & {
            orden: import("@prisma/client-runtime-utils").Decimal | null;
            id_quiz: number;
            enunciado: string;
            id_pregunta: number;
        })[];
    } & {
        titulo: string;
        id_modulo: number;
        id_quiz: number;
        tiempo_limite_segundos: number | null;
        puntos_recompensa: number | null;
    })[]>;
    getQuizById(id_quiz: number): Promise<({
        pregunta: ({
            opcion: {
                orden: import("@prisma/client-runtime-utils").Decimal | null;
                id_pregunta: number | null;
                Texto: string;
                es_correcta: boolean;
                explicacion: string | null;
                id_opcion: number;
            }[];
        } & {
            orden: import("@prisma/client-runtime-utils").Decimal | null;
            id_quiz: number;
            enunciado: string;
            id_pregunta: number;
        })[];
    } & {
        titulo: string;
        id_modulo: number;
        id_quiz: number;
        tiempo_limite_segundos: number | null;
        puntos_recompensa: number | null;
    }) | null>;
    updateQuiz(id_quiz: number, data: UpdateQuizDTO): Promise<{
        titulo: string;
        id_modulo: number;
        id_quiz: number;
        tiempo_limite_segundos: number | null;
        puntos_recompensa: number | null;
    }>;
    registerAttempt(id_quiz: number, id_usuario: number, calificacion: number, puntos_otorgados: number, completado: boolean): Promise<{
        quiz: {
            titulo: string;
            id_modulo: number;
            id_quiz: number;
            tiempo_limite_segundos: number | null;
            puntos_recompensa: number | null;
        };
    } & {
        id_usuario: number;
        id_quiz: number;
        id_intento: number;
        calificacion: number | null;
        puntos_otorgados: number | null;
        completado_100: boolean;
    }>;
    getAllAttempts(id_usuario: number): Promise<{
        id_usuario: number;
        id_quiz: number;
        id_intento: number;
        calificacion: number | null;
        puntos_otorgados: number | null;
        completado_100: boolean;
    }[]>;
    getAttempsComplete(id_quiz: number, id_usuario: number): Promise<{
        id_usuario: number;
        id_quiz: number;
        id_intento: number;
        calificacion: number | null;
        puntos_otorgados: number | null;
        completado_100: boolean;
    } | null>;
    getLastAttempt(id_quiz: number, id_usuario: number): Promise<{
        id_intento: number;
        id_quiz: number;
        id_usuario: number;
        calificacion: number | null;
        puntos_otorgados: number | null;
        completado_100: boolean;
        correctas: number;
        total_preguntas: number;
    } | null>;
    getAllAttemptsQuizzesStudents(): Promise<{
        totalQuizzesAttempts: {
            id_usuario: number;
            id_quiz: number;
            id_intento: number;
            calificacion: number | null;
            puntos_otorgados: number | null;
            completado_100: boolean;
        }[];
        email: string;
        id_usuario: number;
        nombre: string;
        puntos_totales: number | null;
    }[]>;
    deleteQuiz(id_quiz: number): Promise<{
        titulo: string;
        id_modulo: number;
        id_quiz: number;
        tiempo_limite_segundos: number | null;
        puntos_recompensa: number | null;
    }>;
}
//# sourceMappingURL=quizzes.service.d.ts.map