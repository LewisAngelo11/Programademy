import { Pencil } from "@boxicons/react";
import AnimatedEditModal from "../../components/ui/AnimatedEditModal";
import "./StudentProfile.css";
import "../../components/student/ModalRangos.css";
import { useEffect, useState } from "react";
import EditInfoStudent from "../../components/student/EditInfoStudent";
import HeaderStudentsPages from "../../components/student/HeaderStudentsPages";
import { useNavigate } from "react-router";
import { UserService } from "../../services/userService";
import type { UserRange } from "./StudentDashboard";
import Skeleton from "../../components/ui/Skeleton";

export default function StudentProfile() {
    const navigate = useNavigate();
    const [loadingInfo, setLoadingInfo] = useState<boolean>(true);
    const [loadingRanges, setLoadingRanges] = useState<boolean>(true);
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");
    const [studentRegisterDate, setStudentRegisterDate] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [range, setRange] = useState<UserRange | undefined>(undefined);
    const [allRanges, setAllRanges] = useState<UserRange[]>([]);
    const [totalUserPoints, setTotalUserPoints] = useState<number>(0);

    useEffect(() => {
        const getInfoUser = async () => {
            try {
                setLoadingInfo(true);
                const dataUsuario = await UserService.getInfo();

                const dateFormat = dataUsuario.fecha_registro.split("T")[0];
                setStudentName(dataUsuario.nombre);
                setStudentEmail(dataUsuario.email);
                setStudentRegisterDate(dateFormat);
                setTotalUserPoints(dataUsuario.puntos_totales ?? 0);
            } catch (err: any) {
                console.error("Error al obtener los datos del usuario", err);
                if (err.message?.includes("token") || err.message?.includes("autorizado")) {
                    navigate("/login");
                }
            } finally {
                setLoadingInfo(false);
            }
        };

        const getRangesInfo = async () => {
            try {
                setLoadingRanges(true);
                const [rangeData, allRangesData] = await Promise.all([
                    UserService.getRange(),
                    UserService.getRanges(),
                ]);

                setRange(rangeData);
                setAllRanges(allRangesData);
            } catch (err) {
                console.error("Error al obtener los rangos", err);
            } finally {
                setLoadingRanges(false);
            }
        };

        getInfoUser();
        getRangesInfo();
    }, []);

    // Extraer iniciales del nombre y primer apellido
    const getInitials = (fullName: string): string => {
        const parts = fullName.trim().split(" ");
        if (parts.length === 0 || fullName === "") return "?";

        const firstInitial = parts[0]?.[0]?.toUpperCase() ?? "";

        // El primer apellido suele ser la segunda o tercera palabra, tomamos la segunda
        const secondInitial = parts[2]?.[0]?.toUpperCase() ?? "";
        return firstInitial + secondInitial;
    };

    // Calcular progreso hacia el siguiente rango
    const getProgressToNextRank = () => {
        if (!range || allRanges.length === 0) return { percent: 0, nextRange: null, pointsNeeded: 0 };

        const sortedRanges = [...allRanges].sort((a, b) => a.puntos_requeridos - b.puntos_requeridos);
        const currentIndex = sortedRanges.findIndex(r => r.id_rango === range.id_rango);
        const nextRange = sortedRanges[currentIndex + 1];

        if (!nextRange) {
            // Ya es el rango máximo
            return { percent: 100, nextRange: null, pointsNeeded: 0 };
        }

        const currentRangePoints = range.puntos_requeridos;
        const nextRangePoints = nextRange.puntos_requeridos;
        const pointsInRange = totalUserPoints - currentRangePoints;
        const rangeSpan = nextRangePoints - currentRangePoints;
        const percent = Math.min(Math.max((pointsInRange / rangeSpan) * 100, 0), 100);
        const pointsNeeded = nextRangePoints - totalUserPoints;

        return { percent, nextRange, pointsNeeded };
    };

    // Colores por rango (mapeados desde ModalRangos.css)
    const getRangeColor = (titulo: string): string => {
        const colors: Record<string, string> = {
            Explorer: "#52525B",
            Builder: "#10B981",
            Developer: "#3B82F6",
            Engineer: "#8B5CF6",
            Architect: "#F59E0B",
        };
        return colors[titulo] ?? "#52525B";
    };

    const { percent, nextRange, pointsNeeded } = getProgressToNextRank();
    const initials = getInitials(studentName);
    const rangeColor = range ? getRangeColor(range.titulo) : "#52525B";

    return (
        <main className="student-profile-page">
            <HeaderStudentsPages />

            {/* Sección de info del estudiante con avatar */}
            <section className="info-student-profile">
                <header className="header-info-student">
                    <h1>Perfil de Estudiante</h1>
                    <p>Datos personales del usuario</p>
                </header>

                <div className="info-student-container">
                    {/* Avatar con iniciales */}
                    <div className="avatar-section">
                        {loadingInfo ? (
                            <Skeleton width="4rem" height="4rem" borderRadius="50%" />
                        ) : (
                            <div className="student-avatar fade-in-skeleton">
                                <span className="avatar-initials">
                                    {initials}
                                </span>
                            </div>
                        )}
                        <div className="avatar-info">
                            <div className="container">
                                {loadingInfo ? (
                                    <Skeleton width="160px" height="22px" />
                                ) : (
                                    <>
                                        <h2 className="name-student fade-in-skeleton">{studentName}</h2>
                                        <AnimatedEditModal
                                            isOpen={openModal}
                                            onOpen={() => setOpenModal(true)}
                                            onClose={() => setOpenModal(false)}
                                            layoutId="edit-trigger-student"
                                            title="Editar Perfil"
                                            trigger={<Pencil size="xs" />}
                                        >
                                            <EditInfoStudent
                                                studentName={studentName}
                                                setStudentName={setStudentName}
                                                studentEmail={studentEmail}
                                                setStudentEmail={setStudentEmail}
                                                setOpenModal={setOpenModal}
                                            />
                                        </AnimatedEditModal>
                                    </>
                                )}
                            </div>
                            {loadingInfo ? (
                                <Skeleton width="180px" height="14px" />
                            ) : (
                                <span className="email-label fade-in-skeleton">{studentEmail}</span>
                            )}
                        </div>
                    </div>

                    {/* Datos del perfil */}
                    <div className="profile-data-row">
                        <dl className="email-student">
                            <dt>Correo Electrónico</dt>
                            <dd className="fade-in-skeleton">{loadingInfo ? <Skeleton width="180px" height="18px" /> : studentEmail}</dd>
                        </dl>
                        <dl className="register-date-student">
                            <dt>Fecha de Registro</dt>
                            <dd className="fade-in-skeleton">{loadingInfo ? <Skeleton width="120px" height="18px" /> : studentRegisterDate}</dd>
                        </dl>
                    </div>
                </div>
            </section>

            {/* Sección de rango actual */}
            <section className="rank-section">
                <header className="header-info-student">
                    <h2 className="rank-section-title">Rango Actual</h2>
                    <p>Tu progreso como estudiante</p>
                </header>

                <div className="rank-card">
                    {loadingRanges || !range ? (
                        <>
                            <div className="rank-badge-row">
                                <Skeleton width="100px" height="32px" borderRadius="20px" />
                                <Skeleton width="130px" height="18px" />
                            </div>

                            <div className="rank-progress-wrapper">
                                <div className="rank-progress-labels">
                                    <Skeleton width="80px" height="14px" />
                                    <Skeleton width="90px" height="14px" />
                                </div>
                                <Skeleton width="100%" height="10px" borderRadius="999px" />
                                <div className="rank-progress-info">
                                    <Skeleton width="220px" height="14px" />
                                    <Skeleton width="35px" height="14px" />
                                </div>
                            </div>

                            <div className="rank-points-detail">
                                <Skeleton width="240px" height="14px" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="rank-badge-row fade-in-skeleton">
                                <div className={`range-student ${range.titulo}`}>
                                    {range.titulo}
                                </div>
                                <span className="total-points-label">
                                    <strong>{totalUserPoints}</strong> pts totales
                                </span>
                            </div>

                            {/* Barra de progreso */}
                            <div className="rank-progress-wrapper">
                                <div className="rank-progress-labels fade-in-skeleton">
                                    <span className="rank-progress-current" style={{ color: rangeColor }}>
                                        {range.titulo}
                                    </span>
                                    <span className="rank-progress-next">
                                        {nextRange ? nextRange.titulo : "Rango Máximo"}
                                    </span>
                                </div>
                                <div className="rank-progress-bar-bg">
                                    <div
                                        className="rank-progress-bar-fill fade-in-skeleton"
                                        style={{
                                            width: `${percent}%`,
                                            background: nextRange
                                                ? `linear-gradient(90deg, ${rangeColor}, ${getRangeColor(nextRange.titulo)})`
                                                : `linear-gradient(90deg, ${rangeColor}, #ffde8cff)`,
                                        }}
                                    />
                                </div>
                                <div className="rank-progress-info fade-in-skeleton">
                                    {nextRange ? (
                                        <small>
                                            Te faltan <strong>{Math.max(pointsNeeded, 0)} pts</strong> para alcanzar <span style={{ color: getRangeColor(nextRange.titulo) }}>{nextRange.titulo}</span>
                                        </small>
                                    ) : (
                                        <small>¡Felicidades! Alcanzaste el rango más alto</small>
                                    )}
                                    <small className="rank-progress-percent">{Math.round(percent)}%</small>
                                </div>
                            </div>

                            {/* Puntos requeridos del rango actual */}
                            <div className="rank-points-detail fade-in-skeleton">
                                <small className={`color-info-range ${range.titulo}`}>
                                    Puntos mínimos para este rango: <strong>{range.puntos_requeridos}</strong>
                                </small>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}