"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modules_controller_1 = require("../controllers/modules.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const moduloController = new modules_controller_1.ModuloController();
// Obtener todos los módulos activos
router.get('/all', auth_middleware_1.verifyTokenJWT, moduloController.getAll);
// Obtener módulos por curso
router.get('/course/all/:id', auth_middleware_1.verifyTokenJWT, moduloController.getByCourse);
// Obtener un módulo por ID
router.get('/get/:id', auth_middleware_1.verifyTokenJWT, moduloController.getById);
// Crear un nuevo módulo
router.post('/create', auth_middleware_1.verifyTokenJWT, moduloController.create);
// Actualizar un módulo
router.put('/update/:id', auth_middleware_1.verifyTokenJWT, moduloController.update);
// Eliminar (soft delete) un módulo
router.put('/delete/:id', auth_middleware_1.verifyTokenJWT, moduloController.delete);
exports.default = router;
//# sourceMappingURL=modules.routes.js.map