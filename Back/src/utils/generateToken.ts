import crypto from "crypto";

// Generar el token para los correos
export const generateSecureToken = () => {
    return crypto.randomBytes(32).toString("hex");
};