import { Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import { verifyTokenJWT } from "../middlewares/auth.middleware";

const router = Router();

// Método que crea un nuevo curso
router.post('/create', verifyTokenJWT, async (req: any, res: Response) => {
    const { title, descripcion } = req.body;

    const newCourse = await prisma.curso.create({
        data: {
            titulo: title,
            descripcion: descripcion
        }
    });

    if (!newCourse) {
        return res.status(401).json("No se pudo crear el curso.");
    }

    res.json({
        message: "¡Curso creado exitósamente!",
        newCourse
    });
});

router.get('/all', verifyTokenJWT, async (req: any, res: Response) => {
    const courses = await prisma.curso.findMany();

    if (!courses) {
        return res.status(401).json({ message: "Error al consultar los cursos disponibles" });
    }

    res.json(courses);
});

export default router;