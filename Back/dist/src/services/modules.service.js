"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuloService = void 0;
const prisma_1 = require("../../lib/prisma");
class ModuloService {
    // Método para obtener todos los módulos activos
    async getAllModules() {
        return await prisma_1.prisma.modulo.findMany({
            where: {
                estatus: "activo"
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                },
                codigo_ejemplo: true
            },
            orderBy: {
                orden: 'asc'
            }
        });
    }
    // Métodos para obtener todos los módulos activos de un curso en específico
    async getModulosByCurso(idCurso, idUsuario) {
        const modules = await prisma_1.prisma.modulo.findMany({
            where: {
                id_curso: idCurso,
                estatus: "activo"
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                },
                codigo_ejemplo: true,
                modulo_completado: {
                    where: {
                        id_usuario: idUsuario,
                        completado: true
                    }
                }
            },
            orderBy: {
                orden: 'asc'
            }
        });
        return modules.map(module => ({
            ...module,
            completed: module.modulo_completado.length > 0
        }));
    }
    // Método para obtener un módulo por ID
    async getModuloById(idModulo) {
        return await prisma_1.prisma.modulo.findUnique({
            where: {
                id_modulo: idModulo,
                estatus: "activo"
            },
            include: {
                curso: true,
                quiz: true,
                codigo_ejemplo: true
            }
        });
    }
    // Método para verificar si el curso existe
    async cursoExists(idCurso) {
        const curso = await prisma_1.prisma.curso.findUnique({
            where: { id_curso: idCurso }
        });
        return curso !== null;
    }
    // Método para verificar si el curso existe
    async moduloExists(idModulo) {
        return await prisma_1.prisma.modulo.findUnique({
            where: { id_modulo: idModulo }
        });
    }
    // Método para crear el módulo
    async createModulo(data) {
        // Construir objeto solo con campos definidos
        const createData = {};
        if (data.titulo !== undefined)
            createData.titulo = data.titulo;
        if (data.descripcion !== undefined)
            createData.descripcion = data.descripcion;
        if (data.contenido_teorico !== undefined)
            createData.contenido_teorico = data.contenido_teorico;
        if (data.orden !== undefined)
            createData.orden = data.orden;
        if (data.id_curso !== undefined)
            createData.id_curso = data.id_curso;
        if (data.codigo_ejemplo !== undefined) {
            // Mapa de conversión: string frontend → valor enum Prisma
            const lenguajeMap = {
                "C": "C",
                "C++": "C__",
                "Python": "Python",
                "JavaScript": "JavaScript",
                "Java": "Java",
                "C#": "C_"
            };
            // Transformar objeto a array
            const codigosArray = Object.entries(data.codigo_ejemplo).map(([lenguaje, datos]) => ({
                lenguaje: lenguajeMap[lenguaje], // ← Convierte al valor correcto del enum
                explicacion_codigo: datos.explicacion_codigo,
                codigo: datos.codigo
            }));
            createData.codigo_ejemplo = {
                create: codigosArray // Crea los nuevos
            };
        }
        return await prisma_1.prisma.modulo.create({
            data: createData,
            include: {
                curso: true,
                codigo_ejemplo: true
            }
        });
    }
    // Método para actualizar un módulo
    async updateModulo(idModulo, data) {
        // Construir objeto solo con campos definidos
        const updateData = {};
        if (data.titulo !== undefined)
            updateData.titulo = data.titulo;
        if (data.descripcion !== undefined)
            updateData.descripcion = data.descripcion;
        if (data.contenido_teorico !== undefined)
            updateData.contenido_teorico = data.contenido_teorico;
        if (data.orden !== undefined)
            updateData.orden = data.orden;
        if (data.id_curso !== undefined)
            updateData.id_curso = data.id_curso;
        if (data.codigo_ejemplo !== undefined) {
            // Mapa de conversión: string frontend → valor enum Prisma
            const lenguajeMap = {
                "C": "C",
                "C++": "C__",
                "Python": "Python",
                "JavaScript": "JavaScript",
                "Java": "Java",
                "C#": "C_"
            };
            // Transformar objeto a array
            const codigosArray = Object.entries(data.codigo_ejemplo).map(([lenguaje, datos]) => ({
                lenguaje: lenguajeMap[lenguaje], // ← Convierte al valor correcto del enum
                explicacion_codigo: datos.explicacion_codigo,
                codigo: datos.codigo
            }));
            updateData.codigo_ejemplo = {
                deleteMany: {}, // Elimina todos los códigos existentes
                create: codigosArray // Crea los nuevos
            };
        }
        console.log(updateData);
        return await prisma_1.prisma.modulo.update({
            where: { id_modulo: idModulo },
            data: updateData,
            include: {
                curso: true,
                codigo_ejemplo: true
            }
        });
    }
    // Marca un módulo como eliminado (soft delete)
    async deleteModulo(idModulo) {
        return await prisma_1.prisma.modulo.update({
            where: { id_modulo: idModulo },
            data: {
                estatus: 'eliminado'
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                }
            }
        });
    }
}
exports.ModuloService = ModuloService;
//# sourceMappingURL=modules.service.js.map