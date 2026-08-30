import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
import bcrypt, { compare } from "bcryptjs"
import { prisma } from "../../lib/prisma";
import { generateSecureToken } from "../utils/generateToken";
import { sendEmail } from "../services/email.service";

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

        // Compara la contraseña ingresada con la hasheada en la BD
        const compareHashPassword = await bcrypt.compare(passw, usuario?.password);

        if (!compareHashPassword) {
            return res.status(401).json({ message: "La contraseña es incorrecta." });
        }

        // Se crea el token JWT
        const token = jwt.sign({ id:usuario?.id_usuario }, secret, { expiresIn: '1h' });

        // Manda las Cookies al front
        res.cookie("access_token", token, {
            httpOnly: true, // Solo accedible en el back
            secure: process.env.NODE_ENV === "production", // HTTPS solo en producción
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, // Expiración 1 hora
        });

        // Crea una copia del objeto usuario pero sin la contraseña para devolverla al cliente
        const { password, ...userWithoutPassw } = usuario;

        res.json({
            message: "¡¡Bienvenido!!",
            user: userWithoutPassw,
        });

    } catch (err) {
        console.log("Error en el login: ", err)
    }
})

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { nombre, email, password } = req.body;

        const alreadyExist = await prisma.usuario.findUnique({
            where: {
                email: email,
            }
        });

        if (alreadyExist) {
            return res.status(401).json({ message: "El correo ingresado ya está registrado." });
        }

        // Hashea la contraseña del usuario antes de guardarla en la BD
        const saltRounds = 10;
        const passwordHashed = await bcrypt.hash(password, saltRounds);

        // Crea el nuevo usuario
        const newUsuario = await prisma.usuario.create({
            data: {
                nombre: nombre,
                email: email,
                password: passwordHashed
            }
        });

        res.json(newUsuario);

    } catch (err) {
        console.error("Error en el registro: ", err);
    }
});

// Método que 
router.post('/forgot-password', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado",
            });
        }

        const token = generateSecureToken();

        // Expiración del token en 15 minutos
        const expiracion = new Date(Date.now() + 1000 * 60 * 15);

        await prisma.token_usuario.create({
            data: {
                token,
                tipo: "RESET_PASSWORD",
                expiracion,
                id_usuario: usuario.id_usuario,
            },
        });

        // Envía el link para restablecer la contraseña al front
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await sendEmail({
            to: usuario.email,
            subject: "Restablecer contraseña - Programademy",
            resetLink,
        });

        res.json({
            ok: true,
            message: "Correo enviado",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error interno",
        });
    }
});

// Método para resetear la contraseña
router.put('/reset-password', async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        const tokenDB = await prisma.token_usuario.findUnique({
        where: { token },
        });

        if (!tokenDB) {
            return res.status(400).json({
                ok: false,
                message: "Token inválido",
            });
        }

        if (tokenDB.usado) {
            return res.status(400).json({
                ok: false,
                message: "Token ya usado",
            });
        }

        if (new Date() > tokenDB.expiracion) {
            return res.status(400).json({
                ok: false,
                message: "Token expirado",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.usuario.update({
            where: {
                id_usuario: tokenDB.id_usuario,
            },
            data: {
                password: hashedPassword,
            },
        });

        await prisma.token_usuario.update({
            where: {
                id_token: tokenDB.id_token,
            },
            data: {
                usado: true,
            },
        });

        res.json({
            ok: true,
            message: "Contraseña actualizada",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error interno",
        });
    }
});

// Método para cerrar sesión y eliminar las cookies
router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.json({
        message: "Sesión cerrada correctamente."
    });
});

export default router;