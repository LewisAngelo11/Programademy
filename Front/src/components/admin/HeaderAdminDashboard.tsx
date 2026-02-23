import "./HeaderAdminDashboard.css";
import { useNavigate } from "react-router";
import { ArrowOutRightSquareHalf } from "@boxicons/react";

export default function HeaderAdminDashboard() {
    const navigate = useNavigate();

    return(
        <header className="header-admin">
            <div className="header-title">
                <h2>Programademy Admin</h2>
                <small>Panel de Administradror</small>
            </div>
            <div className="data-admin">
                <div className="info-admin">
                    <span>Nombre del Admin</span>
                    <small>Correo del admin</small>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="log-out-button"
                    >
                    <ArrowOutRightSquareHalf />
                    Salir
                </button>
            </div>
        </header>
    );
}