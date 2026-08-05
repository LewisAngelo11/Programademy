import HeaderAdminDashboard from "../../components/admin/HeaderAdminDashboard";
import ResumeDashboard from "../../components/admin/ResumeDashboard";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentList from "../../components/admin/StudentList";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [cursos, setCursos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    // Función para manejar las solicitudes fetch y redirigir al login en caso de 401
    const fetchData = async (url: string, headers: HeadersInit, errorMessage: string) => {
        const response = await fetch(url, { headers });

        if (response.status === 401) {
            localStorage.clear();
            navigate("/login");
            return;
        }

        if (!response.ok) {
            throw new Error(errorMessage);
        }

        return response.json();
    };

    // Obtener toda la info para el dashboard del admin
    const getAllDataDashboard = async () => {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            setLoading(true);

            const [
                dataUsuario,
                dataCursos,
                dataModulos,
                dataQuizzes,
            ] = await Promise.all([
                fetchData(`${API_URL}/usuario/info`, headers, "Error al obtener la info del usuario"),
                fetchData(`${API_URL}/curso/all`, headers, "Error al obtener los cursos"),
                fetchData(`${API_URL}/modulo/all`, headers, "Error al obtener los módulos"),
                fetchData(`${API_URL}/quiz/all`, headers, "Error al obtener los quizzes"),
            ]);

            if (!dataUsuario) return; // Se redirigió por 401

            setAdminName(dataUsuario.nombre);
            setAdminEmail(dataUsuario.email);

            setCursos(dataCursos);
            setModulos(dataModulos);
            setQuizzes(dataQuizzes);

        } catch (err) {
            console.error(err);
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
            />
            <QuickActions/>
            <StudentList/>
        </main>
    );
}