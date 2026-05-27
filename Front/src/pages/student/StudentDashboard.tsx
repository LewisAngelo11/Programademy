import { useEffect, useState } from "react";
import HeaderStudentDashboard from "../../components/student/HeaderStudentDashboard";
import "./StudentDashboard.css";
import ResumeHome from "../../components/student/ResumeHome";
import CoursesList from "../../components/student/CoursesList";
import CoursesStartedList from "../../components/student/CoursesStartedList";
import Modal from "../../Modals/Modal";
import ModalRangos from "../../components/student/ModalRangos";

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
    imagen_url: string;
}

interface AttemptQuiz {
    id_intento: number;
    id_usuario: number;
    id_quiz: number;
    calificacion: number;
    puntos_otorgados: number;
    completado_100: boolean;
}

export interface UserRange {
    id_rango: number;
    titulo: string;
    puntos_requeridos: number;
    icono: string;
}

export default function StudentDashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [coursesStarted, setCoursesStarted] = useState<Course[]>([]);
    const [error, setError] = useState<string>("")
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");
    const [totalUserPoints, setTotalUserPoints] = useState<number>(0);
    const [attempts, setAttempts] = useState<AttemptQuiz[]>([]);
    const [range, setRange] = useState<UserRange>();
    const [allRanges, setAllRanges] = useState<UserRange[]>([]);
    const [pressRange, setPressRange] = useState<boolean>(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const getAllCourses = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/curso/all`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los cursos");
            }

            const data = await response.json();
            setAllCourses(data);
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Hubo un error al obtener los cursos.");
        } finally {
            setLoading(false);
        }
    };

    const getAllStartedCourses = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/curso/allStarted`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los cursos");
            }

            const data = await response.json();
            setCoursesStarted(data);
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Hubo un error al obtener los cursos.");
        } finally {
            setLoading(false);
        }
    };

    const getInfoUser = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/usuario/info`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error en la petición");
            }

            const dataUsuario = await response.json();
            setStudentName(dataUsuario.nombre);
            setStudentEmail(dataUsuario.email);
            setTotalUserPoints(dataUsuario.puntos_totales);
        } catch (err) {
            console.error("Error en al obtener la info del usuario", err);
        } finally {
            setLoading(false);
        }
    }

    // Obtener el rango del usuario
    const getUserRange = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/usuario/getRange`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error en la petición");
            }
            const data = await response.json();
            setRange(data);
        } catch (err) {
            console.error("Error al obtener el rango del usuario:", err);
        }
    }

    const getAllRanges = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/usuario/getRanges`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error al obtener los rangos: ${response}`);
            }
            const data = await response.json();
            console.log(data);
            setAllRanges(data);
        } catch (err) {
            console.error("Error al obtener los rangos:", err);
        }
    }

    const getAllAttempts = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${API_URL}/quiz/allAttempts`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error en la petición");
            }

            const data = await response.json();
            setAttempts(data);
        } catch (error) {
            console.error();
        }
    }

    // Filtrar los cursos disponibles de los que ya fueron iniciados y mostrarlos en la UI
    const aviableCourses = allCourses.filter(course => 
        !coursesStarted.some(started => started.id_curso === course.id_curso)
    );

    const totalStartedCourses = coursesStarted.length;
    const totalAviableCourses = aviableCourses.length;

    const totalPoints = attempts.reduce((acc, a) => acc += a.calificacion, 0);
    const totalAverageRaw = totalPoints / attempts.length;
    const totalAverage = Number(totalAverageRaw.toFixed(2));
    const safeAverage = isNaN(totalAverage) ? 0 : totalAverage;

    // Obtiene los quiz completados por el usuario
    const quizCompleted = attempts.reduce((acc, q) => q.completado_100 ? acc += 1 : acc, 0);

    useEffect(() => {
        getAllCourses();
        getAllAttempts();
        getAllStartedCourses();
        getInfoUser();
        getUserRange();
        getAllRanges();
    }, []);

    return(
        <main className="student-dashboard-page">
            <HeaderStudentDashboard
                studentName={studentName}
                studentEmail={studentEmail}
                loading={loading}
                range={range}
                setPressRange={setPressRange}
            />
            <ResumeHome
                totalStartedCourses={totalStartedCourses}
                totalAviableCourses={totalAviableCourses}
                totalAverage={safeAverage}
                quizCompleted={quizCompleted}
            />
            <CoursesStartedList
                coursesStarted={coursesStarted}
                loading={loading} error={error}
            />
            <hr />
            <CoursesList
                courses={aviableCourses}
                loading={loading} 
                error={error}
            />
            {pressRange && (
                <Modal 
                    children={
                        <ModalRangos
                            range={range}
                            allRanges={allRanges}
                            totalUserPoints={totalUserPoints}
                        />
                    }
                    setOpenModal={setPressRange}
                />
            )}
        </main>
    );
}