import { create } from "node:domain";
import { prisma } from "../../lib/prisma";
import { CreateQuizDTO, UpdateQuizDTO } from '../types/quiz.types';

export class QuizService {
  // Crear un Quiz junto con sus preguntas y opciones anidadas
  async createQuiz(data: CreateQuizDTO) {
    return prisma.quiz.create({
      data: {
        titulo: data.titulo,
        id_modulo: data.id_modulo,
        tiempo_limite_segundos: data.tiempo_limite_segundos,
        puntos_recompensa: data.puntos_recompensa,
        // INcluir las preguntas, solo si se enviaron
        pregunta: data.pregunta && {
          create: data.pregunta.map(p => ({
            enunciado: p.enunciado,
            orden: p.orden,
            // Incluir las opciones solo si se enviaron
            opcion: p.opcion && {
              create: p.opcion.map(o => ({
                Texto: o.Texto,
                es_correcta: o.es_correcta,
                orden: o.orden
              }))
            }
          }))
        }
      },
      include: {
        pregunta: {
          include: {
            opcion: true
          }
        }
      }
    });
  }

  // Obtener todos los quizzes con sus preguntas y opciones
  async getAllQuizzes(filters?: any) {
    return prisma.quiz.findMany({
      where: filters,
      include: {
        pregunta: {
          include: {
            opcion: true
          }
        }
      }
    });
  }

  // Obtener un quiz por su ID
  async getQuizById(id_quiz: number) {
    return prisma.quiz.findUnique({
      where: { id_quiz },
      include: {
        pregunta: {
          include: {
            opcion: true
          }
        }
      }
    });
  }

  // Actualizar la información básica de un quiz
  async updateQuiz(id_quiz: number, data: UpdateQuizDTO) {
    return prisma.quiz.update({
      where: { id_quiz },
      data: {
        id_modulo: data.id_modulo,
        titulo: data.titulo,
        tiempo_limite_segundos: data.tiempo_limite_segundos,
        puntos_recompensa: data.puntos_recompensa,
        // Incluir las preguntas en la query si fueron proporcionados
        pregunta: data.pregunta && {
          deleteMany: {},
          create: data.pregunta.map(p => ({
            enunciado: p.enunciado,
            orden: p.orden,
            // Incluir las opciones en la query si fueron proporcionados
            opcion: p.opcion && {
              create: p.opcion.map(o => ({
                Texto: o.Texto,
                es_correcta: o.es_correcta,
                orden: o.orden
              }))
            }
          }))
        }
      }
    });
  }

  // Registrar un intento de un quiz
  async registerAttempt(id_quiz: number, id_usuario: number, calificacion: number, puntos_otorgados: number, completado: boolean) {
    
    const userStudent = await prisma.usuario.findUnique({
      where: { id_usuario: id_usuario, }
    })

    const attemptQuiz = await prisma.intento_quiz.create({
      data: {
        id_quiz: id_quiz,
        id_usuario: id_usuario,
        calificacion: calificacion,
        puntos_otorgados: puntos_otorgados,
        completado_100: completado ? completado : false
      },
      include: {
        quiz: true,
      }
    });

    if (attemptQuiz.completado_100) {
      const currentPoints = userStudent?.puntos_totales ?? 0;
      const rewardPoints = attemptQuiz.puntos_otorgados ?? 0;
      const totalPoints = currentPoints + rewardPoints;

      await prisma.usuario.update({
        where: {
          id_usuario: id_usuario
        },
        data: {
          puntos_totales: totalPoints
        }
      });
    }

    return attemptQuiz;
  }

  async getAttempsComplete(id_quiz: number, id_usuario: number) {
    return prisma.intento_quiz.findFirst({
      where: {
        id_quiz: id_quiz,
        id_usuario: id_usuario,
        completado_100: true
      }
    });
  }

  // Eliminar un quiz por su ID (Borrado en cascada)
  async deleteQuiz(id_quiz: number) {
    return prisma.quiz.delete({
      where: { id_quiz }
    });
  }
};
