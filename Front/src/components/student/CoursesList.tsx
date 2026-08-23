import "./CoursesList.css";
import { useNavigate } from "react-router";
import Skeleton from "../ui/Skeleton";
import { X } from "@boxicons/react";

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
    imagen_url: string;
}

interface CoursesProp {
    courses: Course[];
}

interface ManageFetching {
    loading: boolean,
    error: string;
}

export default function CoursesList({ courses, loading, error }: CoursesProp & ManageFetching) {
    return (
        <section className="courses-list-section">
            <header className="header-courses-list">
                <h2>Cursos Disponibles</h2>
            </header>
            {loading && (
                <div className="list-avaible-courses">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <CourseCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {!loading && error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && courses.length === 0 && (
                <div className="card-no-more-courses fade-in-skeleton">
                    <div className="icon-x-container">
                        <X size="lg" color="#8e8e8eff"/>
                    </div>
                    <span style={{ color: "#8e8e8eff", fontSize: "1.2rem", fontWeight: "400"}}>
                        No hay mas cursos disponibles. Pronto habrá mas.
                    </span>
                </div>
            )}

            {!loading && !error && courses.length > 0 && (
                <div className="list-avaible-courses">
                    {courses.map(c => (
                        <Course
                            key={c.id_curso}
                            idCurso={c.id_curso}
                            titulo={c.titulo}
                            descripcion={c.descripcion}
                            imagen_url={c.imagen_url}
                            />
                    ))}
                </div>
            )}
        </section>
    );
}

function CourseCardSkeleton() {
    return (
        <article className="course-container" style={{ pointerEvents: "none" }}>
            <div className="banner-course" style={{ background: "transparent" }}>
                <Skeleton width="100%" height="220px" borderRadius="10px 10px 0 0" />
            </div>
            <div className="course-info">
                <Skeleton width="70%" height="22px" />
                <Skeleton width="100%" height="15px" />
                <Skeleton width="85%" height="15px" />
                <div style={{ marginTop: "auto", width: "100%" }}>
                    <Skeleton width="100%" height="38px" borderRadius="10px" />
                </div>
            </div>
        </article>
    );
}

interface CourseProp {
    idCurso: number;
    titulo: string;
    descripcion: string;
    imagen_url: string;
}

function Course({ idCurso, titulo, descripcion, imagen_url }: CourseProp) {
    const navigate = useNavigate();

    return (
        <article className="course-container fade-in-skeleton">
            <div className="banner-course">
                <img src={imagen_url} alt="Imagen previa del curso" />
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