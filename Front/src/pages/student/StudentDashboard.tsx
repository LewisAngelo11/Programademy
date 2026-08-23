import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderStudentDashboard from "../../components/student/HeaderStudentDashboard";
import "./StudentDashboard.css";
import ResumeHome from "../../components/student/ResumeHome";
import CoursesList from "../../components/student/CoursesList";
import CoursesStartedList from "../../components/student/CoursesStartedList";
import Modal from "../../Modals/Modal";
import ModalRangos from "../../components/student/ModalRangos";
import { UserService } from "../../services/userService";
import { CourseService } from "../../services/courseService";
import { QuizService } from "../../services/quizService";

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
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

    // Obtener toda la info para el dashboard del estudiante
    const getAllDataDashboard = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            const [
                dataUsuario,
                dataCursosIniciados,
                dataCursos,
                dataRange,
                dataRanges,
                dataAttempts
            ] = await Promise.all([
                UserService.getInfo(),
                CourseService.getAllStartedCourses(),
                CourseService.getAllCourses(),
                UserService.getRange(),
                UserService.getRanges(),
                QuizService.getAllAttempts(),
            ]);

            setStudentName(dataUsuario.nombre);
            setStudentEmail(dataUsuario.email);
            setTotalUserPoints(dataUsuario.puntos_totales);

            setCoursesStarted(dataCursosIniciados);
            setAllCourses(dataCursos);
            setRange(dataRange);
            setAllRanges(dataRanges);
            setAttempts(dataAttempts);

        } catch (err: any) {
            console.error(err);
            if (err.message?.includes("token") || err.message?.includes("autorizado")) {
                localStorage.clear();
                navigate("/login");
                return;
            }
            setError("Ocurrió un error al obtener los datos del dashboard. Por favor, inténtalo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

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
        getAllDataDashboard();
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
                loading={loading}
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