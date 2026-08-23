"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const quizzes_service_1 = require("../services/quizzes.service");
class QuizController {
    constructor() {
        // Crear un nuevo quiz
        this.create = async (req, res) => {
            try {
                const data = req.body;
                const newQuiz = await this.quizService.createQuiz(data);
                res.status(201).json({
                    message: 'Quiz creado exitosamente',
                    data: newQuiz
                });
            }
            catch (error) {
                console.error('Error al crear quiz:', error);
                res.status(500).json({ error: 'Error interno del servidor al crear quiz' });
            }
        };
        // Obtener todos los quiz
        this.getAll = async (req, res) => {
            try {
                // Ejemplo de cómo manejar filtros básicos (por módulo, por ejemplo)
                const { id_modulo } = req.query;
                const filters = id_modulo ? { id_modulo: Number(id_modulo) } : undefined;
                const quizzes = await this.quizService.getAllQuizzes(filters);
                res.status(200).json(quizzes);
            }
            catch (error) {
                console.error('Error al obtener quizzes:', error);
                res.status(500).json({ error: 'Error interno del servidor al obtener quizzes' });
            }
        };
        // Obtener un quiz por ID
        this.getQuiz = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const quiz = await this.quizService.getQuizById(id);
                if (!quiz) {
                    res.status(404).json({ error: 'Quiz no encontrado' });
                    return;
                }
                res.status(200).json(quiz);
            }
            catch (error) {
                console.error('Error al obtener quiz por ID:', error);
                res.status(500).json({ error: 'Error interno del servidor al obtener quiz' });
            }
        };
        // Actualizar un quiz
        this.update = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const data = req.body;
                const updatedQuiz = await this.quizService.updateQuiz(id, data);
                res.status(200).json({
                    message: 'Quiz actualizado exitosamente',
                    data: updatedQuiz
                });
            }
            catch (error) {
                console.error('Error al actualizar quiz:', error);
                res.status(500).json({ error: 'Error interno del servidor al actualizar quiz' });
            }
        };
        // Crea un intento de quiz
        this.createAttempt = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const idUsuario = parseInt(req.usuario.id);
                const { calificacion, puntos_otorgados, completado } = req.body;
                const newAttempt = await this.quizService.registerAttempt(id, idUsuario, calificacion, puntos_otorgados, completado);
                res.status(200).json({
                    message: "¡Registro de intento del quiz hecho!",
                    newAttempt
                });
            }
            catch (error) {
                console.error("Error al registrar el intento del quiz:", error);
                res.status(500).json({ error: "Error interno del servidor al registrar el intento" });
            }
        };
        // Obtener todos los intentos del usuario
        this.getAllAtempts = async (req, res) => {
            try {
                const idUsuario = parseInt(req.usuario.id);
                const allAttempts = await this.quizService.getAllAttempts(idUsuario);
                res.status(200).json(allAttempts);
            }
            catch (error) {
                console.error("Error al obtener los intentos:", error);
                res.status(500).json({ error: "Error interno del servidor al obtener los intentos" });
            }
        };
        // Obtener un intento completado
        this.getAttemptComplete = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const idUsuario = parseInt(req.usuario.id);
                const attemptComplete = await this.quizService.getAttempsComplete(id, idUsuario);
                res.status(200).json(attemptComplete);
            }
            catch (error) {
                console.error("Error al obtener un intento completado:", error);
                res.status(500).json({ error: "Error interno del servidor al obtener el intento completado" });
            }
        };
        // Obtener el último intento de un quiz para el usuario actual
        this.getLastAttempt = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const idUsuario = Number(req.usuario.id);
                const lastAttempt = await this.quizService.getLastAttempt(id, idUsuario);
                res.status(200).json(lastAttempt);
            }
            catch (error) {
                console.error("Error al obtener el último intento del quiz:", error);
                res.status(500).json({ error: "Error interno del servidor al obtener el último intento" });
            }
        };
        // Obtener todos los intentos de quizzes de cada estudiante
        this.getAllAttemptsStudents = async (req, res) => {
            try {
                const allStudentsQuizzes = await this.quizService.getAllAttemptsQuizzesStudents();
                res.status(200).json(allStudentsQuizzes);
            }
            catch (error) {
                console.error("Error al obtener los intentos completados de los estudiantes:", error);
                res.status(500).json({ error: "Error interno del servidor al obtener los intentos completados de los estudiantes" });
            }
        };
        // Eliminar un quiz (soft delete)
        this.delete = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                await this.quizService.deleteQuiz(id);
                res.status(204).send();
            }
            catch (error) {
                console.error('Error al eliminar quiz:', error);
                res.status(500).json({ error: 'Error interno del servidor al eliminar quiz' });
            }
        };
        this.quizService = new quizzes_service_1.QuizService();
    }
}
exports.QuizController = QuizController;
//# sourceMappingURL=quizzes.controller.js.map