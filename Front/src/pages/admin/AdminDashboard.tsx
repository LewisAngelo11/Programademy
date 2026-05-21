import HeaderAdminDashboard from "../../components/admin/HeaderAdminDashboard";
import ResumeDashboard from "../../components/admin/ResumeDashboard";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css"
import { useEffect, useState } from "react";
import StudentList from "../../components/admin/StudentList";

export default function AdminDashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [cursos, setCursos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    // Obtener toda la info para el dashboard del admin
    const getAllDataDashboard = async () => {
        const getInfoUserURL = `${API_URL}/usuario/info`;
        const getAllCursosURL = `${API_URL}/curso/all`;
        const getAllModulosURL = `${API_URL}/modulo/all`;
        const getAllQuizzesURL = `${API_URL}/quiz/all`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        try {
            setLoading(true);

            const userResponse = await fetch(getInfoUserURL, {headers});
            if (!userResponse.ok) throw new Error(`Error al obtener la info del usuario: ${userResponse}`);

            const cursosResponse = await fetch(getAllCursosURL, {headers});
            if (!cursosResponse.ok) throw new Error(`Error al obtener los cursos: ${cursosResponse}`);

            const modulosResponse = await fetch(getAllModulosURL, {headers});
            if (!modulosResponse.ok) throw new Error(`Error al obtener los módulos: ${modulosResponse}`);

            const quizzesResponse = await fetch(getAllQuizzesURL, {headers});
            if (!quizzesResponse.ok) throw new Error(`Error al obtener los quizzes: ${quizzesResponse}`);

            const dataUsuario = await userResponse.json();
            setAdminName(dataUsuario.nombre);
            setAdminEmail(dataUsuario.email);

            const dataCursos = await cursosResponse.json();
            setCursos(dataCursos);

            const dataModulos = await modulosResponse.json();
            setModulos(dataModulos);

            const dataQuizzes = await quizzesResponse.json();
            setQuizzes(dataQuizzes);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

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
            />
            <QuickActions/>
            <StudentList/>
        </main>
    );
}