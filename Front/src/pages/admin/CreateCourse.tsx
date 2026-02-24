import { useNavigate } from "react-router";
import { ArrowLeftStroke } from "@boxicons/react";
import "./CreateCourses.css";

export default function CreateCourse() {
    const navigate = useNavigate();

    return (
        <main className="create-course-page">
            <header className="header-create-course">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="body-create-course">
                <header className="header-body-create">
                    <h1>Nuevo Curso</h1>
                    <span>Completa la información del nuevo curso</span>
                </header>
                <section className="basic-info-course">
                    <header>
                        <h2>Información Básica</h2>
                        <small>Datos generales del curso</small>
                    </header>
                    <FormCreateCourse/>
                </section>
            </section>
        </main>
    );
}

function FormCreateCourse() {
    return(
        <form action="" className="form-basic-info">
            <div className="course-title">
                <label htmlFor="title-course">Título del Curso *</label>
                <input
                    type="text"
                    id="title-course"
                    placeholder="Ej: Fundamentos de Programación"
                    required/>
            </div>
            <div className="course-description">
                <label htmlFor="description-course">Descripción del Curso *</label>
                <textarea
                    name="description"
                    id="description-course"
                    placeholder="Describe el contenido y los objetivos del curso"/>
            </div>
            <div className="course-banner">
                <label htmlFor="banner-course">URL de Imagen (Opcional)</label>
                <input
                    type="text"
                    id="banner-course"
                    placeholder="https://ejemplo.com/imagen.jpg"/>
            </div>
        </form>
    );
}