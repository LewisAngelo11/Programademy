import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftStroke, BookOpen, Save, X, NetworkChart, Trash } from "@boxicons/react";
import { getAllModules } from "../../services/moduleServices";
import { createQuiz } from "../../services/quizServices";
import "./CreateQuiz.css";

type OpcionForm = {
    Texto: string;
    es_correcta: boolean;
    orden: number;
}

type PreguntaForm = {
    enunciado: string;
    orden: number;
    opcion: OpcionForm[];
}

type FormBasicInfo = {
    modulo: string;
    titulo: string;
    tiempo_limite_segundos: number;
    puntos_recompensa: number;
    preguntas: PreguntaForm[];
};

type Modulo = {
    id_modulo: number;
    titulo: string;
    curso: { titulo: string };
};

export default function CreateQuiz() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormBasicInfo>({
        modulo: "",
        titulo: "",
        tiempo_limite_segundos: 600,
        puntos_recompensa: 10,
        preguntas: [
            { enunciado: "", orden: 1, opcion: 
                [{ Texto: "", es_correcta: true, orden: 1 }]
            }]
    });

    const [modules, setModules] = useState<Modulo[]>([]);
    const [loadingModules, setLoadingModules] = useState<boolean>(true);

    // Controla los cambios del formulario, input, textarea o select
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            // Si "name" es uno de estos dos, convierte el valor a número
            [name]: name === "tiempo_limite_segundos" || name === "puntos_recompensa" 
            ? Math.max(0, Number(value)) : value // Se asegura que no sea negativo el valor númerico
        }));
    };

    const handlePreguntaChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const nuevasPreguntas = [...form.preguntas];
        nuevasPreguntas[index] = {
            ...nuevasPreguntas[index],
            [name]: value
        };
        setForm({ ...form, preguntas: nuevasPreguntas });
    };

    const handleOpcionChange = (pIndex: number, oIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const nuevasPreguntas = [...form.preguntas];
        const nuevasOpciones = [...nuevasPreguntas[pIndex].opcion];
        
        nuevasOpciones[oIndex] = {
            ...nuevasOpciones[oIndex],
            [name]: type === 'checkbox' ? checked : value
        };

        // Si esta respuesta es marcada como correcta, desmarcar las demás
        if (type === 'checkbox' && checked) {
            nuevasOpciones.forEach((op, idx) => {
                if (idx !== oIndex) op.es_correcta = false;
            });
        }

        nuevasPreguntas[pIndex].opcion = nuevasOpciones;
        setForm({ ...form, preguntas: nuevasPreguntas });
    };

    const agregarPregunta = () => {
        setForm(prev => ({
            ...prev,
            preguntas: [...prev.preguntas, {
                enunciado: "",
                orden: prev.preguntas.length + 1,
                opcion: [{ Texto: "", es_correcta: true, orden: 1 }]
            }]
        }));
    };

    const eliminarPregunta = (index: number) => {
        if(form.preguntas.length <= 1) return;
        setForm(prev => {
            const nuevas = [...prev.preguntas];
            // Elimina la pregunta específica con su índice
            nuevas.splice(index, 1);
            // Aqui re-ordena las preguntas una vez ya eliminadas
            nuevas.forEach((p, index) => p.orden = index + 1);

            return { ...prev, preguntas: nuevas };
        });
    };

    const agregarOpcion = (preguntaIndex: number) => {
        setForm(prev => {
            const nuevasPreguntas = [...prev.preguntas];
            // Esto es para tener un límite de orden en las opciones
            const maxOrden = nuevasPreguntas[preguntaIndex].opcion.length;
            // Agrega una nueva opción a la pregunta
            nuevasPreguntas[preguntaIndex].opcion.push(
                { Texto: "", es_correcta: false, orden: maxOrden + 1 }
            );
            return { ...prev, preguntas: nuevasPreguntas };
        });
    };

    const eliminarOpcion = (pIndex: number, oIndex: number) => {
        setForm(prev => {
            const nuevasPreguntas = [...prev.preguntas];
            if(nuevasPreguntas[pIndex].opcion.length <= 1) return prev;
            nuevasPreguntas[pIndex].opcion.splice(oIndex, 1);
            // Re-ordenar
            nuevasPreguntas[pIndex].opcion.forEach((o, idx) => o.orden = idx + 1);
            // Validar que exista al menos una verdadera si se borró la verdadera
            if (!nuevasPreguntas[pIndex].opcion.some(o => o.es_correcta)) {
                nuevasPreguntas[pIndex].opcion[0].es_correcta = true;
            }
            return { ...prev, preguntas: nuevasPreguntas };
        });
    };

    // Función que hace el POST al back
    const handleSubmit = async () => {
        // Validaciones básicas
        if (!form.modulo || !form.titulo) {
            alert('Por favor completa los campos principales');
            return;
        }

        const bodyCreateQuiz = {
            titulo: form.titulo,
            id_modulo: Number(form.modulo),
            tiempo_limite_segundos: Number(form.tiempo_limite_segundos),
            puntos_recompensa: Number(form.puntos_recompensa),
            pregunta: form.preguntas
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No hay token de autenticación');
                navigate('/login');
                return;
            }

            await createQuiz(token, bodyCreateQuiz);
            
            alert('Quiz creado exitosamente');
            navigate('/quizzes-admin');

        } catch (error) {
            console.error('Error al crear el quiz:', error);
            alert('Error al conectar con el servidor: ' + error);
        }
    };

    const handleCancel = () => {
        navigate("/quizzes-admin");
    };

    useEffect(() => {
        // Cargar los módulos
        const fetchModules = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoadingModules(true);
                const data = await getAllModules(token);
                setModules(data);
            } catch (err) {
                console.error("Error al cargar módulos:", err);
            } finally {
                setLoadingModules(false);
            }
        };

        fetchModules();
    }, []);

    return (
        <main className="page-create-quiz">
            <header className="header-admin-pages">
                <button
                    className="button-back-modules"
                    onClick={() => navigate("/quizzes-admin")}>
                    <ArrowLeftStroke />
                    Volver a los quizzes
                </button>
            </header>
            <form action={handleSubmit} className="form-create-quiz">
                <header className="header-create-quiz">
                    <h1>Nuevo Quiz</h1>
                    <p>Crea un nuevo quiz de práctica o evaluación</p>
                </header>
                
                <section className="principal-info-quiz">
                    <header>
                        <h2> <BookOpen size="sm"/> Información Básica</h2>
                        <small>Configuración general del quiz</small>
                    </header>
                    <div className="more-info-container">
                        <div className="title-quiz">
                            <label htmlFor="title-quiz">Título del Quiz *</label>
                            <input
                                type="text"
                                name="titulo"
                                id="title-quiz"
                                placeholder="Ej. Evaluación de Tipos de Datos C++"
                                value={form.titulo}
                                onChange={handleChange}
                                required/>
                        </div>
                        <div className="div-modulo-select">
                            <label htmlFor="modulo-select">Módulo Destino *</label>
                            <select
                                name="modulo"
                                id="modulo-select"
                                value={form.modulo}
                                onChange={handleChange}
                                required>
                                <option value="">
                                    {loadingModules ? "--Cargando módulos--" : "--Seleccionar módulo--"}
                                </option>
                                {modules.map((mod) => (
                                    <option key={mod.id_modulo} value={mod.id_modulo}>
                                        {mod.titulo} ({mod.curso?.titulo || "Ref"})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="more-data-quiz">
                            <div className="div-tiempo-quiz">
                                <label htmlFor="tiempo-quiz">Límite (Segundos) *</label>
                                <input
                                    type="number"
                                    name="tiempo_limite_segundos"
                                    min={0}
                                    value={form.tiempo_limite_segundos}
                                    onChange={handleChange}
                                    required/>
                            </div>
                            <div className="div-puntos-quiz">
                                <label htmlFor="puntos-quiz">Recompensa (Pts) *</label>
                                <input
                                    type="number"
                                    name="puntos_recompensa"
                                    min={0}
                                    value={form.puntos_recompensa}
                                    onChange={handleChange}
                                    required/>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Sección de preguntas del quiz */}
                <section className="questions-quiz-section">
                    <header>
                        <h2> <NetworkChart size="sm"/> Preguntas Dinámicas</h2>
                        <small>Estructura las preguntas y opciones de tu quiz</small>
                    </header>
                    {form.preguntas.map((pregunta, preguntaIndex) => (
                        <section key={preguntaIndex} className="question-item">
                            <header className="question-header">
                                <h3>Pregunta {preguntaIndex + 1}</h3>
                                {form.preguntas.length > 1 && (
                                    <button type="button" className="btn-remove-question" onClick={() => eliminarPregunta(preguntaIndex)}>
                                        <Trash className="delete-question-btn"/>
                                    </button>
                                )}
                            </header>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                                <label>Enunciado *</label>
                                <textarea
                                    name="enunciado"
                                    placeholder="Ingrese la pregunta a responder"
                                    value={pregunta.enunciado}
                                    onChange={(e) => handlePreguntaChange(preguntaIndex, e)}
                                    required
                                    style={{ minHeight: '60px'}}
                                />
                            </div>
                            <div className="options-list">
                                <label style={{ display: 'block', margin: '1rem 0 0.5rem', fontWeight:'unset', color: 'gray' }}>
                                    Opciones (Marca la correcta)
                                </label>
                                {pregunta.opcion.map((op, oIndex) => (
                                    <div key={oIndex} className="option-item">
                                        <input 
                                            type="checkbox" 
                                            name="es_correcta"
                                            className="checkbox-option"
                                            title="Marcar como Correcta"
                                            checked={op.es_correcta}
                                            onChange={(e) => handleOpcionChange(preguntaIndex, oIndex, e)}
                                        />
                                        <input 
                                            type="text" 
                                            name="Texto" 
                                            className="option-text"
                                            placeholder={`Opción ${oIndex + 1}`}
                                            value={op.Texto}
                                            onChange={(e) => handleOpcionChange(preguntaIndex, oIndex, e)}
                                            required
                                        />
                                        <button type="button" className="btn-remove-option" onClick={() => eliminarOpcion(preguntaIndex, oIndex)} title="Quitar opción">
                                            <X size="xs" />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn-add-option" onClick={() => agregarOpcion(preguntaIndex)}>
                                    + Agregar Opción
                                </button>
                            </div>
                        </section>
                    ))}

                    <button type="button" className="btn-add-question" onClick={agregarPregunta}>
                        + Agregar Otra Pregunta
                    </button>
                </section>

                <div className="btns-options-quiz">
                    <button type="submit" className="button-create-quiz"><Save size="xs"/> Crear Quiz</button>
                    <button type="button" className="button-cancel-quiz" onClick={handleCancel}><X size="xs"/> Cancelar</button>
                </div>
            </form>
        </main>
    );
}
