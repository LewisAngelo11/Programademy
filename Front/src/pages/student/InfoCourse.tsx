import { useParams } from "react-router";
import HeaderStudentsPages from "../../components/student/HeaderStudentsPages";
import { useEffect, useState } from "react";
import "./InfoCourse.css"

interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
}

// Mock data
const modulos: Modulo[] = [];

export default function InfoCourse() {
    const curso = useParams();
    const idCurso = curso.id;
    const [courseTitulo, setCourseTitulo] = useState<string>("");
    const [courseDescription, setCourseDescription] = useState<string>("");

    const API_URL = "http://localhost:3000/curso/getOne"

    // Función para obtener el curso por su ID
    const getCourse = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/${idCurso}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response) {
                throw new Error("Error al obtener el curso");
            }

            const data = await response.json();
            setCourseTitulo(data.titulo);
            setCourseDescription(data.descripcion);
        } catch (err) {
            console.error("Error en la petición:", err);
        }
    }

    useEffect(() => {
        getCourse();
    }, [])

    return (
        <main className="page-info-course">
            <HeaderStudentsPages/>
            <section className="principal-info-course">
                <header className="header-principal-info">
                    <div className="banner-image">Imagen del curso</div>
                    <h1>{courseTitulo}</h1>
                    <p>{courseDescription}</p>
                </header>

                <div className="progress-modules-course">
                    <div className="modules-counter">
                        {0} Módulos
                    </div>
                    <div className="progress-bar">
                        <div>
                            <p>Progreso del curso</p>
                            <p style={{fontWeight: "600", color: "#000"}}>{0}%</p>
                        </div>
                        <span className="progress-bar-course"></span>
                    </div>
                </div>

                <section className="modules-course">
                    <h2>Módulos</h2>
                    <div>
                        {modulos.length === 0 && <p style={{fontSize: ".9rem"}}>No hay módulos disponibles en el curso</p>}
                        {modulos.length > 0 && (modulos.map(m => (
                            <div key={m.id_modulo}></div>
                        )))}
                    </div>
                </section>
            </section>
        </main>
    );
}