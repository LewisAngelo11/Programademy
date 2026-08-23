import "./HeaderAdminDashboard.css";
import { useNavigate } from "react-router";
import { ArrowOutRightSquareHalf, User } from "@boxicons/react";
import Skeleton from "../ui/Skeleton";

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
                    {loading ? (
                        <>
                            <Skeleton width="110px" height="18px" />
                            <Skeleton width="160px" height="13px" />
                        </>
                    ) : (
                        <div className="info-admin fade-in-skeleton">
                            <span>{adminName}</span>
                            <small>{adminEmail}</small>
                        </div>
                    )}
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