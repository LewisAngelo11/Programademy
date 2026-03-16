import "./HeaderAdminDashboard.css";
import { useNavigate } from "react-router";
import { ArrowOutRightSquareHalf, User } from "@boxicons/react";

interface UsuarioInfoProp {
    adminName: string;
    adminEmail: string;
}

interface LoadingProp {
    loading: boolean;
}

export default function HeaderAdminDashboard({ adminName, adminEmail, loading }: UsuarioInfoProp & LoadingProp) {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");

        navigate("/");
    };

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
                <div className="buttons-actions">
                    <button
                        onClick={() => navigate("/admin/profile")}
                        className="profile-button">
                        <User size="xs"/>
                        Perfil
                    </button>
                    <button 
                        onClick={logOut}
                        className="log-out-button"
                        >
                        <ArrowOutRightSquareHalf size="xs"/>
                        Salir
                    </button>
                </div>
            </div>
        </header>
    );
}