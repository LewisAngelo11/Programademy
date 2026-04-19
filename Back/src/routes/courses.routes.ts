import { Router } from 'express';
import { CursoController } from '../controllers/courses.controller';
import { verifyTokenJWT } from '../middlewares/auth.middleware';

const router = Router();
const cursoController = new CursoController();

// Crear un nuevo curso
router.post('/create', verifyTokenJWT, cursoController.create);

// Obtener todos los cursos activos
router.get('/all', verifyTokenJWT, cursoController.getAll);

// Obtener un curso por ID
router.get('/getOne/:id', verifyTokenJWT, cursoController.getById);

// Actualizar un curso
router.put('/update/:id', verifyTokenJWT, cursoController.update);

// Eliminar (soft delete) un curso
router.delete('/delete/:id', verifyTokenJWT, cursoController.delete);

export default router;