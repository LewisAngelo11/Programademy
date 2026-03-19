import { useNavigate, useParams } from "react-router";
import React, { useState, useEffect, type SetStateAction } from "react";
import { getOneModule } from "../../services/moduleServices";
import { ArrowLeftStroke, BookOpen, Code, CheckCircle } from "@boxicons/react";
import "./CourseLesson.css";

interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    contenido_teorico: string;
    orden: number;
    id_curso: number;
}

type ThemeLesson = "Teoria" | "Codigo" | "Evaluacion";

export default function CourseLesson() {
    const navigate = useNavigate();
    const module = useParams();
    const id = module.id;
    
    const [theme, setTheme] = useState<ThemeLesson>("Teoria");
    const [modulo, setModulo] = useState<Modulo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const getModulo = async () => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            
            if (!token) {
                navigate("/");
                throw new Error("No hay token de autenticación");
            }

            const data = await getOneModule(token, Number(id));
            setModulo(data);
        } catch (err) {
            setError("Error en la petición");
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Obtiene el el modulo al montar el componente siempre y cuando la dependencia id cambie
    useEffect(() => {
        if (id) {
            getModulo();
        }
    }, [id]);

    if (!modulo) return <div>No se encontró el módulo</div>;

    return (
        <main className="course-lesson-page">
            <header className="header-course-lesson">
                <button
                    className="button-back-course-lesson"
                    onClick={() => navigate(`/info-course/${modulo.id_curso}`)}>
                    <ArrowLeftStroke />
                    Volver al Contenido Teórico
                </button>
            </header>

            {loading && (
                <div className="loading-state">
                    <p>Cargando módulo...</p>
                </div>
            )}

            {error && (
                <div className="error-state">
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}

            {!loading && !error && modulo && (
                <section className="module-info-lesson">
                    <header className="header-module-info-lesson">
                        <div className="div-order-module">Módulo {modulo.orden}</div>
                        <h1>{modulo.titulo}</h1>
                        <p>{modulo.descripcion}</p>
                    </header>
                    <ToggleMenuLesson
                        theme={theme}
                        setTheme={setTheme}/>

                    {theme === "Teoria" &&
                        <section className="modulo-contenido-teorico">
                            <header>
                                <h2>Contenido Teórico</h2>
                                <p>Conceptos fundamentales de {modulo.titulo}</p>
                            </header>
                            <p>{modulo.contenido_teorico}</p>
                        </section>
                    }
                    {theme === "Codigo" &&
                        <section className="modulo-codigo-ejemplo">
                            <header>
                                <h2>Ejemplos de Código</h2>
                                <p>Próximamente...</p>
                            </header>
                        </section>
                    }
                </section>
            )}
        </main>
    );
}

interface SelectThemeProp {
    theme: ThemeLesson;
    setTheme: React.Dispatch<SetStateAction<ThemeLesson>>;
}

function ToggleMenuLesson({ theme, setTheme }: SelectThemeProp) {
    return (
        <section className="toggle-menu-lesson">
            <button
                className={`button-menu-lesson ${theme === "Teoria" ? "selected" : ""}`}
                onClick={() => setTheme("Teoria")}
            >
                <BookOpen size="sm"/> Teoría
            </button>
            <button
                className={`button-menu-lesson ${theme === "Codigo" ? "selected" : ""}`}
                onClick={() => setTheme("Codigo")}>
                <Code size="sm"/> Ejemplos de Código
            </button>
            <button 
                className={`button-menu-lesson ${theme === "Evaluacion" ? "selected" : ""}`}
                onClick={() => setTheme("Evaluacion")}>
                <CheckCircle size="sm"/> Evaluación
            </button>
        </section>
    );
}