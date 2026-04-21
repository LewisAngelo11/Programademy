import { Router } from 'express';
import { QuizController } from '../controllers/quizzes.controller';
import { verifyTokenJWT } from '../middlewares/auth.middleware';

const router = Router();
const quizController = new QuizController();

// Crear un nuevo quiz
router.post('/create', verifyTokenJWT, quizController.create);

// Obtener todos los quizzes
router.get('/all', verifyTokenJWT, quizController.getAll);

// Obtener un quiz por ID
router.get('/getOne/:id', verifyTokenJWT, quizController.getQuiz);

// Actualizar un quiz
router.put('/update/:id', verifyTokenJWT, quizController.update);

// Eliminar (soft delete) un quiz
router.delete('/delete/:id', verifyTokenJWT, quizController.delete);

export default router;
