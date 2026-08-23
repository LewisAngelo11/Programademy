"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../lib/prisma");
const generateToken_1 = require("../utils/generateToken");
const email_service_1 = require("../services/email.service");
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const { email, passw } = req.body;
        const secret = process.env.JWT_SECRET || 'Secret-Object';
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: {
                email: email,
            },
        });
        if (!usuario) {
            return res.status(404).json({ message: "El correo ingresado no está registrado." });
        }
        // Compara la contraseña ingresada con la hasheada en la BD
        const compareHashPassword = await bcryptjs_1.default.compare(passw, usuario?.password);
        if (!compareHashPassword) {
            return res.status(401).json({ message: "La contraseña es incorrecta." });
        }
        // Se crea el token JWT
        const token = jsonwebtoken_1.default.sign({ id: usuario?.id_usuario }, secret, { expiresIn: '1h' });
        // Crea una copia del objeto usuario pero sin la contraseña para devolverla al cliente
        const { password, ...userWithoutPassw } = usuario;
        res.json({
            message: "¡¡Bienvenido!!",
            token,
            user: userWithoutPassw,
        });
    }
    catch (err) {
        console.log("Error en el login: ", err);
    }
});
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const alreadyExist = await prisma_1.prisma.usuario.findUnique({
            where: {
                email: email,
            }
        });
        if (alreadyExist) {
            return res.status(401).json({ message: "El correo ingresado ya está registrado." });
        }
        // Hashea la contraseña del usuario antes de guardarla en la BD
        const saltRounds = 10;
        const passwordHashed = await bcryptjs_1.default.hash(password, saltRounds);
        // Crea el nuevo usuario
        const newUsuario = await prisma_1.prisma.usuario.create({
            data: {
                nombre: nombre,
                email: email,
                password: passwordHashed
            }
        });
        res.json(newUsuario);
    }
    catch (err) {
        console.error("Error en el registro: ", err);
    }
});
// Método que 
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: { email },
        });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                message: "Usuario no encontrado",
            });
        }
        const token = (0, generateToken_1.generateSecureToken)();
        // Expiración del token en 15 minutos
        const expiracion = new Date(Date.now() + 1000 * 60 * 15);
        await prisma_1.prisma.token_usuario.create({
            data: {
                token,
                tipo: "RESET_PASSWORD",
                expiracion,
                id_usuario: usuario.id_usuario,
            },
        });
        // Envía el link para restablecer la contraseña al front
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await (0, email_service_1.sendEmail)({
            to: usuario.email,
            subject: "Restablecer contraseña - Programademy",
            resetLink,
        });
        res.json({
            ok: true,
            message: "Correo enviado",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error interno",
        });
    }
});
// Método para resetear la contraseña
router.put('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;
        const tokenDB = await prisma_1.prisma.token_usuario.findUnique({
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
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await prisma_1.prisma.usuario.update({
            where: {
                id_usuario: tokenDB.id_usuario,
            },
            data: {
                password: hashedPassword,
            },
        });
        await prisma_1.prisma.token_usuario.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Error interno",
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map