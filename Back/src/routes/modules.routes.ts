import { Router } from 'express';
import { ModuloController } from '../controllers/modules.controller';
import { verifyTokenJWT } from '../middlewares/auth.middleware';

const router = Router();
const moduloController = new ModuloController();

// Obtener todos los módulos activos
router.get('/all', verifyTokenJWT, moduloController.getAll);

// Obtener módulos por curso
router.get('/course/all/:id', verifyTokenJWT, moduloController.getByCourse);

// Obtener un módulo por ID
router.get('/get/:id', verifyTokenJWT, moduloController.getById);

// Crear un nuevo módulo
router.post('/create', verifyTokenJWT, moduloController.create);

// Actualizar un módulo
router.put('/update/:id', verifyTokenJWT, moduloController.update);

// Eliminar (soft delete) un módulo
router.put('/delete/:id', verifyTokenJWT, moduloController.delete);

export default router;