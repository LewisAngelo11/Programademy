import { useNavigate, useParams } from "react-router";
import HeaderStudentsPages from "../../components/student/HeaderStudentsPages";
import { useEffect, useState } from "react";
import { getAllModulesFromCourse } from "../../services/moduleServices";
import "./InfoCourse.css"
import toast from "react-hot-toast";

interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
}

export default function InfoCourse() {
    const curso = useParams();
    const navigate = useNavigate();
    const idCurso = curso.id;
    const [courseTitulo, setCourseTitulo] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");
    const [courseImgUrl, setCourseImgUrl] = useState<string>("");
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courseStarted, setCourseStarted] = useState<boolean>(false)

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    // Función para obtener el curso por su ID
    const getCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/curso/getOne/${idCurso}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response) {
                throw new Error("Error al obtener el curso");
            }

            const data = await response.json();
            console.log(data);
            setCourseTitulo(data.course.titulo);
            setCourseDescription(data.course.descripcion);
            setCourseImgUrl(data.course.imagen_url);
            setCourseStarted(data.isStarted);
        } catch (err) {
            console.error("Error en la petición:", err);
        }
    }

    const startCourse = async () => {
        try {
            const response = await fetch(`${API_URL}/curso/started/${idCurso}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                console.log(response);
                toast.error("No se pudo iniciar el curso");
                throw new Error("Error al querer iniciar el curso");
            }
    
            toast.success("¡¡Curso Iniciado!!");
            navigate(-1);
        } catch (err) {
            console.error("Error en la petición", err);
        }
    };

    const getModulesCourse = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const data = await getAllModulesFromCourse(token, Number(idCurso));
            
            setModulos(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los módulos');
            console.error('Error al obtener módulos:', err);
        } finally {
            setLoading(false);
        }
    };

    const totalModulos = modulos.length;

    useEffect(() => {
        getCourse();
        getModulesCourse();
    }, []);

    return (
        <main className="page-info-course">
            <HeaderStudentsPages/>
            <section className="principal-info-course">
                <header className="header-principal-info">
                    <div className="banner-image">
                        {courseImgUrl ? (
                            <img src={courseImgUrl} alt="Imagen del curso" />
                        ): (
                            <div>Imagen no disponible</div>
                        )}
                    </div>
                    <h1>{courseTitulo}</h1>
                    <p>{courseDescription}</p>
                </header>

                {!courseStarted && (
                    <button
                        className="button-start-course"
                        onClick={startCourse}
                    >
                        Iniciar Curso
                    </button>
                )}

                <div className="progress-modules-course">
                    <div className="modules-counter">
                        {totalModulos} Módulos
                    </div>
                    <div className="progress-bar">
                        <div>
                            <p>Progreso del curso</p>
                            <p style={{fontWeight: "600", color: "#000"}}>{0}%</p>
                        </div>
                        <span className="progress-bar-course"></span>
                    </div>
                </div>

                <section className="modules-course">
                    <h2>Módulos</h2>
                    <div className="list-modules-course">
                        {loading && <p style={{fontSize: ".9rem"}}>Cargando módulos...</p>}
                        
                        {error && <p style={{fontSize: ".9rem", color: "red"}}>{error}</p>}
                        
                        {!loading && !error && modulos.length === 0 && (
                            <p style={{fontSize: ".9rem"}}>No hay módulos disponibles en el curso</p>
                        )}

                        {modulos.length > 0 && (modulos.map(m => (
                            <ModuleCourse
                                key={m.id_modulo}
                                idModulo={m.id_modulo}
                                titulo={m.titulo}
                                descripcion={m.descripcion}
                                orden={m.orden}
                                courseStarted={courseStarted}
                            />
                        )))}
                    </div>
                </section>
            </section>
        </main>
    );
}

interface ModuleCourseProp {
    idModulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
}

interface StartedCourseProp {
    courseStarted: boolean;
}

function ModuleCourse({ idModulo, titulo, descripcion, orden, courseStarted }: ModuleCourseProp & StartedCourseProp) {
    const navigate = useNavigate();

    return (
        <article className="module-course-card">
            <span className="module-order">
                Módulo {orden}
            </span>
            <div className="module-course-info">
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
            </div>
            <button 
                className="start-module"
                onClick={() => navigate(`/student/lesson/${idModulo}`)}
                disabled={!courseStarted}
            >
                Comenzar
            </button>
        </article>
    );
}