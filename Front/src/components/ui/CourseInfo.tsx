import { useEffect, useState } from "react";
import { ModuloService } from "../../services/moduleService";
import { CourseService } from "../../services/courseService";
import Skeleton from "../ui/Skeleton";
import { motion } from "motion/react";
import { X, Check } from "@boxicons/react";
import toast from "react-hot-toast";
import "./CourseInfo.css";
import "../../pages/student/InfoCourse.css";

// Interfaz temporal para los módulos
interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
    completed: boolean;
}

interface CourseProp {
    idCurso: number;
    titulo: string;
    descripcion: string;
    imagen_url: string;
    setShowInfoCourse: React.Dispatch<React.SetStateAction<number | null>>;
    onCourseStarted?: () => void;
}

export function CourseInfo({ idCurso, titulo, descripcion, imagen_url, setShowInfoCourse, onCourseStarted }: CourseProp) {
    const [loadingModules, setLoadingModules] = useState(true);
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        getModulesCourse();
    }, [idCurso]);

    // Bloquear el scroll para evitar el desplazamiento en el fondo
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const startCourse = async () => {
        try {
            const response = await CourseService.startCourse(idCurso);

            toast.success(response.message);
            setShowInfoCourse(null);
            onCourseStarted?.();
        } catch (err) {
            toast.error("No se pudo iniciar el curso");
            console.error("Error en la petición", err);
        }
    };

    return (
        <motion.article
            layoutId={`course-${idCurso}`}
            className="course-info-container"
        >
            <button
                type="button"
                className="button-close-course-info"
                onClick={() => setShowInfoCourse(null)}
                aria-label="Cerrar detalle del curso"
                title="Cerrar"
            >
                <X size="sm" />
            </button>

            <header className="header-principal-info-course">
                <div className="banner-image-course">
                    {imagen_url ? (
                        <img src={imagen_url} alt="Imagen del curso" />
                    ) : (
                        <div>Imagen no disponible</div>
                    )}
                </div>
                <div className="course-info-text">
                    <h1>{titulo}</h1>
                    <p>{descripcion}</p>
                </div>
            </header>

            <button
                className="button-start-course-modal"
                onClick={startCourse}
            >
                Iniciar Curso
            </button>

            <section className="modules-course-modal">
                <h2>Módulos</h2>
                <div className="list-modules-course">
                    {loadingModules && (
                        Array.from({ length: 3 }).map((_, index) => (
                            <ModuleCourseSkeleton key={index} />
                        ))
                    )}

                    {!loadingModules && error && <p style={{ fontSize: ".9rem", color: "red" }}>{error}</p>}

                    {!loadingModules && !error && modulos.length === 0 && (
                        <p style={{ fontSize: ".9rem" }}>No hay módulos disponibles en el curso</p>
                    )}

                    {!loadingModules && !error && modulos.length > 0 && (modulos.map(m => (
                        <ModuleCourse
                            key={m.id_modulo}
                            titulo={m.titulo}
                            descripcion={m.descripcion}
                            orden={m.orden}
                            completed={m.completed}
                        />
                    )))}
                </div>
            </section>
        </motion.article>
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

interface ModuleCourseProps {
    titulo: string;
    descripcion: string;
    orden: number;
    completed: boolean;
}

function ModuleCourse({ titulo, descripcion, orden, completed }: ModuleCourseProps) {
    return (
        <article className="module-course-card-modal fade-in-skeleton">
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
                disabled
            >
                {!completed ? "Comenzar" : "Ver módulo"}
            </button>
        </article>
    );
}