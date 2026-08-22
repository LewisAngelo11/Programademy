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

// Registrar un intento de quiz
router.post('/attemptQuiz/:id', verifyTokenJWT, quizController.createAttempt);

// Obtener todos los intentos del usuario
router.get('/allAttempts', verifyTokenJWT, quizController.getAllAtempts);

// Obtener todos los intentos dwe quizzes de todos los estudiantes
router.get('/allStudents/allAttempts', verifyTokenJWT, quizController.getAllAttemptsStudents);

// Obtener un intento completado
router.get('/attemptComplete/:id', verifyTokenJWT, quizController.getAttemptComplete);

// Obtener el último intento de un quiz
router.get('/lastAttempt/:id', verifyTokenJWT, quizController.getLastAttempt);

// Eliminar (soft delete) un quiz
router.delete('/delete/:id', verifyTokenJWT, quizController.delete);

export default router;
