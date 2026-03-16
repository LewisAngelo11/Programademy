import { useState, useEffect } from "react";
import { Code } from "@boxicons/react";
import "./CoursesList.css";
import { useNavigate } from "react-router";

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
}

export default function CoursesList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const API_URL = "http://localhost:3000/curso/all";

    const getAllCourses = async () => {
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
            setError("Hubo un error al obtener los cursos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <section className="courses-list-section">
            <header className="header-courses-list">
                <h2>Cursos Disponibles</h2>
            </header>
            {loading && <p>Cargando cursos...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && courses.length === 0 && (
                <p>No hay cursos disponibles. ¡Crea uno nuevo!</p>
            )}

            {!loading && !error && courses.length > 0 && (
                <div className="list-avaible-courses">
                    {courses.map(c => (
                        <Course
                            key={c.id_curso}
                            idCurso={c.id_curso}
                            titulo={c.titulo}
                            descripcion={c.descripcion}
                            />
                    ))}
                </div>
            )}
        </section>
    );
}

interface CourseProp {
    idCurso: number;
    titulo: string;
    descripcion: string;
}

function Course({ idCurso, titulo, descripcion }: CourseProp) {
    const navigate = useNavigate();

    return (
        <article className="course-container">
            <div className="banner-course">
                <Code size="lg"/>
            </div>
            <div className="course-info">
                <span>{titulo}</span>
                <p>{descripcion}</p>
                <button
                    className="start-course"
                    onClick={() => navigate(`/info-course/${idCurso}`)}>Ver Curso</button>
            </div>
        </article>
    );
}