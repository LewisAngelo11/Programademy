import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const distDir = path.join(__dirname, 'dist');

app.use(express.static(distDir));

app.use((req, res) => {
  const indexFile = path.join(distDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(404).send('No se encontró el build. Ejecuta npm run build primero.');
  }
});

app.listen(PORT, () => {
  console.log(`Frontend servido en el puerto: ${PORT}`);
});