import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftStroke, BookOpen, Code, Save, X } from "@boxicons/react";
import { ModuloService } from "../../services/moduleService";
import { CourseService } from "../../services/courseService";
import Skeleton from "../../components/ui/Skeleton";
import "./EditModule.css";
import toast from "react-hot-toast";

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
        try {
            setLoadingCourses(true);
            const result = await CourseService.getAllCourses();
            setCourses(result);
        } catch (error: any) {
            console.error("Error al cargar cursos:", error);
        } finally {
            setLoadingCourses(false);
        }
    };

    // Cargar los datos del módulo a editar
    const fetchModuleData = async () => {
        // Mapa de conversión
        const lenguajeMapInverso: Record<string, languagesExamples> = {
            "C": "C",
            "C__": "C++",
            "Python": "Python",
            "JavaScript": "JavaScript",
            "Java": "Java",
            "C_": "C#"
        };

        if (!idModulo) {
            console.error("No hay ID del módulo");
            setLoadingModule(false);
            return;
        }

        try {
            setLoadingModule(true);
            const data = await ModuloService.getOneModule(Number(idModulo));
            
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
            const data = await ModuloService.updateModule(Number(idModulo), {
                titulo: form.titulo,
                descripcion: form.descripcion,
                contenido_teorico: form.contenido,
                orden: form.orden,
                id_curso: Number(form.curso),
                codigo_ejemplo: ejemplosCodigos
            });

            console.log('Módulo actualizado exitosamente:', data);
            toast.success('Módulo actualizado exitosamente');
            
            navigate('/modules-admin');

        } catch (error: any) {
            console.error('Error de conexión:', error);
            alert(`Error: ${error.message || 'Error al conectar con el servidor'}`);
        }
    };

    // Función que cancela la operación
    const handleCancel = () => {
        navigate("/modules-admin");
    };

    if (loadingModule || loadingCourses) {
        return (
            <SkeletonLoaderForm />
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
            <form onSubmit={handleSubmit} className="form-edit-module fade-in-skeleton">
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

function SkeletonLoaderForm() {
    const navigate = useNavigate();

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
            <div className="form-edit-module">
                {/* Sección 1: Información Básica */}
                <section className="principal-info-module">
                    <Skeleton width="35%" height={24} borderRadius={4} />
                    <Skeleton width="45%" height={14} borderRadius={4} />
                    <div className="more-info-container">
                        <Skeleton width={250} height={40} borderRadius={10} />
                        <Skeleton width={250} height={40} borderRadius={10} />
                    </div>
                    <Skeleton width="100%" height={40} borderRadius={10} />
                    <Skeleton width="100%" height={60} borderRadius={10} />
                    <Skeleton width="100%" height={150} borderRadius={10} />
                </section>
                {/* Sección 2: Ejemplos de Código */}
                <section className="codes-examples">
                    <Skeleton width="35%" height={24} borderRadius={4} />
                    <Skeleton width="50%" height={14} borderRadius={4} />
                    <div className="code-examples-buttons">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} height={30} borderRadius={20} />
                        ))}
                    </div>
                    <Skeleton width="100%" height={200} borderRadius={10} />
                    <Skeleton width="100%" height={200} borderRadius={10} />
                </section>
            </div>
        </main>
    );
}

function FormCodesExamples({ languages, setLanguages, ejemplosCodigos, handleCodigoChange }: FormCodesExamplesProps) {
    return (
        <div className="codes-examples fade-in-skeleton">
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
            <section className="form-codes-examples fade-in-skeleton">
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
