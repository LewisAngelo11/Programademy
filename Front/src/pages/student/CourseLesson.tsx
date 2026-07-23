import { useNavigate, useParams } from "react-router";
import React, { useState, useEffect, type SetStateAction } from "react";
import { getOneModule } from "../../services/moduleServices";
import { ArrowLeftStroke, BookOpen, Code, CheckCircle, VolumeFull, PauseCircle, PlayCircle, StopCircle } from "@boxicons/react";
import "./CourseLesson.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";

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
    const [codeCopied, setCodeCopied] = useState<boolean>(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isReading, setIsReading] = useState(false);
    const [isPause, setIsPause] = useState(false);

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

    // Cargar las voces narradoras
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const copyCode = () => {
        navigator.clipboard.writeText(ejemplosCodigos[languages].codigo);
        setCodeCopied(true);
        toast.success("¡Código Copiado!");
        setTimeout(() => setCodeCopied(false), 3000);
    }

    // Obtener voces narradoras
    const getBestVoice = () => {
        const preferredNames = [
            "Paulina",
            "Monica",
            "Google español México",
            "Google español",
            "Sabina"
        ];


        return voices.find(voice =>
            preferredNames.some(name =>
                voice.name.includes(name)
            )
        )
        ??
        voices.find(voice =>
            voice.lang === "es-MX"
        )
        ??
        voices.find(voice =>
            voice.lang.startsWith("es")
        );

    };

    // Preparar el texto para una mejor narración
    const prepareText = (text: string) => {
        return text
            // Quitar negritas Markdown **texto**
            .replace(/\*\*(.*?)\*\*/g, "$1")

            // Quitar guiones de listas
            .replace(/^- /gm, "")

            // Mejorar siglas
            .replace(/\bJS\b/g, "JavaScript")
            .replace(/\bTS\b/g, "TypeScript")
            .replace(/\bAPI\b/g, "A P I")
            .replace(/\bHTML\b/g, "H T M L")
            .replace(/\(OOP\)/g, "P O O")
            .replace(/\bOOP\b/g, "Programación orientada a objetos")
            .replace(/\bCSS\b/g, "C S S")
            .replace(/\bUI\b/g, "interfaz de usuario")
            .replace(/\bUX\b/g, "experiencia de usuario")

            // Limpiar espacios múltiples
            .replace(/\s+/g, " ")
            .trim();
    };

    // Función para leer el contenido teorico del módulo
    const readText = () => {
        if (!modulo) return;

        // Evitar que se acumulen lecturas
        window.speechSynthesis.cancel();
        const texto = prepareText(modulo.contenido_teorico);

        // Crear el objeto de narración
        const contenidoTeorico = new SpeechSynthesisUtterance(texto);

        const voz = getBestVoice();
        if (voz) {
            contenidoTeorico.voice = voz;
        }

        // Ajustes para que suene más natural
        contenidoTeorico.rate = 0.95; // Velocidad
        contenidoTeorico.pitch = 0.95; // Tono
        contenidoTeorico.volume = 1; // Volumen

        contenidoTeorico.onstart = () => {
            setIsReading(true);
            setIsPause(false);
        };

        contenidoTeorico.onend = () => {
            setIsReading(false);
            setIsPause(false);
        };

        contenidoTeorico.onerror = () => {
            setIsReading(false);
            setIsPause(false);
        };

        window.speechSynthesis.speak(contenidoTeorico);
    };

    // Función para detener la voz narradora
    const stopReading = () => {
        window.speechSynthesis.cancel();

        setIsReading(false);
        setIsPause(false);
    };

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
                                <div>
                                    <h2>Contenido Teórico</h2>
                                    <p>Conceptos fundamentales de {modulo.titulo}</p>
                                </div>
                                <div>
                                    {!isReading ? (
                                        <button className="btn-speaker" onClick={readText}>
                                            <VolumeFull />
                                        </button>
                                    ): (
                                        <div className="btns-speakers">
                                            {!isPause ? (
                                                <button className="btn-speaker" onClick={() => {
                                                        if(window.speechSynthesis.speaking){
                                                            window.speechSynthesis.pause();
                                                            setIsPause(true);
                                                        }
                                                    }}
                                                >
                                                    <PauseCircle />
                                                </button>
                                            ): (
                                                <button className="btn-speaker" onClick={() => {window.speechSynthesis.resume(); setIsPause(false)}}>
                                                    <PlayCircle />
                                                </button>
                                            )}
                                            <button className="btn-speaker" onClick={stopReading}>
                                                <StopCircle />
                                            </button>
                                        </div>
                                    )}
                                </div>
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
                                    <span className="label-explain-code">
                                        Explicación del Código:
                                    </span>
                                    <div className="code-explain-code">
                                        {ejemplosCodigos[languages].explicacion_codigo}
                                    </div>
                                    <div className="code-block-container">
                                        <div className="code-header">
                                            <span>{languages}</span>
                                            {!codeCopied ? (
                                                <button
                                                    className="copy-code-btn"
                                                    onClick={copyCode}
                                                >
                                                    Copiar
                                                </button>
                                            ): (
                                                <button
                                                    className="copied-code-btn"
                                                    onClick={copyCode}
                                                    disabled
                                                >
                                                    Copiado
                                                </button>
                                            )}
                                        </div>
                                        <SyntaxHighlighter
                                            language={languages.toLowerCase()}
                                            style={vscDarkPlus}
                                            showLineNumbers
                                            customStyle={{
                                                margin: 0,
                                                padding: "20px",
                                                background: "#1e1e1e",
                                                fontSize: "12px",
                                                borderRadius: "0 0 14px 14px",
                                            }}
                                        >
                                            {ejemplosCodigos[languages].codigo}
                                        </SyntaxHighlighter>
                                    </div>
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