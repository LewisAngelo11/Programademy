"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Método que devuelve los datos del usuario
router.get('/info', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    const idUsuario = req.usuario.id;
    const usuario = await prisma_1.prisma.usuario.findUnique({
        where: {
            id_usuario: idUsuario,
        },
    });
    if (!usuario) {
        return res.status(401).json({ message: "Usuario no encontrado." });
    }
    // Crea una copia del usuario pero sin la contraseña, para devolverlo al cliente
    const { password, ...usuarioWithoutPassw } = usuario;
    res.json(usuarioWithoutPassw);
});
// Método que actualiza nombre y email del usuario autenticado
router.put('/update', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    const idUsuario = req.usuario.id;
    const { nombre, email } = req.body;
    try {
        const usuarioActualizado = await prisma_1.prisma.usuario.update({
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
    }
    catch (error) {
        // Si el email ya existe por que el email es unique
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "El email ya está en uso." });
        }
        return res.status(500).json({ message: "Error al actualizar el usuario." });
    }
});
// Método para obtener el rango actual del usuario
router.get('/getRange', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    try {
        const idUsuario = req.usuario.id;
        const usuario = await prisma_1.prisma.usuario.findUnique({
            where: {
                id_usuario: Number(idUsuario)
            }
        });
        // Obtiene los rangos y con lte (less than or equal) busca a que rango pertenece el usuario
        const currentRange = await prisma_1.prisma.rango.findFirst({
            where: {
                puntos_requeridos: {
                    lte: usuario?.puntos_totales ?? 0
                }
            },
            orderBy: {
                puntos_requeridos: 'desc'
            }
        });
        res.status(200).json(currentRange);
    }
    catch (err) {
        console.error("Error al obtener el rango del usuario:", err);
        res.status(500).json({ message: "Error interno en el servidor al obtener el rango" });
    }
});
// Método para obtener los rangos de todos los estudiantes
router.get('/getAllRanges', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    try {
        const estudiantes = await prisma_1.prisma.usuario.findMany({
            where: {
                rol: "student"
            },
            select: {
                id_usuario: true,
                nombre: true,
                email: true,
                puntos_totales: true,
            }
        });
        // Obtiene los rangos y con lte (less than or equal) busca a que rango pertenece a cada usuario
        const studentsWithRanges = await Promise.all(estudiantes.map(async (student) => {
            const rango = await prisma_1.prisma.rango.findFirst({
                where: {
                    puntos_requeridos: {
                        lte: student.puntos_totales ?? 0
                    }
                },
                orderBy: {
                    puntos_requeridos: 'desc'
                }
            });
            return {
                ...student,
                rango
            };
        }));
        res.status(200).json(studentsWithRanges);
    }
    catch (err) {
        console.error("Error al obtener el rango del estudiante:", err);
        res.status(500).json({ message: "Error interno en el servidor al obtener el rango" });
    }
});
// Método para obtener todos los rangos
router.get('/getRanges', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    try {
        const rangos = await prisma_1.prisma.rango.findMany({
            orderBy: {
                id_rango: 'asc'
            }
        });
        res.status(200).json(rangos);
    }
    catch (err) {
        console.error("Error al obtener los rangos:", err);
        res.status(500).json({ message: "Error interno en el servidor al obtener los rangos" });
    }
});
// Obtener a todos los estudiantes y sus estadísticas
router.get('/getAll', auth_middleware_1.verifyTokenJWT, async (req, res) => {
    try {
        const allStudents = await prisma_1.prisma.usuario.findMany({
            where: {
                rol: "student"
            },
            select: {
                id_usuario: true,
                nombre: true,
                email: true,
                rol: true,
                puntos_totales: true
            }
        });
        if (!allStudents) {
            res.status(400).json({ message: "No hay estudiantes inscritos" });
        }
        res.status(200).json(allStudents);
    }
    catch (err) {
        console.error("Error al obtener a los estudiantes:", err);
        res.status(500).json({ message: "Error interno en el servidor al obtener a los estudiantes" });
    }
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map