import { prisma } from "../../lib/prisma";

export class ProgressService {

    async verifyModuloCompletion(idUsuario: number, idModulo: number) {
        // Primero obtiene todos los quizzes del módulo junto con los intentos del usuario
        const quizzes = await prisma.quiz.findMany({
            where: {
                id_modulo: idModulo,
            },
            include: {
                intento_quiz: {
                    where: {
                        id_usuario: idUsuario,
                        completado_100: true
                    }
                }
            }
        });

        if (quizzes.length === 0) return false;

        const moduloCompleto = quizzes.every(
            quiz => quiz.intento_quiz.length > 0
        );

        if (!moduloCompleto) return false;

        // Guardar módulo completado
        await prisma.modulo_completado.upsert({
            where: {
                id_usuario_id_modulo: {
                    id_usuario: idUsuario,
                    id_modulo: idModulo
                }
            },
            update: {
                completado: true,
                fecha_completado: new Date()
            },
            create: {
                id_usuario: idUsuario,
                id_modulo: idModulo,
                completado: true,
                fecha_completado: new Date()
            }
        });
        await this.verifyCursoCompletion(idModulo, idUsuario);

        return true;
    }

    async verifyCursoCompletion(idModulo: number, idUsuario: number) {
        const modulo = await prisma.modulo.findUnique({
            where: {
                id_modulo: idModulo
            }
        });

        if (!modulo) return false;

        const modulosCurso = await prisma.modulo.findMany({
            where: {
                id_curso: modulo.id_curso
            },
            include: {
                modulo_completado: {
                    where: {
                        id_usuario: idUsuario,
                        completado: true
                    }
                }
            }
        });

        if (modulosCurso.length === 0) return false;

        const cursoCompleto = modulosCurso.every(
            modulo => modulo.modulo_completado.length > 0
        );

        if (!cursoCompleto) return false;

        await prisma.curso_iniciado.update({
            where: {
                id_usuario_id_curso: {
                    id_usuario: idUsuario,
                    id_curso: modulo.id_curso
                }
            },
            data: {
                completado: true,
                fecha_completado: new Date()
            }
        });

        return true;
    }
}