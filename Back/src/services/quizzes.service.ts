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

  // Eliminar un quiz por su ID (Borrado en cascada)
  async deleteQuiz(id_quiz: number) {
    return prisma.quiz.delete({
      where: { id_quiz }
    });
  }
};
