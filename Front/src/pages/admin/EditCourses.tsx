import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState, type SetStateAction } from "react";
import { ArrowLeftStroke, Save, X } from "@boxicons/react";
import { CourseService } from "../../services/courseService";
import "./EditCourses.css";
import toast from "react-hot-toast";

export default function EditCourses() {
    const navigate = useNavigate();
    const curso = useParams();
    const idCurso = Number(curso.id);
    const [courseEditTitle, setCourseEditTitle] = useState<string>("");
    const [courseEditDescription, setCourseEditDescription] = useState<string>("");
    const [courseEditImgUrl, setCourseEditImgUrl] = useState<string>("");

    // Función para obtener el curso por su ID
    const getCourse = async () => {
        try {
            const response = await CourseService.getCourse(idCurso);

            setCourseEditTitle(response.course.titulo);
            setCourseEditDescription(response.course.descripcion);
            setCourseEditImgUrl(response.course.imagen_url);
        } catch (err) {
            console.error("Error en la petición:", err);
        }
    }

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <main className="edit-course-page">
            <header className="header-edit-course">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="body-edit-course">
                <header className="header-body-edit">
                    <h1>Editar Curso</h1>
                </header>
                <FormEditCourse
                    idCurso={idCurso}
                    courseEditTitle={courseEditTitle} 
                    setCourseEditTitle={setCourseEditTitle}
                    courseEditDescription={courseEditDescription}
                    setCourseEditDescription={setCourseEditDescription}
                    courseEditImgUrl={courseEditImgUrl}
                    setCourseEditImgUrl={setCourseEditImgUrl}
                    />
            </section>
        </main>
    );
}

interface CourseEditProp {
    idCurso: number;
    courseEditTitle: string;
    setCourseEditTitle: React.Dispatch<SetStateAction<string>>;
    courseEditDescription: string;
    setCourseEditDescription: React.Dispatch<SetStateAction<string>>;
    courseEditImgUrl: string;
    setCourseEditImgUrl: React.Dispatch<SetStateAction<string>>;
}

function FormEditCourse({
    idCurso, courseEditTitle, setCourseEditTitle,
    courseEditDescription, setCourseEditDescription,
    courseEditImgUrl, setCourseEditImgUrl}: CourseEditProp) {
    const navigate = useNavigate();

    const editCourse = async () => {
        const bodyEditCourse = {
            titulo: courseEditTitle,
            descripcion: courseEditDescription,
            imagenUrl: courseEditImgUrl
        }

        try {
            await CourseService.editCourse(idCurso, bodyEditCourse);

            toast.success("¡Curso editado correctamente!");
            navigate(-1); // Regresar a la pantalla anterior
        } catch (err) {
            toast.error("Error al actualizar el curso.");
            console.error("Error al actualizar el curso: ", err);
        }
    }

    return (
        <form action={editCourse} className="form-basic-info-edit">
            <section className="basic-info-course">
                <header>
                    <h2>Editar la Inforación Básica</h2>
                    <small>Edita los datos generales del curso</small>
                </header>
                <div className="course-edit-title">
                    <label htmlFor="title-course">Título del Curso *</label>
                    <input
                        type="text" 
                        id="title-course"
                        placeholder="Ej: Fundamentos de Programación"
                        value={courseEditTitle}
                        onChange={(e) => setCourseEditTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="course-edit-description">
                    <label htmlFor="description-course">Descripción del Curso *</label>
                    <textarea
                        name="description"
                        id="description-course"
                        placeholder="Describe el contenido y los objetivos del curso"
                        value={courseEditDescription}
                        onChange={(e) => setCourseEditDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="course-edit-banner">
                    <label htmlFor="banner-course">URL de Imagen (Opcional)</label>
                    <input
                        type="text"
                        id="banner-course"
                        value={courseEditImgUrl}
                        onChange={(e) => setCourseEditImgUrl(e.target.value)}
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
                <button className="button-edit-course">
                    <Save size={'xs'} />
                    Actualizar Curso
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