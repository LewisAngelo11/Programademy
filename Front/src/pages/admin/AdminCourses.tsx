import { useNavigate } from "react-router";
import { ArrowLeftStroke, Plus } from "@boxicons/react";
import AdminCoursesList from "../../components/admin/CoursesPage/AdminCoursesList";
import "./AdminCourses.css"

// Mock data
const courses = [
    {id: 1, nombre: "Fundamentos de Programación", descripcion: "Aprende los conceptos básicos de la lógica de programación", modulos: 3, fechaCreacion: "20/2/2026"},
    {id: 2, nombre: "Estructuras de Control", descripcion: "Domina los ciclos, condicionales y el flujo de control en programación.", modulos: 2, fechaCreacion: "21/2/2026"},
    {id: 3, nombre: "Estructuras de Datos", descripcion: "Comprende arrays, listas, pilas, colas y otras estructuras fundamentales.", modulos: 1, fechaCreacion: "22/2/2026"},
];

export default function AdminCourses() {
    const navigate = useNavigate();

    return (
        <main className="admin-courses-page">
            <header className="header-admin-courses">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="body-admin-courses">
                <header className="header-body-courses">
                    <div className="title-header">
                        <h1>Gestión de Cursos</h1>
                        <span>Crea, edita, o elimina cursos</span>
                    </div>
                    <button 
                        className="button-add-courses"
                        onClick={() => navigate("/courses/create")}>
                        <Plus />
                        Nuevo Curso
                    </button>
                </header>
                <AdminCoursesList courses={courses}/>
            </section>
        </main>
    );
}