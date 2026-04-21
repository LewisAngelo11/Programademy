import { lenguaje_programacion } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { CreateModuloDTO, UpdateModuloDTO } from "../types/module.types";

export class ModuloService {
    // Método para obtener todos los módulos activos
    async getAllModules() {
        return await prisma.modulo.findMany({
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
    async getModulosByCurso(idCurso: number) {
        return await prisma.modulo.findMany({
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
                codigo_ejemplo: true
            },
            orderBy: {
                orden: 'asc'
            }
        });
    }

    // Método para obtener un módulo por ID
    async getModuloById(idModulo: number) {
        return await prisma.modulo.findUnique({
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
    async cursoExists(idCurso: number): Promise<boolean> {
        const curso = await prisma.curso.findUnique({
            where: { id_curso: idCurso }
        });
        return curso !== null;
    }

    // Método para verificar si el curso existe
    async moduloExists(idModulo: number) {
        return await prisma.modulo.findUnique({
            where: { id_modulo: idModulo }
        });
    }

    // Método para crear el módulo
    async createModulo(data: CreateModuloDTO) {
        // Construir objeto solo con campos definidos
        const createData: any = {};
        
        if (data.titulo !== undefined) createData.titulo = data.titulo;
        if (data.descripcion !== undefined) createData.descripcion = data.descripcion;
        if (data.contenido_teorico !== undefined) createData.contenido_teorico = data.contenido_teorico;
        if (data.orden !== undefined) createData.orden = data.orden;
        if (data.id_curso !== undefined) createData.id_curso = data.id_curso;

        if (data.codigo_ejemplo !== undefined) {
            // Mapa de conversión: string frontend → valor enum Prisma
            const lenguajeMap: Record<string, string> = {
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

        return await prisma.modulo.create({
            data: createData,
            include: {
                curso: true,
                codigo_ejemplo: true
            }
        });
    }

    // Método para actualizar un módulo
    async updateModulo(idModulo: number, data: UpdateModuloDTO) {
        // Construir objeto solo con campos definidos
        const updateData: any = {};
        
        if (data.titulo !== undefined) updateData.titulo = data.titulo;
        if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
        if (data.contenido_teorico !== undefined) updateData.contenido_teorico = data.contenido_teorico;
        if (data.orden !== undefined) updateData.orden = data.orden;
        if (data.id_curso !== undefined) updateData.id_curso = data.id_curso;

        if (data.codigo_ejemplo !== undefined) {
            // Mapa de conversión: string frontend → valor enum Prisma
            const lenguajeMap: Record<string, string> = {
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

        return await prisma.modulo.update({
            where: { id_modulo: idModulo },
            data: updateData,
            include: {
                curso: true,
                codigo_ejemplo: true
            }
        });
    }

    // Marca un módulo como eliminado (soft delete)
    async deleteModulo(idModulo: number) {
        return await prisma.modulo.update({
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