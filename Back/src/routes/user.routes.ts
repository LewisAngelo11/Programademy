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

export default router;