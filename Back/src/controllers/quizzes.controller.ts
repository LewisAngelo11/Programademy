import { Request, Response } from 'express';
import { QuizService } from '../services/quizzes.service';

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  // Crear un nuevo quiz
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const newQuiz = await this.quizService.createQuiz(data);

      res.status(201).json({
        message: 'Quiz creado exitosamente',
        data: newQuiz
      });
    } catch (error) {
      console.error('Error al crear quiz:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear quiz' });
    }
  };

  // Obtener todos los quiz
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // Ejemplo de cómo manejar filtros básicos (por módulo, por ejemplo)
      const { id_modulo } = req.query;
      const filters = id_modulo ? { id_modulo: Number(id_modulo) } : undefined;

      const quizzes = await this.quizService.getAllQuizzes(filters);
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error al obtener quizzes:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener quizzes' });
    }
  };

  // Obtener un quiz por ID
  getQuiz = async (req: any, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const quiz = await this.quizService.getQuizById(id);
      if (!quiz) {
        res.status(404).json({ error: 'Quiz no encontrado' });
        return;
      }

      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error al obtener quiz por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener quiz' });
    }
  };

  // Actualizar un quiz
  update = async (req: any, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const data = req.body;
      const updatedQuiz = await this.quizService.updateQuiz(id, data);
      res.status(200).json({
        message: 'Quiz actualizado exitosamente',
        data: updatedQuiz
      });
    } catch (error) {
      console.error('Error al actualizar quiz:', error);
      res.status(500).json({ error: 'Error interno del servidor al actualizar quiz' });
    }
  };

  // Eliminar un quiz (soft delete)
  delete = async (req: any, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      await this.quizService.deleteQuiz(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar quiz:', error);
      res.status(500).json({ error: 'Error interno del servidor al eliminar quiz' });
    }
  };
}

