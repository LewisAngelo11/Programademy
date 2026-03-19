import { useNavigate } from "react-router";
import { ArrowLeftStroke } from "@boxicons/react";
import "./CreateCourses.css";
import { useState } from "react";
import { Save, X } from "@boxicons/react"

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
                <FormCreateCourse/>
            </section>
        </main>
    );
}

function FormCreateCourse() {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");
    const [courseImgUrl, setCourseImgUrl] = useState<string>("");

    const API_URL = "http://localhost:3000/curso/create";

    const createCourse = async (e: React.FormEvent) => {
        e.preventDefault();

        const bodyCourse = {
            title: courseTitle,
            descripcion: courseDescription,
            imagenUrl: courseImgUrl
        };

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(bodyCourse)
            });

            if (!response.ok) {
                console.error("Error al crear el curso: ", response);
                return;
            }

            const data = await response.json();

            console.log(data);
            alert(data.message);
        } catch (err) {
            console.error("Error en la petición: ", err);
        }
    }

    return(
        <form onSubmit={createCourse} className="form-basic-info">
            <section className="basic-info-course">
                <header>
                    <h2>Información Básica</h2>
                    <small>Datos generales del curso</small>
                </header>
                <div className="course-title">
                    <label htmlFor="title-course">Título del Curso *</label>
                    <input
                        type="text"
                        id="title-course"
                        placeholder="Ej: Fundamentos de Programación"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        required/>
                </div>
                <div className="course-description">
                    <label htmlFor="description-course">Descripción del Curso *</label>
                    <textarea
                        name="description"
                        id="description-course"
                        placeholder="Describe el contenido y los objetivos del curso"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        required/>
                </div>
                <div className="course-banner">
                    <label htmlFor="banner-course">URL de Imagen (Opcional)</label>
                    <input
                        type="text"
                        id="banner-course"
                        value={courseImgUrl}
                        onChange={(e) => setCourseImgUrl(e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"/>
                </div>
            </section>
            <section className="modules-selection">
                <header>
                    <h2>Módulos</h2>
                    <small>Selecciona los módulos que formarán parte de este curso</small>
                </header>
                <div>Próximamente...</div>
            </section>
            <div className="actions-buttons">
                <button className="button-create-course">
                    <Save size={'xs'} />
                    Crear Curso
                </button>
                <button
                    className="button-cancel"
                    type="button"
                    onClick={() => navigate("/courses-admin")}
                >
                    <X size={'xs'}/>
                    Cancelar
                </button>
            </div>
        </form>
    );
}