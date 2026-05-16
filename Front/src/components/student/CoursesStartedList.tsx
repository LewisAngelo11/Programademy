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

interface CoursesStartedProp {
    coursesStarted: Course[];
}

interface ManageFetching {
    loading: boolean,
    error: string;
}

export default function CoursesStartedList({ coursesStarted, loading, error }: CoursesStartedProp & ManageFetching) {

    return (
        <section className="courses-list-section">
            <header className="header-courses-list">
                <h2>Mis Cursos</h2>
            </header>
            {loading && <p>Cargando cursos...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && coursesStarted.length === 0 && (
                <p>Sin cursos iniciados</p>
            )}

            {!loading && !error && coursesStarted.length > 0 && (
                <div className="list-avaible-courses">
                    {coursesStarted.map((c: any) => (
                        <Course
                            key={c.curso.id_curso}
                            idCurso={c.curso.id_curso}
                            titulo={c.curso.titulo}
                            descripcion={c.curso.descripcion}
                            imagen_url={c.curso.imagen_url}
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
                    onClick={() => navigate(`/info-course/${idCurso}`)}>Comenzar</button>
            </div>
        </article>
    );
}