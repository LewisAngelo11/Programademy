import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 
import bcrypt, { compare } from "bcryptjs"
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

        // Compara la contraseña ingresada con la hasheada en la BD
        const compareHashPassword = await bcrypt.compare(passw, usuario?.password);

        if (!compareHashPassword) {
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

export default router;