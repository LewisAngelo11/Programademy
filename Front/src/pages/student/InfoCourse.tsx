import { useNavigate, useParams } from "react-router";
import HeaderStudentsPages from "../../components/student/HeaderStudentsPages";
import { useEffect, useState } from "react";
import { ModuloService } from "../../services/moduleService";
import { CourseService } from "../../services/courseService";
import Skeleton from "../../components/ui/Skeleton";
import "./InfoCourse.css";
import toast from "react-hot-toast";
import { Check } from "@boxicons/react/index";

interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
    completed: boolean;
}

interface CourseProgress {
    totalModules: number;
    completedModules: number;
    progress: number;
    completed: boolean;
}

export default function InfoCourse() {
    const curso = useParams();
    const navigate = useNavigate();
    const idCurso = curso.id;
    const [courseTitulo, setCourseTitulo] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");
    const [courseImgUrl, setCourseImgUrl] = useState<string>("");
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [loadingModules, setLoadingModules] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courseStarted, setCourseStarted] = useState<boolean>(false);
    const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null);

    // Función para obtener el curso por su ID
    const getCourse = async () => {
        try {
            setLoadingCourse(true);
            const response = await CourseService.getCourse(Number(idCurso));

            setCourseTitulo(response.course.titulo);
            setCourseDescription(response.course.descripcion);
            setCourseImgUrl(response.course.imagen_url);
            setCourseStarted(response.isStarted);
        } catch (err) {
            console.error("Error en la petición:", err);
        } finally {
            setLoadingCourse(false);
        }
    };

    const startCourse = async () => {
        try {
            const response = await CourseService.startCourse(Number(idCurso));
    
            toast.success(response.message);
            navigate(-1);
        } catch (err) {
            toast.error("No se pudo iniciar el curso");
            console.error("Error en la petición", err);
        }
    };

    const getModulesCourse = async () => {
        try {
            setLoadingModules(true);
            const data = await ModuloService.getAllModulesFromCourse(Number(idCurso));

            setModulos(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los módulos');
            console.error('Error al obtener módulos:', err);
        } finally {
            setLoadingModules(false);
        }
    };

    const getCourseProgress = async () => {
        try {
            const data = await ModuloService.getAllModulesFromCourse(Number(idCurso));
            setCourseProgress(data);
        } catch (error) {
            console.error(error);
        }
    };

    const totalModulos = modulos.length;
    const completedModules = modulos.filter(modulo => modulo.completed).length;
    const progress = totalModulos === 0 ? 0 : Number((completedModules / totalModulos) * 100).toFixed(0);

    useEffect(() => {
        getCourse();
        getModulesCourse();
        getCourseProgress();
    }, []);

    console.log(courseProgress);

    return (
        <main className="page-info-course">
            <HeaderStudentsPages/>
            <section className="principal-info-course">
                {loadingCourse ? (
                    <header className="header-principal-info">
                        <Skeleton width="100%" height="250px" borderRadius="10px" />
                        <Skeleton width="60%" height="32px" borderRadius="6px" />
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                            <Skeleton width="100%" height="18px" borderRadius="4px" />
                            <Skeleton width="80%" height="18px" borderRadius="4px" />
                        </div>
                    </header>
                ) : (
                    <header className="header-principal-info fade-in-skeleton">
                        <div className="banner-image">
                            {courseImgUrl ? (
                                <img src={courseImgUrl} alt="Imagen del curso" />
                            ) : (
                                <div>Imagen no disponible</div>
                            )}
                        </div>
                        <h1>{courseTitulo}</h1>
                        <p>{courseDescription}</p>
                    </header>
                )}

                {!loadingCourse && !courseStarted && (
                    <button
                        className="button-start-course fade-in-skeleton"
                        onClick={startCourse}
                    >
                        Iniciar Curso
                    </button>
                )}

                <div className="progress-modules-course">
                    {loadingModules ? (
                        <Skeleton width="85px" height="28px" borderRadius="10px" />
                    ) : (
                        <div className="modules-counter fade-in-skeleton">
                            {totalModulos} Módulos
                        </div>
                    )}
                    <div className="progress-bar">
                        <div>
                            <p>Progreso del curso</p>
                            <p style={{fontWeight: "600", color: "#000"}}>
                                {progress}%
                            </p>
                        </div>
                        <span className="progress-bar-course">
                            <span
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            ></span>
                        </span>
                    </div>
                </div>

                <section className="modules-course">
                    <h2>Módulos</h2>
                    <div className="list-modules-course">
                        {loadingModules && (
                            Array.from({ length: 4 }).map((_, index) => (
                                <ModuleCourseSkeleton key={index} />
                            ))
                        )}
                        
                        {!loadingModules && error && <p style={{fontSize: ".9rem", color: "red"}}>{error}</p>}
                        
                        {!loadingModules && !error && modulos.length === 0 && (
                            <p style={{fontSize: ".9rem"}}>No hay módulos disponibles en el curso</p>
                        )}

                        {!loadingModules && !error && modulos.length > 0 && (modulos.map(m => (
                            <ModuleCourse
                                key={m.id_modulo}
                                idModulo={m.id_modulo}
                                titulo={m.titulo}
                                descripcion={m.descripcion}
                                orden={m.orden}
                                courseStarted={courseStarted}
                                completed={m.completed}
                            />
                        )))}
                    </div>
                </section>
            </section>
        </main>
    );
}

function ModuleCourseSkeleton() {
    return (
        <article className="module-course-card" style={{ pointerEvents: "none" }}>
            <Skeleton width="80px" height="16px" borderRadius="4px" />
            <div className="module-course-info">
                <Skeleton width="45%" height="22px" borderRadius="4px" />
                <Skeleton width="90%" height="16px" borderRadius="4px" />
            </div>
            <Skeleton width="100px" height="32px" borderRadius="10px" />
        </article>
    );
}

interface ModuleCourseProp {
    idModulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
    completed: boolean;
}

interface StartedCourseProp {
    courseStarted: boolean;
}

function ModuleCourse({ idModulo, titulo, descripcion, orden, courseStarted, completed }: ModuleCourseProp & StartedCourseProp) {
    const navigate = useNavigate();

    return (
        <article className="module-course-card fade-in-skeleton">
            <span className="module-order">
                Módulo {orden}
            </span>
            <div className="module-course-info">
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
            </div>
            {completed && (
                <span className="module-completed">
                    <Check size="xs" /> Completado
                </span>
            )}
            <button 
                className="start-module"
                onClick={() => navigate(`/student/lesson/${idModulo}`)}
                disabled={!courseStarted}
            >
                {!completed ? "Comenzar" : "Ver módulo"}
            </button>
        </article>
    );
}