import { ArrowOutRightSquareHalf, User } from "@boxicons/react";
import { useNavigate } from "react-router";
import "./HeaderStudentDashboard.css" 

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

export default function HeaderStudentDashboard({ studentName, studentEmail, range, loading }: UsuarioInfoProp & LoadingProp) {
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
                <div className="range-wrapper">
                    <div className={`range-student ${range?.titulo}`}>
                        {range ? range.titulo : "Sin rango"}
                    </div>
                    <span className="range-tooltip">
                        Rango: {range && range.titulo}
                    </span>
                </div>
                <div className="info-student">
                    <span>{!loading && studentName}</span>
                    <small>{!loading && studentEmail}</small>
                </div>
                <div className="buttons-actions">
                    <button
                        onClick={() => navigate("/student/profile")}
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