import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import "./StudentList.css";
import { QuizService } from "../../services/quizService";

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
    const [loading, setLoading] = useState<boolean>(false);

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
            setLoading(false)
        }
    }

    const getAllStudentsAttemptsQuizzes = async () => {
        try{
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStudentsRange();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            getAllStudentsAttemptsQuizzes();
        }
    },[students.length]);

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

    if (loading) {
        return (
            <section className="student-list-section">
                <h2>Resumen de Estudiantes</h2>
                <p>Cargando estudiantes...</p>
            </section>
        );
    }

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
                        {studentsFinals.map((s) => {
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
                                <tr key={s.id_usuario}>
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
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}