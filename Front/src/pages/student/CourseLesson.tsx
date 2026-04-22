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
    codigo_ejemplo: CodigoEjemplo[];
    id_curso: number;
}

type Quiz = {
    id_quiz: number;
    titulo: string;
    tiempo_limite_segundos: number | null;
    puntos_recompensa: number | null;
    id_modulo: number;
}

type ThemeLesson = "Teoria" | "Codigo" | "Evaluacion";

type languagesExamples = "C" | "C++" | "Python" | "JavaScript" | "Java" | "C#";

// Lista dinámica para mostrar dinámicamente los botones de los lenguajes disponibles
const languagesList: languagesExamples[] = ["C", "C++", "Python", "JavaScript", "Java", "C#"];

type CodigoEjemplo = {
    explicacion_codigo: string;
    codigo: string;
}

export default function CourseLesson() {
    const navigate = useNavigate();
    const module = useParams();
    const id = module.id;

    const [ejemplosCodigos, setEjemplosCodigos] = useState<Record<languagesExamples, CodigoEjemplo>>({
        "C" :{ explicacion_codigo: "", codigo: ""},
        "C++" :{ explicacion_codigo: "", codigo: ""},
        "Python" :{ explicacion_codigo: "", codigo: ""},
        "JavaScript" :{ explicacion_codigo: "", codigo: ""},
        "Java" :{ explicacion_codigo: "", codigo: ""},
        "C#" :{ explicacion_codigo: "", codigo: ""},
    });
    const [theme, setTheme] = useState<ThemeLesson>("Teoria");
    const [modulo, setModulo] = useState<Modulo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [languages, setLanguages] = useState<languagesExamples>("C");

    const getModulo = async () => {
        const token = localStorage.getItem("token");

        // Mapa de conversión
        const lenguajeMapInverso: Record<string, languagesExamples> = {
            "C": "C",
            "C__": "C++",
            "Python": "Python",
            "JavaScript": "JavaScript",
            "Java": "Java",
            "C_": "C#"
        };

        try {
            setLoading(true);

            if (!token) {
                navigate("/");
                throw new Error("No hay token de autenticación");
            }

            const data = await getOneModule(token, Number(id));
            setModulo(data);
            setQuizzes(data.quiz);

            // Transformar array a Record para mostrarlos en la UI
            const ejemplosFormateados = data.codigo_ejemplo.reduce((acc: any, ejemplo: any) => {
                const lenguajeFrontend = lenguajeMapInverso[ejemplo.lenguaje];
                
                acc[lenguajeFrontend] = {
                    explicacion_codigo: ejemplo.explicacion_codigo || "",
                    codigo: ejemplo.codigo || ""
                };
                
                return acc;
            }, {
                // Valores por defecto para lenguajes sin datos
                "C": { explicacion_codigo: "", codigo: "" },
                "C++": { explicacion_codigo: "", codigo: "" },
                "Python": { explicacion_codigo: "", codigo: "" },
                "JavaScript": { explicacion_codigo: "", codigo: "" },
                "Java": { explicacion_codigo: "", codigo: "" },
                "C#": { explicacion_codigo: "", codigo: "" }
            } as Record<languagesExamples, CodigoEjemplo>);

            setEjemplosCodigos(ejemplosFormateados);
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
                        setTheme={setTheme} />

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
                                <p>Visualiza cómo se implementa en diferentes lenguajes</p>
                            </header>

                            <span className="label-select-language">Seleccione un lenguaje:</span>
                            <div className="buttons-languages-selector">
                                {languagesList.map((lang) => (
                                    <button
                                        key={lang}
                                        className={`btn-language ${lang === languages ? "select" : ""}`}
                                        onClick={() => setLanguages(lang)}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            {ejemplosCodigos[languages].explicacion_codigo === "" &&  ejemplosCodigos[languages].codigo === "" ? (
                                <p>No hay ejemplo disponible para {languages}</p>
                            ): (
                                <>
                                    <span className="label-explain-code">Explicación del Código:</span>
                                    <div className="code-explain-code">
                                        {ejemplosCodigos[languages].explicacion_codigo}
                                    </div>
                                    <code className="code-example-area">
                                        {ejemplosCodigos[languages].codigo}
                                    </code>
                                </>
                            )}
                        </section>
                    }
                    {theme === "Evaluacion" && (
                        <section className="modulo-quizzes">
                            {quizzes.map(m => (
                                <article
                                    key={m.id_quiz}
                                    className="quiz-card"
                                >
                                    <small>Número de Quiz: {m.id_quiz}</small>
                                    <h2>{m.titulo}</h2>
                                    <span>Puntos por completarlo: {m.puntos_recompensa} Pts.</span>
                                    <button
                                        className="start-quiz"
                                        onClick={() => navigate(`/quiz/solve/${m.id_quiz}`)}
                                    >
                                        Comenzar
                                    </button>
                                </article>
                            ))}
                        </section>
                    )}
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
                <BookOpen size="sm" /> Teoría
            </button>
            <button
                className={`button-menu-lesson ${theme === "Codigo" ? "selected" : ""}`}
                onClick={() => setTheme("Codigo")}>
                <Code size="sm" /> Ejemplos de Código
            </button>
            <button
                className={`button-menu-lesson ${theme === "Evaluacion" ? "selected" : ""}`}
                onClick={() => setTheme("Evaluacion")}>
                <CheckCircle size="sm" /> Evaluación
            </button>
        </section>
    );
}