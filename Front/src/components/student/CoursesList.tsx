import "./CoursesList.css";
import { useNavigate } from "react-router";

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
            {loading && <p>Cargando cursos...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && courses.length === 0 && (
                <p>No hay más cursos disponibles. Pronto habrá más.</p>
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

interface CourseProp {
    idCurso: number;
    titulo: string;
    descripcion: string;
    imagen_url: string;
}

function Course({ idCurso, titulo, descripcion, imagen_url }: CourseProp) {
    const navigate = useNavigate();

    return (
        <article className="course-container">
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