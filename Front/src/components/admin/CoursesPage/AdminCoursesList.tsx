import { Trash, Pencil } from "@boxicons/react";
import "./AdminCoursesList.css";

interface CoursesProps {
    courses: Array<any>;
}

export default function AdminCoursesList({ courses }: CoursesProps) {
    return (
        <div className="courses-list">
            {courses.map(c => (
                <Course
                    key={c.id}
                    id={c.id}
                    nombre={c.nombre}
                    descripcion={c.descripcion}
                    modulos={c.modulos}
                    fechaCreacion={c.fechaCreacion}
                />
            ))}
        </div>
    );
}

interface CourseProp {
    id: number;
    nombre: string;
    descripcion: string;
    modulos: number;
    fechaCreacion: string;
}

function Course({ id, nombre, descripcion, modulos, fechaCreacion }: CourseProp) {
    return (
        <article className="courses-container">
            <header className="header-container">
                <div className="info-course">
                    <div className="principal-info">
                        <h2>{nombre}</h2>
                        <span>{modulos} módulos</span>
                    </div>
                    <span>{descripcion}</span>
                </div>
                <div className="buttons-container">
                    <button><Pencil /> Editar</button>
                    <button><Trash fill="#ff0000"/></button>
                </div>
            </header>
            <div className="more-info">
                <span>Creado: {fechaCreacion}</span>
                <span>ID: course-{id}</span>
            </div>
            <span>Modulos: </span>
        </article>
    );
}