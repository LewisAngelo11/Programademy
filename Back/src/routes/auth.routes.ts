import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
import { prisma } from "../../lib/prisma";

dotenv.config();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, passw } = req.body;
        const secret = process.env.JWT_SECRET || 'Secret-Object';

        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });

        if (!usuario) {
            return res.status(404).json({ message: "El correo ingresado no está registrado." });
        }

        if (usuario?.password !== passw) {
            return res.status(401).json({ message: "La contraseña es incorrecta." });
        }

        // Se crea el token JWT
        const token = jwt.sign({ id:usuario?.id_usuario }, secret, { expiresIn: '1h' });

        // Crea una copia del objeto usuario pero sin la contraseña para devolverla al cliente
        const { password, ...userWithoutPassw } = usuario;

        res.json({
            message: "¡¡Bienvenido!!",
            token,
            user: userWithoutPassw,
        });

    } catch (err) {
        console.log("Error en el login: ", err)
    }
})

export default router;