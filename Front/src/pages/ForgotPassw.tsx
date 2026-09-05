import { useState } from "react";
import { CodeAlt, BookOpen } from "@boxicons/react";
import toast from 'react-hot-toast';
import { AuthService } from "../services/authService";
import SubtleAuthBackground from "../components/ui/SubtleAuthBackground";
import "./ForgotPassw.css";

export default function ForgotPassw() {
    return (
        <SubtleAuthBackground className="forgot-passw-page">
            <header className="recover-passw-header">
                <div className="logo">
                    <div className="bg-logo">
                        <CodeAlt fill="#ffff" />
                    </div>
                    <BookOpen fill="#3e00ff"/>
                </div>
                <h1>PROGRAMADEMY</h1>
                <small>Plataforma de Aprendizaje de Lógica de Programación</small>
            </header>   
            <RecoverPasswForm/>
        </SubtleAuthBackground>
    );
}

function RecoverPasswForm() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await AuthService.forgotPassword(email);
            toast.success(data.message || "Correo enviado");
            setEmail("");
        } catch (error: any) {
            toast.error(
                error.message ||
                "Error enviando correo"
            );
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form action={handleSubmit} className="recover-passw-form">
            <header className="recover-passw-form-header">
                <h2>Recupera tu Contraseña</h2>
                <small>Ingrese su correo para envíar un código de verificación</small>
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
            <button className="send-code-button" disabled={loading}> { !loading ? "Envíar Código" : "Enviando..." }</button>
            <hr />
            <div className="remember-passw">
                <span>Recordé mi contraseña</span>
                <a href="/login">Iniciar Sesión</a>
            </div>
        </form>
    );
}