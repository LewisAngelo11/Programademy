"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyTokenJWT = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({
            message: "No se incluyó un token en la petición"
        });
    }
    try {
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "Secret-Object");
        req.usuario = decodeToken;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
};
exports.verifyTokenJWT = verifyTokenJWT;
//# sourceMappingURL=auth.middleware.js.map