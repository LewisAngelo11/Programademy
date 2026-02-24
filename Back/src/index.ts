import express from 'express';
import type { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import login from './routes/auth.routes'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

// Importación de las rutas
app.use('/auth', login);

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});