import { ArrowOutRightSquareHalf, User } from "@boxicons/react";
import { useNavigate } from "react-router";
import "./HeaderStudentDashboard.css";
import type { SetStateAction } from "react";
import Skeleton from "../ui/Skeleton";

interface UserRange {
    id_rango: number;
    titulo: string;
    puntos_requeridos: number;
    icono: string;
}

interface UsuarioInfoProp {
    studentName: string;
    studentEmail: string;
    range?: UserRange;
}

interface LoadingProp {
    loading: boolean;
}

interface SetPressRangeProp {
    setPressRange: React.Dispatch<SetStateAction<boolean>>;
}

export default function HeaderStudentDashboard({ studentName, studentEmail, range, loading, setPressRange }: UsuarioInfoProp & LoadingProp & SetPressRangeProp) {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <header className="header-student">
            <div className="header-title">
                <h2>Programademy</h2>
                <small>Panel de Estudiante</small>
            </div>
            <div className="data-student">
                {loading ? (
                    <Skeleton width="80px" height="28px" borderRadius="20px" />
                ) : (
                    <div className="range-wrapper">
                        <div
                            onClick={() => setPressRange(true)}
                            className={`range-student ${range?.titulo}`}
                        >
                            {range ? range.titulo : "Sin rango"}
                        </div>
                        <span className="range-tooltip">
                            Rango: {range && range.titulo}
                        </span>
                    </div>
                )}
                <div>
                    {loading ? (
                        <div className="info-student">
                            <Skeleton width="110px" height="18px" />
                            <Skeleton width="160px" height="13px" />
                        </div>
                    ) : (
                        <div className="info-student fade-in-skeleton">
                            <span>{studentName}</span>
                            <small>{studentEmail}</small>
                        </div>
                    )}
                </div>
                <div className="buttons-actions">
                    <button
                        onClick={() => navigate("/student/profile")}
                        className="profile-button">
                        <User size="xs" />
                        Perfil
                    </button>
                    <button
                        onClick={logOut}
                        className="log-out-button"
                    >
                        <ArrowOutRightSquareHalf size="xs" />
                        Salir
                    </button>
                </div>
            </div>
        </header>
    );
}