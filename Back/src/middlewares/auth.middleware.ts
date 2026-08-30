import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const verifyTokenJWT = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(403).json({
            message: "No se incluyó un token en la petición"
        });
    }

    try {
        const decodeToken = jwt.verify(
            token,
            process.env.JWT_SECRET || "Secret-Object"
        );
        req.usuario = decodeToken;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
}