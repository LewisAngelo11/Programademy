import { Trash, Pencil } from "@boxicons/react";
import "./AdminCoursesList.css";

interface Course {
    id_curso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    estado: string;
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
    const API_URL = "http://localhost:3000/curso/delete";

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

    const handleEdit = () => {
        // Por ahora solo muestra un alert, después implementaremos la edición
        alert(`Editar curso: ${titulo} (ID: ${id})`);
        // TODO: Navegar a página de edición o abrir modal
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

    return (
        <article className="courses-container">
            <header className="header-container">
                <div className="info-course">
                    <div className="principal-info">
                        <h2>{titulo}</h2>
                        <span>0 módulos</span>
                    </div>
                    <span>{descripcion}</span>
                </div>
                <div className="buttons-container">
                    <button onClick={handleEdit}>
                        <Pencil /> Editar
                    </button>
                    <button onClick={handleDelete}>
                        <Trash fill="#ff0000"/>
                    </button>
                </div>
            </header>
            <div className="more-info">
                <span>Creado: {formatDate(fechaCreacion)}</span>
                <span>ID: course-{id}</span>
            </div>
            <span>Módulos: </span>
        </article>
    );
}