import { Trash, Pencil } from "@boxicons/react";
import { useEffect, useState } from "react";
import "./AdminCoursesList.css";
import { useNavigate } from "react-router";
import { ModuloService } from "../../../services/moduleService";
import { CourseService } from "../../../services/courseService";
import Skeleton from "../../ui/Skeleton";
import toast from "react-hot-toast";

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
}

interface Module {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    orden: number;
}

interface CoursesProps {
    courses: Course[];
    onCoursesUpdate: () => void;  // Nueva prop para recargar cursos después de eliminar
}

export default function AdminCoursesList({ courses, onCoursesUpdate }: CoursesProps) {
    return (
        <div className="courses-list">
            {courses.map(c => (
                <Course
                    key={c.id_curso}
                    id={c.id_curso}
                    titulo={c.titulo}
                    descripcion={c.descripcion}
                    fechaCreacion={c.fecha_creacion}
                    onCoursesUpdate={onCoursesUpdate}
                />
            ))}
        </div>
    );
}

interface CourseProp {
    id: number;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
    onCoursesUpdate: () => void;
}

function Course({ id, titulo, descripcion, fechaCreacion, onCoursesUpdate }: CourseProp) {
    const [modules, setModules] = useState<Module[]>([]);
    const [loadingModules, setLoadingModules] = useState<boolean>(true);
    const navigate = useNavigate();

    const getModulesFromCourse = async () => {
            try {
                setLoadingModules(true);
                const data = await ModuloService.getAllModulesFromCourse(id);

                setModules(data);
            } catch (err) {
                console.log("Error en la petición:", err);
            } finally {
                setLoadingModules(false);
            }
        }

    const handleDelete = async () => {
        // Confirmación antes de eliminar
        const confirmDelete = window.confirm(
            `¿Estás seguro de eliminar el curso "${titulo}"? Esta acción no se puede deshacer.`
        );

        if (!confirmDelete) return;

        try {
            const data = await CourseService.deleteCourse(id);

            toast.success(data.message);
            // Recargar la lista de cursos
            onCoursesUpdate();
        } catch (err) {
            console.error("Error al eliminar:", err);
            toast.error("Error al eliminar el curso.");
        }
    };


    // Esta función le da un mejor formato a la fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const totalModulos = modules.length;

    useEffect(() => {
        getModulesFromCourse();
    }, []);

    return (
        <article className="courses-container fade-in-skeleton">
            <header className="header-container">
                <div className="info-course">
                    <div className="principal-info">
                        <h2>{titulo}</h2>
                        <span>{totalModulos} módulos</span>
                    </div>
                    <span>{descripcion}</span>
                </div>
                <div className="buttons-container">
                    <button onClick={() => navigate(`/courses/edit/${id}`)}>
                        <Pencil size="xs"/> Editar
                    </button>
                    <button onClick={handleDelete}>
                        <Trash size="xs" fill="#ff0000"/>
                    </button>
                </div>
            </header>
            <div className="more-info">
                <span>Creado: {formatDate(fechaCreacion)}</span>
                <span>ID: course-{id}</span>
            </div>
            <div className="module-container-list">
                <span>Módulos: </span>
                <div className="modules-course-list">
                    {loadingModules &&
                        <>
                            <Skeleton width={100} height={22} borderRadius={8} />
                            <Skeleton width={90} height={22} borderRadius={8} />
                            <Skeleton width={110} height={22} borderRadius={8} />
                        </>
                    }
                    {!loadingModules && modules.length === 0 && <div style={{fontSize: ".8rem"}}>Sin módulos asignados</div>}
                    {!loadingModules && modules.length > 0 && modules.map(m => (
                        <div key={m.id_modulo} className="module-object-list fade-in-skeleton">{m.orden}. {m.titulo}</div>
                    ))}
                </div>
            </div>
        </article>
    );
}