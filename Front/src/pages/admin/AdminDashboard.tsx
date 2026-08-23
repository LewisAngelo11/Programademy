import HeaderAdminDashboard from "../../components/admin/HeaderAdminDashboard";
import ResumeDashboard from "../../components/admin/ResumeDashboard";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentList from "../../components/admin/StudentList";
import { UserService } from "../../services/userService";
import { CourseService } from "../../services/courseService";
import { ModuloService } from "../../services/moduleService";
import { QuizService } from "../../services/quizService";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [cursos, setCursos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    // Obtener toda la info para el dashboard del admin
    const getAllDataDashboard = async () => {
        try {
            setLoading(true);

            const [
                dataUsuario,
                dataCursos,
                dataModulos,
                dataQuizzes,
            ] = await Promise.all([
                UserService.getInfo(),
                CourseService.getAllCourses(),
                ModuloService.getAllModules(),
                QuizService.getAllQuizzes(),
            ]);

            setAdminName(dataUsuario.nombre);
            setAdminEmail(dataUsuario.email);

            setCursos(dataCursos);
            setModulos(dataModulos);
            setQuizzes(dataQuizzes);

        } catch (err: any) {
            console.error(err);
            if (err.message?.includes("token") || err.message?.includes("autorizado")) {
                localStorage.clear();
                navigate("/login");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDataDashboard();
    }, []);

    const totalCursos = cursos.length;
    const totalModulos = modulos.length;
    const totalQuizzes = quizzes.length;
    
    return(
        <main className="admin-dashboard-page">
            <HeaderAdminDashboard 
                adminName={adminName}
                adminEmail={adminEmail}
                loading={loading}
            />
            <ResumeDashboard
                totalCursos={totalCursos}
                totalModulos={totalModulos}
                totalQuizzes={totalQuizzes}
                loading={loading}
            />
            <QuickActions/>
            <StudentList/>
        </main>
    );
}