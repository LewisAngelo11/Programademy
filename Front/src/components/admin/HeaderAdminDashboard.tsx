import "./HeaderAdminDashboard.css";
import { useNavigate } from "react-router";
import { ArrowOutRightSquareHalf } from "@boxicons/react";

interface UsuarioInfoProp {
    adminName: string;
    adminEmail: string;
}

interface LoadingProp {
    loading: boolean;
}

export default function HeaderAdminDashboard({ adminName, adminEmail, loading }: UsuarioInfoProp & LoadingProp) {
    const navigate = useNavigate();

    return(
        <header className="header-admin">
            <div className="header-title">
                <h2>Programademy Admin</h2>
                <small>Panel de Administrador</small>
            </div>
            <div className="data-admin">
                <div className="info-admin">
                    <span>{!loading && adminName}</span>
                    <small>{!loading && adminEmail}</small>
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