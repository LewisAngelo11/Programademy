import { useState } from "react";
import { useNavigate } from "react-router";
import { CodeAlt, BookOpen } from "@boxicons/react";
import { AuthService } from "../services/authService";
import toast from 'react-hot-toast';
import "./Login.css"

export default function Login() {
    return (
        <main className="login-page">
            <header className="login-header">
                <div className="logo">
                    <div className="bg-logo">
                        <CodeAlt fill="#ffff" />
                    </div>
                    <BookOpen fill="#3e00ff" />
                </div>
                <h1>PROGRAMADEMY</h1>
                <small>Plataforma de Aprendizaje de Lógica de Programación</small>
            </header>
            <LoginForm />
        </main>
    );
}

function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await AuthService.signIn({ email: email, passw: password });

            localStorage.setItem("token", data.token); // Guarda el token en local storage
            localStorage.setItem("rol", data.user.rol);

            // Simula la protección de rutas de admin y student
            if (data.user.rol === "admin") {
                toast.success(`Bienvenido Administrador ${data.user.nombre}`);
                navigate('/admin/dashboard');
            } else {
                toast.success(`Bienvenido Estudiante ${data.user.nombre}`);
                navigate('/student/dashboard');
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form action={signIn} className="login-form">
            <header className="login-form-header">
                <h2>Iniciar Sesión</h2>
                <small>Ingrese sus credenciales para comenzar</small>
            </header>
            {error && (
                <div className="login-error" role="alert">
                    <span className="login-error-icon">⚠</span>
                    <span>{error}</span>
                </div>
            )}
            <div className="email-container">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    required />
            </div>
            <div className="passw-container">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    required />
                <a href="/forgotPassw" className="forgot-passw">¿Olvidó su Contraseña?</a>
            </div>
            <button className="login-button" disabled={loading}>{!loading ? "Iniciar Sesión" : "Validando..."}</button>
            <hr />
            <div className="create-account">
                <span>¿No tiene cuenta?</span>
                <a href="/register">Crear Cuenta</a>
            </div>
        </form>
    );
}