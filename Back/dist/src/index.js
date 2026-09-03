"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
    origin: "http://localhost:5173",
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
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
//# sourceMappingURL=index.js.map