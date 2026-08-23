"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courses_controller_1 = require("../controllers/courses.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const cursoController = new courses_controller_1.CursoController();
// Crear un nuevo curso
router.post('/create', auth_middleware_1.verifyTokenJWT, cursoController.create);
// Obtener todos los cursos activos
router.get('/all', auth_middleware_1.verifyTokenJWT, cursoController.getAll);
// Obtener todos los cursos iniciados
router.get('/allStarted', auth_middleware_1.verifyTokenJWT, cursoController.getStarted);
// Obtener un curso por ID
router.get('/getOne/:id', auth_middleware_1.verifyTokenJWT, cursoController.getById);
// Actualizar un curso
router.put('/update/:id', auth_middleware_1.verifyTokenJWT, cursoController.update);
// Marcar como comenzado un curso
router.post('/started/:id', auth_middleware_1.verifyTokenJWT, cursoController.started);
// Eliminar (soft delete) un curso
router.delete('/delete/:id', auth_middleware_1.verifyTokenJWT, cursoController.delete);
exports.default = router;
//# sourceMappingURL=courses.routes.js.map