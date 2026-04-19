import { Router, Request, Response } from 'express';
import { prisma } from "../../lib/prisma";
import { verifyTokenJWT } from '../middlewares/auth.middleware';

const router = Router();

// Método para obtener todos los módulos (con filtros opcionales)
router.get('/all', verifyTokenJWT, async (req: Request, res: Response) => {
    try {
        const modulos = await prisma.modulo.findMany({
            where: {
                estatus: "activo"
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                orden: 'asc'
            }
        }); 

        res.json(modulos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener módulos' });
    }
});

// Método para obtener todos los módulos pertenecientes a un curso en específico
router.get('/course/all/:id', verifyTokenJWT, async (req: Request, res: Response) => {
    const { id } = req.params; // Obtiene el id del curso

    try {
        const modulos = await prisma.modulo.findMany({
            where: {
                id_curso: Number(id),
                estatus: "activo"
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                orden: 'asc'
            }
        }); 

        res.json(modulos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener módulos' });
    }
});

// Método para obtener un módulo por su Id
router.get('/get/:id', verifyTokenJWT, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const modulo = await prisma.modulo.findUnique({
            where: { 
                id_modulo: Number(id),
                estatus: "activo"
            },
            include: {
                curso: true,
                quiz: true
            }
        });

        if (!modulo) {
            return res.status(404).json({ error: 'Módulo no encontrado' });
        }

        res.json(modulo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el módulo' });
    }
});

// Método para crear un nuevo módulo
router.post('/create', verifyTokenJWT, async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion, contenido_teorico, orden, id_curso } = req.body;

        // Verifica que no vengan vaciós los campos
        if (!titulo || !orden || !id_curso || !contenido_teorico) {
            return res.status(400).json({ 
                error: 'Faltan campos requeridos: titulo, orden, id_curso' 
            });
        }

        // Verificar que el curso existe
        const cursoExiste = await prisma.curso.findUnique({
            where: {
                id_curso: Number(id_curso)
            }
        });

        if (!cursoExiste) {
            return res.status(404).json({ error: 'El curso especificado no existe' });
        }

        const nuevoModulo = await prisma.modulo.create({
            data: {
                titulo: titulo,
                descripcion: descripcion,
                contenido_teorico: contenido_teorico,
                orden: Number(orden),
                id_curso: Number(id_curso)
            },
            include: {
                curso: true
            }
        });

        res.status(201).json(nuevoModulo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el módulo' });
    }
});

// Método para actualizar un módulo
router.put('/update/:id', verifyTokenJWT, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, contenido_teorico, orden, id_curso } = req.body;

        // Verificar que el módulo existe
        const moduloExiste = await prisma.modulo.findUnique({
            where: { id_modulo: Number(id) }
        });

        if (!moduloExiste) {
            return res.status(404).json({ error: 'Módulo no encontrado' });
        }

        // Si se intenta cambiar el curso, verificar que existe
        if (id_curso && id_curso !== moduloExiste.id_curso) {
            const cursoExiste = await prisma.curso.findUnique({
                where: { id_curso: Number(id_curso) }
            });

            if (!cursoExiste) {
                return res.status(404).json({ error: 'El curso especificado no existe' });
            }
        }

        const moduloActualizado = await prisma.modulo.update({
            where: { id_modulo: Number(id) },
            data: {
                titulo: titulo,
                descripcion: descripcion,
                contenido_teorico: contenido_teorico,
                orden: orden,
                id_curso: id_curso
            },
            include: {
                curso: true
            }
        });

        res.json(moduloActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el módulo' });
    }
});

// Método que cambia el estatus del módulo a eliminado
router.put('/delete/:id', verifyTokenJWT, async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const idModulo = parseInt(id);

        // Verificar que el módulo exista
        const moduloExiste = await prisma.modulo.findUnique({
            where: { id_modulo: idModulo }
        });

        if (!moduloExiste) {
            return res.status(404).json({ 
                error: 'Módulo no encontrado' 
            });
        }

        // Verificar que no esté ya eliminado el módulo
        if (moduloExiste.estatus === 'eliminado') {
            return res.status(400).json({ error: 'El módulo ya está eliminado' });
        }

        // Cambiar el estatus a eliminado
        const moduloActualizado = await prisma.modulo.update({
            where: {
                id_modulo: idModulo
            },
            data: {
                estatus: 'eliminado'
            },
            include: {
                curso: {
                    select: {
                        id_curso: true,
                        titulo: true
                    }
                }
            }
        });

        return res.status(200).json({
            mensaje: 'Módulo marcado como eliminado exitosamente',
            modulo: moduloActualizado
        });

    } catch (error) {
        console.error('Error al eliminar módulo:', error);
        return res.status(500).json({ error: 'Error interno del servidor al eliminar el módulo' });
    }
});

export default router;