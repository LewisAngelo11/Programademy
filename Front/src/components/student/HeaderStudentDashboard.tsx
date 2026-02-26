import { ArrowOutRightSquareHalf, User } from "@boxicons/react";
import { useNavigate } from "react-router";
import "./HeaderStudentDashboard.css" 

interface UsuarioInfoProp {
    studentName: string;
    studentEmail: string;
}

interface LoadingProp {
    loading: boolean;
}

export default function HeaderStudentDashboard({ studentName, studentEmail, loading }: UsuarioInfoProp & LoadingProp) {
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