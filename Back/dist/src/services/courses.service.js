"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const prisma_1 = require("../../lib/prisma");
class CursoService {
    // Crea un nuevo curso
    async createCurso(data) {
        let imagenUrlNoUndefined = data.imagen_url !== undefined ? data.imagen_url : "";
        return await prisma_1.prisma.curso.create({
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                imagen_url: imagenUrlNoUndefined
            }
        });
    }
    // Obtiene todos los cursos activos
    async getAllCursos() {
        return await prisma_1.prisma.curso.findMany({
            where: {
                estado: 'activo'
            },
            orderBy: {
                fecha_creacion: 'desc'
            }
        });
    }
    // Obtiene un curso por su ID
    async getCursoById(idCurso) {
        return await prisma_1.prisma.curso.findUnique({
            where: {
                id_curso: idCurso,
                estado: 'activo'
            }
        });
    }
    // Verifica si un curso existe y está activo
    async cursoExistsAndActive(idCurso) {
        return await prisma_1.prisma.curso.findFirst({
            where: {
                id_curso: idCurso,
                estado: 'activo'
            }
        });
    }
    // Actualiza un curso existente
    async updateCurso(idCurso, data) {
        const cleanData = {};
        if (data.titulo !== undefined)
            cleanData.titulo = data.titulo;
        if (data.descripcion !== undefined)
            cleanData.descripcion = data.descripcion;
        if (data.imagen_url !== undefined)
            cleanData.imagen_url = data.imagen_url;
        return await prisma_1.prisma.curso.update({
            where: {
                id_curso: idCurso
            },
            data: cleanData
        });
    }
    // Marca un curso como eliminado (soft delete)
    async deleteCurso(idCurso) {
        return await prisma_1.prisma.curso.update({
            where: {
                id_curso: idCurso
            },
            data: {
                estado: 'eliminado'
            }
        });
    }
    async verifyCursoStarted(idCurso, idUsuario) {
        const comenzado = await prisma_1.prisma.curso_iniciado.findFirst({
            where: {
                id_curso: idCurso,
                id_usuario: idUsuario
            }
        });
        return comenzado ? true : false;
    }
    async startedCourse(idCurso, idUsuario) {
        return await prisma_1.prisma.curso_iniciado.create({
            data: {
                id_curso: idCurso,
                id_usuario: idUsuario
            }
        });
    }
    async getStartedCourses(idUsuario) {
        return await prisma_1.prisma.curso_iniciado.findMany({
            where: {
                id_usuario: idUsuario
            },
            include: {
                curso: true
            }
        });
    }
}
exports.CursoService = CursoService;
//# sourceMappingURL=courses.service.js.map