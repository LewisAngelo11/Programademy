import { useState } from "react";
import { useNavigate } from "react-router";
import { CodeAlt, BookOpen } from "@boxicons/react";
import "./Login.css"

export default function Login() {
    return (
        <main className="login-page">
            <header className="login-header">
                <div className="logo">
                    <div className="bg-logo">
                        <CodeAlt fill="#ffff" />
                    </div>
                    <BookOpen fill="#3e00ff"/>
                </div>
                <h1>PROGRAMADEMY</h1>
                <small>Plataforma de Aprendizaje de Lógica de Programación</small>
            </header>   
            <LoginForm/>
        </main>
    );
}

function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const signIn = () => {
        if (email.trim() === "student@prueba.com" && password.trim() === "12345678") {
            alert("Bienvenido estudiante");
            navigate("/student/dashboard");
            return;
        }

        if (email.trim() === "admin@prueba.com" && password.trim() === "123456789") {
            alert("Bienvenido administrador");
            navigate("/admin/dashboard");
            return;
        }

        alert("Credenciales incorrectas");

    }
    return (
        <form onSubmit={signIn} className="login-form">
            <header className="login-form-header">
                <h2>Iniciar Sesión</h2>
                <small>Ingrese sus credenciales para comenzar</small>
            </header>
            <div className="email-container">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
            </div>
            <div className="passw-container">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                <a href="#" className="forgot-passw">¿Olvidó su Contraseña?</a>
            </div>
            <button className="login-button">Iniciar Sesión</button>
            <hr />

        </form>
    );
}