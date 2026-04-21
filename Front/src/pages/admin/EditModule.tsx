import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftStroke, BookOpen, Code, Save, X } from "@boxicons/react";
import getAllCourses from "../../services/getCourses";
import "./EditModule.css";

type FormBasicInfo = {
    curso: string;
    orden: number;
    titulo: string;
    descripcion: string;
    contenido: string;
};

type Course = {
    id_curso: number;
    titulo: string;
};

type languagesExamples = "C" | "C++" | "Python" | "JavaScript" | "Java" | "C#";

type CodigoEjemplo = {
    explicacion_codigo: string;
    codigo: string;
}

// Lista dinámica para mostrar dinámicamente los botones de los lenguajes disponibles
const languagesList: languagesExamples[] = ["C", "C++", "Python", "JavaScript", "Java", "C#"];

export default function EditModule() {
    const navigate = useNavigate();
    const modulo = useParams(); // Obtener el ID del módulo desde la URL
    const idModulo = modulo.id;
    
    const [form, setForm] = useState<FormBasicInfo>({
        curso: "",
        orden: 1,
        titulo: "",
        descripcion: "",
        contenido: ""
    });

    // Estado que guarda los ejemplos de código de cada lenguaje
    const [ejemplosCodigos, setEjemplosCodigos] = useState<Record<languagesExamples, CodigoEjemplo>>({
        "C": { explicacion_codigo: "", codigo: "" },
        "C++": { explicacion_codigo: "", codigo: "" },
        "Python": { explicacion_codigo: "", codigo: "" },
        "JavaScript": { explicacion_codigo: "", codigo: "" },
        "Java": { explicacion_codigo: "", codigo: "" },
        "C#": { explicacion_codigo: "", codigo: "" }
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
    const [loadingModule, setLoadingModule] = useState<boolean>(true);
    const [languages, setLanguages] = useState<languagesExamples>("C");

    const handleCodigoChange = (lenguaje: languagesExamples, field: 'explicacion_codigo' | 'codigo', value: string) => {
        setEjemplosCodigos(prev => ({
            ...prev,
            [languages]: {
                ...prev[lenguaje],
                [field]: value,
            }
        }));
    }

    // Cargar los cursos disponibles
    const getAllCoursesData = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            console.error("No hay token disponible");
            setLoadingCourses(false);
            return;
        }

        setLoadingCourses(true);
        const result = await getAllCourses(token);
        
        if (result.error) {
            console.error("Error al cargar cursos:", result.error);
        } else if (result.data) {
            setCourses(result.data);
        }
        
        setLoadingCourses(false);
    };

    // Cargar los datos del módulo a editar
    const fetchModuleData = async () => {
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

        if (!token || !idModulo) {
            console.error("No hay token o ID del módulo");
            setLoadingModule(false);
            return;
        }

        try {
            setLoadingModule(true);
            const response = await fetch(`http://localhost:3000/modulo/get/${idModulo}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener el módulo");
            }

            const data = await response.json();
            
            // Cargar los datos del módulo en el formulario
            setForm({
                curso: data.id_curso.toString(),
                orden: data.orden,
                titulo: data.titulo,
                descripcion: data.descripcion || "",
                contenido: data.contenido_teorico || ""
            });

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
        } catch (error) {
            console.error("Error al cargar el módulo:", error);
            alert("No se pudo cargar el módulo");
        } finally {
            setLoadingModule(false);
        }
    };

    // Cargar cursos y módulo al montar el componente
    useEffect(() => {
        getAllCoursesData();
        fetchModuleData();
    }, [idModulo]);

    // Función que maneja los cambios de los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((previousState) => ({
            ...previousState,
            [name]: name === "orden" ? Math.max(1, Number(value)) : value
        }));
    };

    // Función que maneja la actualización del módulo
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No hay token de autenticación');
                return;
            }

            const response = await fetch(`http://localhost:3000/modulo/update/${idModulo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    titulo: form.titulo,
                    descripcion: form.descripcion,
                    contenido_teorico: form.contenido,
                    orden: form.orden,
                    id_curso: Number(form.curso),
                    codigo_ejemplo: ejemplosCodigos
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error al actualizar módulo:', data.error);
                alert(`Error: ${data.error}`);
                return;
            }

            console.log('Módulo actualizado exitosamente:', data);
            alert('Módulo actualizado exitosamente');
            
            navigate('/modules-admin');

        } catch (error) {
            console.error('Error de conexión:', error);
            alert('Error al conectar con el servidor');
        }
    };

    // Función que cancela la operación
    const handleCancel = () => {
        navigate("/modules-admin");
    };

    if (loadingModule || loadingCourses) {
        return (
            <main className="page-edit-module">
                <p>Cargando datos del módulo...</p>
            </main>
        );
    }

    return (
        <main className="page-edit-module">
            <header className="header-admin-pages">
                <button
                    className="button-back-modules"
                    onClick={() => navigate("/modules-admin")}>
                    <ArrowLeftStroke />
                    Volver a los módulos
                </button>
            </header>
            <form onSubmit={handleSubmit} className="form-edit-module">
                <header className="header-edit-module">
                    <h1>Editar Módulo</h1>
                    <p>Modifica la información del módulo de aprendizaje</p>
                </header>
                <section className="principal-info-module">
                    <header>
                        <h2> <BookOpen size="sm"/> Información Básica</h2>
                        <small>Datos generales del módulo</small>
                    </header>
                    <div className="more-info-container">
                        <div className="div-curso-select">
                            <label htmlFor="curso-select">Curso *</label>
                            <select
                                name="curso"
                                id="curso-select"
                                value={form.curso}
                                onChange={handleChange}
                                required
                                disabled={loadingCourses}>
                                <option value="">
                                    {loadingCourses ? "--Cargando cursos--" : "--Seleccionar curso--"}
                                </option>
                                {courses.map((course) => (
                                    <option key={course.id_curso} value={course.id_curso}>
                                        {course.titulo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="div-orden-module">
                            <label htmlFor="orden-modulo">Orden *</label>
                            <input
                                type="number"
                                name="orden"
                                min={1}
                                value={form.orden}
                                onChange={handleChange}
                                required/>
                        </div>
                    </div>
                    <div className="title-module">
                        <label htmlFor="title-module">Título del Módulo *</label>
                        <input
                            type="text"
                            name="titulo"
                            id="title-module"
                            placeholder="Define el título sobre que tratará el módulo"
                            value={form.titulo}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="description-module">
                        <label htmlFor="description-module">Descripción Breve *</label>
                        <textarea
                            name="descripcion"
                            id="description-module"
                            placeholder="Descripción corta que ayude a entender el concepto principal"
                            value={form.descripcion}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="content-module">
                        <label htmlFor="content-module">Contenido Teórico *</label>
                        <textarea
                            name="contenido" 
                            id="content-module"
                            placeholder="Desarrolla la teoría completa del módulo. Puedes usar saltos de línea para organizar el contenido"
                            value={form.contenido}
                            onChange={handleChange}
                            required/>
                    </div>
                </section>
                <FormCodesExamples
                    languages={languages}
                    setLanguages={setLanguages}
                    ejemplosCodigos={ejemplosCodigos}
                    handleCodigoChange={handleCodigoChange}
                />
                <div className="btns-options-module">
                    <button type="submit" className="button-edit-module">
                        <Save size="xs"/> Guardar Cambios
                    </button>
                    <button type="button" className="button-cancel-module" onClick={handleCancel}>
                        <X size="xs"/> Cancelar
                    </button>
                </div>
            </form>
        </main>
    );
}

interface FormCodesExamplesProps {
    languages: languagesExamples;
    setLanguages: React.Dispatch<React.SetStateAction<languagesExamples>>;
    ejemplosCodigos: Record<languagesExamples, CodigoEjemplo>;
    handleCodigoChange: (language: languagesExamples, field: 'explicacion_codigo' | 'codigo', value: string) => void;
}

function FormCodesExamples({ languages, setLanguages, ejemplosCodigos, handleCodigoChange }: FormCodesExamplesProps) {
    return (
        <div className="codes-examples">
            <header>
                <h2><Code size="sm"/> Ejemplos de Código</h2>
                <small>Agrega ejemplos en los 6 lenguajes soportados (0/6 completados)</small>
            </header>
            <div className="code-examples-buttons">
                {languagesList.map((lang) => (
                    <button
                        key={lang}
                        type="button"
                        className={`button-language ${lang === languages ? "selected" : ""}`}
                        onClick={() => setLanguages(lang)}
                    >
                        {lang}
                    </button>
                ))}
            </div>
            <section className="form-codes-examples">
                <div className="code-explain-container">
                    <label htmlFor="code-explain">Explicación teórica del {languages}</label>
                    <textarea
                        name="Explicacion Teorica Codigo" 
                        onChange={(e) => handleCodigoChange(languages, "explicacion_codigo", e.target.value)}
                        value={ejemplosCodigos[languages].explicacion_codigo}
                        id="code-explain"></textarea>
                </div>
                <div className="code-example-container">
                    <label htmlFor="code-example">Ejemplo de Código en {languages}</label>
                    <textarea
                        name="Ejemplo Codigo"
                        onChange={(e) => handleCodigoChange(languages, "codigo", e.target.value)}
                        value={ejemplosCodigos[languages].codigo}
                        id="code-example"></textarea>
                </div>
            </section>
        </div>
    );
}
