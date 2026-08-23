import { CreateCursoDTO, UpdateCursoDTO } from "../types/course.types";
export declare class CursoService {
    createCurso(data: CreateCursoDTO): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    }>;
    getAllCursos(): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    }[]>;
    getCursoById(idCurso: number): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    } | null>;
    cursoExistsAndActive(idCurso: number): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    } | null>;
    updateCurso(idCurso: number, data: UpdateCursoDTO): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    }>;
    deleteCurso(idCurso: number): Promise<{
        titulo: string;
        descripcion: string;
        fecha_creacion: Date | null;
        estado: import("../../generated/prisma/enums").estado_curso;
        imagen_url: string | null;
        id_curso: number;
    }>;
    verifyCursoStarted(idCurso: number, idUsuario: number): Promise<boolean>;
    startedCourse(idCurso: number, idUsuario: number): Promise<{
        id_usuario: number;
        id_curso: number;
        id_curso_iniciado: number;
        completado: boolean;
        fecha_completado: Date | null;
    }>;
    getStartedCourses(idUsuario: number): Promise<({
        curso: {
            titulo: string;
            descripcion: string;
            fecha_creacion: Date | null;
            estado: import("../../generated/prisma/enums").estado_curso;
            imagen_url: string | null;
            id_curso: number;
        };
    } & {
        id_usuario: number;
        id_curso: number;
        id_curso_iniciado: number;
        completado: boolean;
        fecha_completado: Date | null;
    })[]>;
}
//# sourceMappingURL=courses.service.d.ts.map