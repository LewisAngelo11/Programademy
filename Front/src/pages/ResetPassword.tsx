import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthService } from "../services/authService";
import SubtleAuthBackground from "../components/ui/SubtleAuthBackground";
import PasswordInput from "../components/ui/PasswordInput";
import "./ResetPassword.css";

export default function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!token) {
            toast.error("Token inválido");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);

            await AuthService.resetPassword({
                token,
                password,
            });

            toast.success("Contraseña actualizada");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Error al actualizar contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubtleAuthBackground className="reset-passw-page">
            <form className="reset-passw-form" action={handleSubmit}>
                <h2>Restablecer contraseña</h2>
                <p>Ingresa tu nueva contraseña</p>
                <div className="input-group">
                    <label>Nueva contraseña</label>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <div className="input-group">
                    <label>Confirmar contraseña</label>
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-reset"
                >
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
                </button>
            </form>
        </SubtleAuthBackground>
    );
}