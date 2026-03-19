import { Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import { verifyTokenJWT } from "../middlewares/auth.middleware";

const router = Router();

// Método que crea un nuevo curso
router.post('/create', verifyTokenJWT, async (req: any, res: Response) => {
    const { title, descripcion, imagenUrl } = req.body;

    try {
        const newCourse = await prisma.curso.create({
            data: {
                titulo: title,
                descripcion: descripcion,
                imagen_url: imagenUrl
            }
        });

        if (!newCourse) {
            return res.status(401).json("No se pudo crear el curso.");
        }

        res.json({
            message: "¡Curso creado exitósamente!",
            newCourse
        });
    } catch (error) {
        console.error("Error al crear el curso:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Método que obtiene todos los cursos ACTIVOS
router.get('/all', verifyTokenJWT, async (req: any, res: Response) => {
    try {
        const courses = await prisma.curso.findMany({
            where: {
                estado: 'activo'  // Solo cursos activos
            },
            orderBy: {
                fecha_creacion: 'desc'  // Más recientes primero
            }
        });

        res.json(courses);
    } catch (error) {
        console.error("Error al consultar los cursos:", error);
        res.status(500).json({ message: "Error al consultar los cursos disponibles" });
    }
});

// Método para obtener un curso por su id
router.get('/getOne/:id', verifyTokenJWT, async (req: any, res: Response) => {
    const { id } = req.params;
    
    try {
        const course = await prisma.curso.findUnique({
            where: {
                id_curso: Number(id),
                estado: 'activo',
            },
        });

        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado o ya fue eliminado" });
        }

        res.json(course);
    } catch (error) {
        console.error("Error al consultar el curso:", error);
        res.status(500).json({ message: "Error al consultar el curso" });
    }
});

// Método que actualiza un curso existente
router.put('/update/:id', verifyTokenJWT, async (req: any, res: Response) => {
    const { id } = req.params;
    const { titulo, descripcion, imagenUrl } = req.body;

    try {
        // Verificar si el curso existe y está activo
        const courseExists = await prisma.curso.findFirst({
            where: {
                id_curso: parseInt(id),
                estado: 'activo'
            }
        });

        if (!courseExists) {
            return res.status(404).json({ message: "Curso no encontrado o ya fue eliminado" });
        }

        // Actualizar el curso
        const updatedCourse = await prisma.curso.update({
            where: {
                id_curso: parseInt(id)
            },
            data: {
                titulo: titulo,
                descripcion: descripcion,
                imagen_url: imagenUrl
            }
        });

        res.json({
            message: "Curso actualizado exitosamente",
            course: updatedCourse
        });
    } catch (error) {
        console.error("Error al actualizar el curso:", error);
        res.status(500).json({ message: "Error al actualizar el curso" });
    }
});

// Método que cambia el estado a "eliminado" simumlar el delete
router.delete('/delete/:id', verifyTokenJWT, async (req: any, res: Response) => {
    const { id } = req.params;

    try {
        // Verificar si el curso existe y está activo
        const courseExists = await prisma.curso.findFirst({
            where: {
                id_curso: parseInt(id),
                estado: 'activo'
            }
        });

        if (!courseExists) {
            return res.status(404).json({ message: "Curso no encontrado o ya fue eliminado" });
        }

        // Soft delete: cambiar estado a 'eliminado'
        const deletedCourse = await prisma.curso.update({
            where: {
                id_curso: parseInt(id)
            },
            data: {
                estado: 'eliminado'
            }
        });

        res.json({
            message: "Curso eliminado exitosamente",
            course: deletedCourse
        });
    } catch (error) {
        console.error("Error al eliminar el curso:", error);
        res.status(500).json({ message: "Error al eliminar el curso" });
    }
});

export default router;