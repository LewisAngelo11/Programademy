import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftStroke, BookOpen, Code, Save, X } from "@boxicons/react";
import getAllCourses from "../../services/getCourses";
import "./CreateModule.css";

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
};

// Lista dinámica para mostrar dinámicamente los botones de los lenguajes disponibles
const languagesList: languagesExamples[] = ["C", "C++", "Python", "JavaScript", "Java", "C#"];

export default function CreateModule() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormBasicInfo>({
        curso: "",
        orden: 1,
        titulo: "",
        descripcion: "",
        contenido: ""
    });

    // State para manejar los ejemplos de códigos
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
    const [languages, setLanguages] = useState<languagesExamples>("C");

    // Función que maneja loc cambios de los inputs, select y textarea en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Actualiza los valores del formualrio dinámicamente
        setForm((previousState) => ({
            ...previousState,
            [name]: name === "orden" ? Math.max(1, Number(value)) : value
        }));
    };
    
    const handleCodigoChange = (language: languagesExamples, field: 'explicacion_codigo' | 'codigo', value: string) => {
        setEjemplosCodigos(prev => ({
            ...prev,
            [language]: {
                ...prev[language],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const API_URL = "http://localhost:3000/modulo/create";

        const bodyCreateModule = {
            titulo: form.titulo,
            descripcion: form.descripcion,
            contenido_teorico: form.contenido,
            orden: form.orden,
            id_curso: Number(form.curso),
            codigo_ejemplo: ejemplosCodigos
        }

        try {
            const token = localStorage.getItem('token'); // O donde guardes tu JWT

            if (!token) {
                console.error('No hay token de autenticación');
                navigate('/');
                return;
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyCreateModule)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error al crear módulo:', data.error);
                alert(`Error: ${data.error}`);
                return;
            }
            console.log('Módulo creado exitosamente:', data);
            alert('Módulo creado exitosamente');
            
            // Limpiar formulario
            setForm({
                curso: "",
                orden: 1,
                titulo: "",
                descripcion: "",
                contenido: ""
            });

            // Redirigir a la lista de módulos
            navigate('/modules-admin');

        } catch (error) {
            console.error('Error de conexión:', error);
            alert('Error al conectar con el servidor');
        }
    };

    // Función que cancela la operación
    const handleCancel = () => {
        setForm({
            curso: "",
            orden: 1,
            titulo: "",
            descripcion: "",
            contenido: ""
        });

        navigate("/modules-admin");
    };

    const getALlCourses = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate("/")
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

    // Cargar cursos al montar el componente
    useEffect(() => {
        getALlCourses();
    }, []);

    return (
        <main className="page-create-module">
            <header className="header-admin-pages">
                <button
                    className="button-back-modules"
                    onClick={() => navigate("/modules-admin")}>
                    <ArrowLeftStroke />
                    Volver a los módulos
                </button>
            </header>
            <form onSubmit={handleSubmit} className="form-create-module">
                <header className="header-create-module">
                    <h1>Nuevo Módulo</h1>
                    <p>Crea un nuevo módulo de aprendizaje</p>
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
                                onChange={handleChange}>
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
                    <button type="submit" className="button-create-module"><Save size="xs"/> Crear Módulo</button>
                    <button type="button" className="button-cancel-module" onClick={handleCancel}><X size="xs"/> Cancelar</button>
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
                <small>
                    Agrega ejemplos en los 6 lenguajes soportados
                    ({Object.values(ejemplosCodigos).filter(ej => ej.codigo.trim() !== "").length}/6 completados)
                </small>
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
                        id="code-explain"
                        onChange={(e) => handleCodigoChange(languages, 'explicacion_codigo', e.target.value)}
                        value={ejemplosCodigos[languages].explicacion_codigo}
                        placeholder="Ingrese la explicación teórica del código en este lenguaje."></textarea>
                </div>
                <div className="code-example-container">
                    <label htmlFor="code-example">Ejemplo de Código en {languages}</label>
                    <textarea
                        name="Ejemplo Codigo"
                        id="code-example"
                        value={ejemplosCodigos[languages].codigo}
                        onChange={(e) => handleCodigoChange(languages, 'codigo', e.target.value)}
                        placeholder="Ingrese el ejemplo del código en este lenguaje."></textarea>
                </div>
            </section>
        </div>
    );
}