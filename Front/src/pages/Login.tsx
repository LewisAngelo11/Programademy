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
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const API_URL = "http://localhost:3000/auth/login";

    const signIn = async () => {
        const bodyLogin = {
            email: email,
            passw: password
        };

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyLogin)
            });

            if (!response.ok) {
                throw new Error("Error al iniciar sesión");
            }

            const dataUser = await response.json();
            localStorage.setItem("token", dataUser.token); // Guarda el token en local storage
            // Simula la protección de rutas de admin y student
            if (dataUser.user.rol === "admin") {
                navigate("admin/dashboard");
            }

            console.log("Rol del usuario: ", dataUser.user.rol);
        } catch (err) {
            console.error("Error en la petición: ", err);
        } finally {
            setLoading(false);
        }
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
            <button className="login-button" disabled={loading}> { !loading ? "Iniciar Sesión" : "Validando..." }</button>
            <hr />
        </form>
    );
}