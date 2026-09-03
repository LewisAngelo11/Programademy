import { ArrowOutRightSquareHalf, User } from "@boxicons/react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { motion } from "motion/react";
import RangesDropdown from "./RangesDropdown";
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
    pressRange: boolean;
    setPressRange: React.Dispatch<SetStateAction<boolean>>;
    allRanges: UserRange[];
    totalUserPoints: number;
}

export default function HeaderStudentDashboard({ studentName, studentEmail, range, loading, pressRange, setPressRange, allRanges, totalUserPoints }: UsuarioInfoProp & LoadingProp & SetPressRangeProp) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const logOut = async () => {
        await logout();
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
                        <motion.div
                            layoutId="range-trigger"
                            onClick={() => setPressRange(true)}
                            className={`range-student ${range?.titulo}`}
                        >
                            {range ? range.titulo : "Sin rango"}
                        </motion.div>
                        <RangesDropdown
                            isOpen={pressRange}
                            onClose={() => setPressRange(false)}
                            range={range}
                            allRanges={allRanges}
                            totalUserPoints={totalUserPoints}
                        />
                        <span className={`range-tooltip ${pressRange ? "hidden" : ""}`}>
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