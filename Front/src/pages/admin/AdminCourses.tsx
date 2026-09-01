import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeftStroke, Plus } from "@boxicons/react";
import { CourseService } from "../../services/courseService";
import AdminCoursesList from "../../components/admin/CoursesPage/AdminCoursesList";
import Skeleton from "../../components/ui/Skeleton";
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

    // Función para obtener los cursos
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await CourseService.getAllCourses();
            setCourses(data);
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("No se pudieron cargar los cursos");
        } finally {
            setLoading(false);
        }
    };

    // Cargar los cursos al montar el componente
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
                        <Plus size="xs"/>
                        Nuevo Curso
                    </button>
                </header>

                {loading && (
                    <div className="courses-list">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="courses-container">
                                <header className="header-container">
                                    <div className="info-course" style={{ gap: ".4rem" }}>
                                        <div className="principal-info">
                                            <Skeleton width={160} height={16} />
                                            <Skeleton width={80} height={20} borderRadius={10} />
                                        </div>
                                        <Skeleton width={260} height={12} />
                                    </div>
                                    <div className="buttons-container">
                                        <Skeleton width={80} height={30} borderRadius={8} />
                                        <Skeleton width={30} height={30} borderRadius={8} />
                                    </div>
                                </header>
                                <div className="more-info">
                                    <Skeleton width={120} height={12} />
                                    <Skeleton width={90} height={12} />
                                </div>
                                <div className="module-container-list">
                                    <Skeleton width={70} height={12} />
                                    <div className="modules-course-list">
                                        <Skeleton width={100} height={22} borderRadius={8} />
                                        <Skeleton width={90} height={22} borderRadius={8} />
                                        <Skeleton width={110} height={22} borderRadius={8} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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