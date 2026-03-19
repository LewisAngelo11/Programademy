import { Trash, Pencil } from "@boxicons/react";
import { useEffect, useState } from "react";
import "./AdminCoursesList.css";
import { useNavigate } from "react-router";
import { getAllModulesFromCourse } from "../../../services/moduleServices";

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
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/curso/delete";

    const getModulesFromCourse = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    throw new Error("No hay token de autenticación");
                }
    
                const data = await getAllModulesFromCourse(token, id)

                setModules(data);
            } catch (err) {
                
            }
        }

    const handleDelete = async () => {
        // Confirmación antes de eliminar
        const confirmDelete = window.confirm(
            `¿Estás seguro de eliminar el curso "${titulo}"? Esta acción no se puede deshacer.`
        );

        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el curso");
            }

            const data = await response.json();
            alert(data.message);
            
            // Recargar la lista de cursos
            onCoursesUpdate();
        } catch (err) {
            console.error("Error al eliminar:", err);
            alert("Error al eliminar el curso");
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
        <article className="courses-container">
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
                    {modules.length === 0 && <div style={{fontSize: ".8rem"}}>Sin módulos asignados</div>}
                    {modules.length > 0 && modules.map(m => (
                        <div className="module-object-list">{m.orden}. {m.titulo}</div>
                    ))}
                </div>
            </div>
        </article>
    );
}