import express from 'express';
import path from 'path';
import fs from 'fs';
import type { Request, Response } from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";

// Importar las rutas
import auth from './routes/auth.routes'
import usuario from './routes/user.routes'
import curso from './routes/courses.routes';
import modulo from './routes/modules.routes';
import quiz from './routes/quizzes.routes';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Para las cookies

// Implementación de las rutas en la app
app.use('/auth', auth);
app.use('/usuario', usuario);
app.use('/curso', curso);
app.use('/modulo', modulo);
app.use('/quiz', quiz);

// --- Servir el frontend (SPA) en producción ---
// En local el front corre en Vite (puerto 5173), así que no interferimos.
const frontDistDir = path.resolve(__dirname, '../../../Front/dist');

if (fs.existsSync(frontDistDir)) {
    // Servir metadatos de salud de la API antes del estático
    app.get('/api/health', (req: Request, res: Response) => {
        res.json({ ok: true });
    });

    // Servir archivos estáticos del front
    app.use(express.static(frontDistDir));

    // Fallback SPA: cualquier ruta no controlada devuelve el index.html
    app.use((req: Request, res: Response, next: Function) => {
        if (req.method !== 'GET') return next();
        const indexFile = path.join(frontDistDir, 'index.html');
        if (fs.existsSync(indexFile)) {
            res.sendFile(indexFile);
        } else {
            next();
        }
    });
}

// Metadato raíz (solo local/sin front dist)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from Programademy');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});