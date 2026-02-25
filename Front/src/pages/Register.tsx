import { CodeAlt, BookOpen } from "@boxicons/react";
import { useState } from "react";
import "./Register.css";

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
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return(
        <form action="" className="register-form">
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
                    type="text"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
            </div>
            <div className="passw-container">
                <label htmlFor="passw">Contraseña *</label>
                <input
                    type="text"
                    id="passw"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
            </div>
            <button className="register-button">Registrarse</button>
            <hr />
            <div className="log-in">
                <span>¿Ya está registrado?</span>
                <a href="/">Iniciar Sesión</a>
            </div>
        </form>
    );
}