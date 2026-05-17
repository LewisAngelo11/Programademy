import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./ResetPassword.css";

export default function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

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

            const response = await fetch(
                `${API_URL}/auth/reset-password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success("Contraseña actualizada");
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Error al actualizar contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="reset-passw-page">
            <form className="reset-passw-form" action={handleSubmit}>
                <h2>Restablecer contraseña</h2>
                <p>Ingresa tu nueva contraseña</p>
                <div className="input-group">
                    <label>Nueva contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
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
        </main>
    );
}