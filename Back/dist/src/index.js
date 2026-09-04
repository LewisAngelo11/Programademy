"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Importar las rutas
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const modules_routes_1 = __importDefault(require("./routes/modules.routes"));
const quizzes_routes_1 = __importDefault(require("./routes/quizzes.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // Para las cookies
// Implementación de las rutas en la app
app.use('/auth', auth_routes_1.default);
app.use('/usuario', user_routes_1.default);
app.use('/curso', courses_routes_1.default);
app.use('/modulo', modules_routes_1.default);
app.use('/quiz', quizzes_routes_1.default);
// --- Servir el frontend (SPA) en producción ---
// En local el front corre en Vite (puerto 5173), así que no interferimos.
const frontDistDir = path_1.default.resolve(__dirname, '../../../Front/dist');
if (fs_1.default.existsSync(frontDistDir)) {
    // Servir metadatos de salud de la API antes del estático
    app.get('/api/health', (req, res) => {
        res.json({ ok: true });
    });
    // Servir archivos estáticos del front
    app.use(express_1.default.static(frontDistDir));
    // Fallback SPA: cualquier ruta no controlada devuelve el index.html
    app.use((req, res, next) => {
        if (req.method !== 'GET')
            return next();
        const indexFile = path_1.default.join(frontDistDir, 'index.html');
        if (fs_1.default.existsSync(indexFile)) {
            res.sendFile(indexFile);
        }
        else {
            next();
        }
    });
}
// Metadato raíz (solo local/sin front dist)
app.get('/', (req, res) => {
    res.send('Hello World from Programademy');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
//# sourceMappingURL=index.js.map