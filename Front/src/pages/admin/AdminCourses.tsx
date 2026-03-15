import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeftStroke, Plus } from "@boxicons/react";
import AdminCoursesList from "../../components/admin/CoursesPage/AdminCoursesList";
import "./AdminCourses.css"

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
}

export default function AdminCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const API_URL = "http://localhost:3000/curso/all";

    // Función para obtener los cursos
    const fetchCourses = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            const response = await fetch(API_URL, {
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
            setCourses(data);
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("No se pudieron cargar los cursos");
        } finally {
            setLoading(false);
        }
    };

    // Cargar cursos al montar el componente
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <main className="admin-courses-page">
            <header className="header-admin-courses">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="body-admin-courses">
                <header className="header-body-courses">
                    <div className="title-header">
                        <h1>Gestión de Cursos</h1>
                        <span>Crea, edita, o elimina cursos</span>
                    </div>
                    <button 
                        className="button-add-courses"
                        onClick={() => navigate("/courses/create")}>
                        <Plus />
                        Nuevo Curso
                    </button>
                </header>

                {loading && <p>Cargando cursos...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && courses.length === 0 && (
                    <p>No hay cursos disponibles. ¡Crea uno nuevo!</p>
                )}

                {!loading && !error && courses.length > 0 && (
                    <AdminCoursesList 
                        courses={courses} 
                        onCoursesUpdate={fetchCourses}  // Pasamos la función para recargar
                    />
                )}
            </section>
        </main>
    );
}