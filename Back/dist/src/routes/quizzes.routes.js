"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizzes_controller_1 = require("../controllers/quizzes.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const quizController = new quizzes_controller_1.QuizController();
// Crear un nuevo quiz
router.post('/create', auth_middleware_1.verifyTokenJWT, quizController.create);
// Obtener todos los quizzes
router.get('/all', auth_middleware_1.verifyTokenJWT, quizController.getAll);
// Obtener un quiz por ID
router.get('/getOne/:id', auth_middleware_1.verifyTokenJWT, quizController.getQuiz);
// Actualizar un quiz
router.put('/update/:id', auth_middleware_1.verifyTokenJWT, quizController.update);
// Registrar un intento de quiz
router.post('/attemptQuiz/:id', auth_middleware_1.verifyTokenJWT, quizController.createAttempt);
// Obtener todos los intentos del usuario
router.get('/allAttempts', auth_middleware_1.verifyTokenJWT, quizController.getAllAtempts);
// Obtener todos los intentos dwe quizzes de todos los estudiantes
router.get('/allStudents/allAttempts', auth_middleware_1.verifyTokenJWT, quizController.getAllAttemptsStudents);
// Obtener un intento completado
router.get('/attemptComplete/:id', auth_middleware_1.verifyTokenJWT, quizController.getAttemptComplete);
// Obtener el último intento de un quiz
router.get('/lastAttempt/:id', auth_middleware_1.verifyTokenJWT, quizController.getLastAttempt);
// Eliminar (soft delete) un quiz
router.delete('/delete/:id', auth_middleware_1.verifyTokenJWT, quizController.delete);
exports.default = router;
//# sourceMappingURL=quizzes.routes.js.map