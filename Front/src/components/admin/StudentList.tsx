import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import "./StudentList.css";
import { QuizService } from "../../services/quizService";
import Skeleton from "../ui/Skeleton";

export interface Rango {
    id_rango: number;
    titulo: string;
    puntos_requeridos: number;
    icono: string | null;
}

interface TotalQuizzesAttempts {
    id_intento: number;
    id_quiz: number;
    id_usuario: number;
    calificacion: number;
    puntos_otorgados: number
    completado_100: boolean;
}

export interface Students {
    id_usuario: number;
    nombre: string;
    email: string;
    puntos_totales: number;
    totalQuizzesAttempts: TotalQuizzesAttempts[];
    rango: Rango | null;
}


export default function StudentList() {
    const [students, setStudents] = useState<Students[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getStudentsRange = async () => {
        try {
            setLoading(true);
            const data = await UserService.getAllRanges();

            setStudents(
                data.map((student: Students) => ({
                    ...student,
                    totalQuizzesAttempts: []
                }))
            );
        } catch (err: any) {
            console.error("Error en la petición:", err.message);
        } finally {
            setLoading(false);
        }
    }

    const getAllStudentsAttemptsQuizzes = async () => {
        try {
            const data = await QuizService.getAllStudentsAttemptsQuizzes();

            setStudents(prev =>
                prev.map(student => {
                    const attemptsData = data.find(
                        (d: any) => d.id_usuario === student.id_usuario
                    );

                    return attemptsData
                        ? {
                            ...student,
                            totalQuizzesAttempts: attemptsData.totalQuizzesAttempts
                        } : student;
                })
            );

        } catch (err: any) {
            console.error("Error en la petición:", err.error);
        }
    }

    useEffect(() => {
        getStudentsRange();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            getAllStudentsAttemptsQuizzes();
        }
    }, [students.length]);

    // Calcular el promedio general de cada estudiante
    const studentsFinals = students.map(student => {
        const quizzes = student.totalQuizzesAttempts;
        const quizzesComplete = quizzes.filter(q => q.completado_100);

        const average = quizzes.length > 0
            ? Number((quizzes.reduce((acc, q) => acc + q.calificacion, 0) / quizzes.length).toFixed(2)) : 0

        return {
            ...student,
            average,
            quizzesComplete
        }
    });

    return (
        <section className="student-list-section">
            <h2>Resumen de Estudiantes</h2>

            <div className="student-list-table">
                <table>
                    <thead>
                        <tr>    
                            <th>ESTUDIANTE</th>
                            <th>RANGO</th>
                            <th>PROMEDIO GENERAL</th>
                            <th>QUIZZES COMPLETADOS</th>
                            <th>INTENTOS TOTALES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <StudentRowSkeleton key={index} />
                            ))
                        ) : studentsFinals.length === 0 ? (
                            <tr>
                                <td className="fade-in-skeleton" colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                                    No hay estudiantes registrados.
                                </td>
                            </tr>
                        ) : (
                            studentsFinals.map((s) => {
                            const average = Number(s.average) || 0;
                            let averageClass = "average-red";

                            if (average >= 80) {
                                averageClass = "average-green";
                            } else if (average >= 70) {
                                averageClass = "average-yellow";
                            } else if (average >= 60) {
                                averageClass = "average-orange";
                            }

                            const initials = s.nombre
                                ?.split(" ")
                                .map(n => n[0])
                                .slice(0, 2)
                                .join("");

                            return (
                                <tr className="fade-in-skeleton" key={s.id_usuario}>
                                    <td>
                                        <div className="student-info">
                                            <div className="student-avatar">
                                                {initials}
                                            </div>
                                            <div>
                                                <div className="student-name">
                                                    {s.nombre}
                                                </div>
                                                <div className="student-email">
                                                    {s.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {s.rango?.titulo ? (
                                            <div className={`range-student ${s.rango.titulo}`}>
                                                {s.rango.titulo}
                                            </div>
                                        ) : (
                                            <span className="no-data">
                                                Sin rango
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {average > 0 && (
                                            <div className={`average-wrapper ${averageClass}`}>
                                                <div className="average-text">
                                                    {average}%
                                                </div>
                                                <div className="progress-average-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{ width: `${average}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {!average && average === 0 && (
                                            <span className="no-data">
                                                Sin Datos
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {s.quizzesComplete && (
                                            <div className="quiz-count">
                                                {s.quizzesComplete.length} quizzes
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {s.totalQuizzesAttempts && (
                                            <div className="attempt-count">
                                                {s.totalQuizzesAttempts.length} intentos
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function StudentRowSkeleton() {
    return (
        <tr>
            <td>
                <div className="student-info">
                    <Skeleton width="3rem" height="3rem" borderRadius="50%" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <Skeleton width="130px" height="18px" />
                        <Skeleton width="170px" height="14px" />
                    </div>
                </div>
            </td>
            <td>
                <Skeleton width="90px" height="28px" borderRadius="999px" />
            </td>
            <td>
                <div className="average-wrapper" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <Skeleton width="45px" height="16px" />
                    <Skeleton width="100%" height="6px" borderRadius="999px" />
                </div>
            </td>
            <td>
                <Skeleton width="75px" height="16px" />
            </td>
            <td>
                <Skeleton width="75px" height="16px" />
            </td>
        </tr>
    );
}