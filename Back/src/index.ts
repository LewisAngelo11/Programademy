import express from 'express';
import type { Request, Response } from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';

// Importar las rutas
import auth from './routes/auth.routes'
import usuario from './routes/user.routes'
import curso from './routes/courses.routes';
import modulo from './routes/modules.routes';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 

// Implementación de las rutas en la app
app.use('/auth', auth);
app.use('/usuario', usuario);
app.use('/curso', curso);
app.use('/modulo', modulo);

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});