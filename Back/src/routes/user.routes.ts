import { Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import { verifyTokenJWT } from "../middlewares/auth.middleware";

const router = Router();

// Método que devuelve los datos del usuario
router.get('/info', verifyTokenJWT, async (req: any, res: Response) => {
    const idUsuario = req.usuario.id;

    const usuario = await prisma.usuario.findUnique({
        where: {
            id_usuario: idUsuario,
        },
    });

    if (!usuario) {
        return res.status(401).json({ message: "Usuario no encontrado." });
    }

    // Crea una copia del usuario pero sin la contraseña, para devolverlo al cliente
    const {password, ...usuarioWithoutPassw} = usuario;

    res.json(usuarioWithoutPassw);
});

// Método que actualiza nombre y email del usuario autenticado
router.put('/update', verifyTokenJWT, async (req: any, res: Response) => {
    const idUsuario = req.usuario.id;
    const { nombre, email } = req.body;

    try {
        const usuarioActualizado = await prisma.usuario.update({
            where: {
                id_usuario: idUsuario,
            },
            data: {
                nombre,
                email,
            },
        });

        // Quitar contraseña antes de devolver respuesta
        const { password, ...usuarioWithoutPassw } = usuarioActualizado;

        res.json({
            message: "Usuario actualizado correctamente.",
            usuario: usuarioWithoutPassw
        });

    } catch (error: any) {

        // Si el email ya existe por que el email es unique
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "El email ya está en uso." });
        }

        return res.status(500).json({ message: "Error al actualizar el usuario." });
    }
});

export default router;