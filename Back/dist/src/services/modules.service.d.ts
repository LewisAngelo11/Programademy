import { lenguaje_programacion } from "../../generated/prisma/enums";
import { CreateModuloDTO, UpdateModuloDTO } from "../types/module.types";
export declare class ModuloService {
    getAllModules(): Promise<({
        curso: {
            titulo: string;
            id_curso: number;
        };
        codigo_ejemplo: {
            id_modulo: number | null;
            id_codigo_ejemplo: number;
            explicacion_codigo: string | null;
            codigo: string;
            lenguaje: lenguaje_programacion | null;
        }[];
    } & {
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    })[]>;
    getModulosByCurso(idCurso: number, idUsuario: number): Promise<{
        completed: boolean;
        modulo_completado: {
            id_usuario: number;
            completado: boolean;
            fecha_completado: Date | null;
            id_modulo: number;
            id_modulo_completado: number;
        }[];
        curso: {
            titulo: string;
            id_curso: number;
        };
        codigo_ejemplo: {
            id_modulo: number | null;
            id_codigo_ejemplo: number;
            explicacion_codigo: string | null;
            codigo: string;
            lenguaje: lenguaje_programacion | null;
        }[];
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    }[]>;
    getModuloById(idModulo: number): Promise<({
        curso: {
            titulo: string;
            descripcion: string;
            fecha_creacion: Date | null;
            estado: import("../../generated/prisma/enums").estado_curso;
            imagen_url: string | null;
            id_curso: number;
        };
        codigo_ejemplo: {
            id_modulo: number | null;
            id_codigo_ejemplo: number;
            explicacion_codigo: string | null;
            codigo: string;
            lenguaje: lenguaje_programacion | null;
        }[];
        quiz: {
            titulo: string;
            id_modulo: number;
            id_quiz: number;
            tiempo_limite_segundos: number | null;
            puntos_recompensa: number | null;
        }[];
    } & {
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    }) | null>;
    cursoExists(idCurso: number): Promise<boolean>;
    moduloExists(idModulo: number): Promise<{
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    } | null>;
    createModulo(data: CreateModuloDTO): Promise<{
        curso: {
            titulo: string;
            descripcion: string;
            fecha_creacion: Date | null;
            estado: import("../../generated/prisma/enums").estado_curso;
            imagen_url: string | null;
            id_curso: number;
        };
        codigo_ejemplo: {
            id_modulo: number | null;
            id_codigo_ejemplo: number;
            explicacion_codigo: string | null;
            codigo: string;
            lenguaje: lenguaje_programacion | null;
        }[];
    } & {
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    }>;
    updateModulo(idModulo: number, data: UpdateModuloDTO): Promise<{
        curso: {
            titulo: string;
            descripcion: string;
            fecha_creacion: Date | null;
            estado: import("../../generated/prisma/enums").estado_curso;
            imagen_url: string | null;
            id_curso: number;
        };
        codigo_ejemplo: {
            id_modulo: number | null;
            id_codigo_ejemplo: number;
            explicacion_codigo: string | null;
            codigo: string;
            lenguaje: lenguaje_programacion | null;
        }[];
    } & {
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    }>;
    deleteModulo(idModulo: number): Promise<{
        curso: {
            titulo: string;
            id_curso: number;
        };
    } & {
        titulo: string;
        descripcion: string | null;
        id_curso: number;
        id_modulo: number;
        orden: number;
        contenido_teorico: string | null;
        estatus: import("../../generated/prisma/enums").estatus_modulo;
    }>;
}
//# sourceMappingURL=modules.service.d.ts.map