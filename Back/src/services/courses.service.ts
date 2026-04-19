import { prisma } from "../../lib/prisma";
import { CreateCursoDTO, UpdateCursoDTO } from "../types/course.types";

export class CursoService {
    

    // Crea un nuevo curso
    async createCurso(data: CreateCursoDTO) {
        let imagenUrlNoUndefined = data.imagen_url !== undefined ? data.imagen_url : "";

        return await prisma.curso.create({
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                imagen_url: imagenUrlNoUndefined
            }
        });
    }

    // Obtiene todos los cursos activos
    async getAllCursos() {
        return await prisma.curso.findMany({
            where: {
                estado: 'activo'
            },
            orderBy: {
                fecha_creacion: 'desc'
            }
        });
    }

    // Obtiene un curso por su ID
    async getCursoById(idCurso: number) {
        return await prisma.curso.findUnique({
            where: {
                id_curso: idCurso,
                estado: 'activo'
            }
        });
    }

    // Verifica si un curso existe y está activo
    async cursoExistsAndActive(idCurso: number) {
        return await prisma.curso.findFirst({
            where: {
                id_curso: idCurso,
                estado: 'activo'
            }
        });
    }

    // Actualiza un curso existente
    async updateCurso(idCurso: number, data: UpdateCursoDTO) {
        const cleanData: any = {}

        if (data.titulo !== undefined) cleanData.titulo = data.titulo;
        if (data.descripcion !== undefined) cleanData.descripcion = data.descripcion;
        if (data.imagen_url !== undefined) cleanData.imagen_url = data.imagen_url;

        return await prisma.curso.update({
            where: {
                id_curso: idCurso
            },
            data: cleanData
        });
    }

    // Marca un curso como eliminado (soft delete)
    async deleteCurso(idCurso: number) {
        return await prisma.curso.update({
            where: {
                id_curso: idCurso
            },
            data: {
                estado: 'eliminado'
            }
        });
    }
}