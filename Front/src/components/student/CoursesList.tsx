import "./CoursesList.css";
import Skeleton from "../ui/Skeleton";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { X } from "@boxicons/react";
import { useState } from "react";
import { CourseInfo } from "../ui/CourseInfo";

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
    onCourseStarted?: () => void;
}

interface ManageFetching {
    loading: boolean,
    error: string;
}

export default function CoursesList({ courses, loading, error, onCourseStarted }: CoursesProp & ManageFetching) {
    const [showInfoCourse, setShowInfoCourse] = useState<number | null>(null);

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

            <LayoutGroup>
                <AnimatePresence>
                    {!loading && !error && courses.length > 0 && (
                        <div className="list-avaible-courses">
                            {courses.map(c => (
                                <Course
                                    key={c.id_curso}
                                    idCurso={c.id_curso}
                                    titulo={c.titulo}
                                    descripcion={c.descripcion}
                                    imagen_url={c.imagen_url}
                                    isActive={showInfoCourse === c.id_curso}
                                    setShowInfoCourse={setShowInfoCourse}
                                />
                            ))}
                        </div>
                    )}

                    {showInfoCourse !== null && (
                        <motion.div
                            className="course-info-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowInfoCourse(null)}
                        />
                    )}

                    {showInfoCourse !== null && (
                        <CourseInfo
                            idCurso={showInfoCourse}
                            titulo={courses.find(c => c.id_curso === showInfoCourse)?.titulo || ''}
                            descripcion={courses.find(c => c.id_curso === showInfoCourse)?.descripcion || ''}
                            imagen_url={courses.find(c => c.id_curso === showInfoCourse)?.imagen_url || ''}
                            setShowInfoCourse={setShowInfoCourse}
                            onCourseStarted={onCourseStarted}
                        />
                    )}
                </AnimatePresence>
            </LayoutGroup>
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
    isActive: boolean;
    setShowInfoCourse: React.Dispatch<React.SetStateAction<number | null>>;
}

function Course({ idCurso, titulo, descripcion, imagen_url, isActive, setShowInfoCourse }: CourseProp) {
    return (
        <motion.article
            layoutId={`course-${idCurso}`}
            className="course-container fade-in-skeleton"
            style={isActive ? { pointerEvents: "none" } : undefined}
        >
            <motion.div
                className="banner-course"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0 : 1 }}
                exit={{ opacity: 0 }}
            >
                <img src={imagen_url} alt="Imagen previa del curso" />
            </motion.div>
            <motion.div
                className="course-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0 : 1 }}
                exit={{ opacity: 0 }}
            >
                <span>{titulo}</span>
                <p>{descripcion}</p>
                <button
                    className="start-course"
                    onClick={() => setShowInfoCourse(idCurso)}>Ver Curso
                </button>
            </motion.div>
        </motion.article>
    );
}