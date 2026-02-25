import { CodeAlt, BookOpen } from "@boxicons/react";
import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";

export default function Register() {
    return (
        <main className="register-page">
            <header className="register-header">
                <div className="logo">
                    <div className="bg-logo">
                        <CodeAlt fill="#ffff" />
                    </div>
                    <BookOpen fill="#3e00ff"/>
                </div>
                <h1>PROGRAMADEMY</h1>
                <small>Plataforma de Aprendizaje de Lógica de Programación</small>
            </header>
            <RegisterForm/>
        </main>
    );
}

function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const API_URL = "http://localhost:3000/auth/register";

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la pagina se refresque
        const bodyRegister = {
            nombre: name,
            email: email,
            password: password
        };

        try {
            setLoading(true);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(bodyRegister)
            });

            if (!response.ok) {
                console.error("Error en el registro: ", response);
                return;
            }

            navigate("/");
        } catch (err) {
            console.error("Error en la petición: ", err);
        } finally {
            setLoading(false);
        }
    }

    return(
        <form onSubmit={signUp} className="register-form">
            <header className="register-form-header">
                <h2>Crear Cuenta</h2>
                <small>Ingrese sus datos para continuar el registro</small>
            </header>
            <div className="name-container">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required/>
            </div>
            <div className="email-container">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
            </div>
            <div className="passw-container">
                <label htmlFor="passw">Contraseña *</label>
                <input
                    type="password"
                    id="passw"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
            </div>
            <button className="register-button" disabled={loading}>{!loading ? "Registrarse" : "En Proceso..."}</button>
            <hr />
            <div className="log-in">
                <span>¿Ya está registrado?</span>
                <a href="/">Iniciar Sesión</a>
            </div>
        </form>
    );
}