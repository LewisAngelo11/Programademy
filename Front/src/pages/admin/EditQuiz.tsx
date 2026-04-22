import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftStroke, BookOpen, Save, X, NetworkChart, Trash } from "@boxicons/react";
import { getAllModules } from "../../services/moduleServices";
import { getOneQuiz, updateQuiz } from "../../services/quizServices";
import "./EditQuiz.css";

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

export default function EditQuiz() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [form, setForm] = useState<FormBasicInfo>({
        modulo: "",
        titulo: "",
        tiempo_limite_segundos: 600, 
        puntos_recompensa: 10,
        preguntas: [{ enunciado: "", orden: 1, opcion: [{ Texto: "", es_correcta: true, orden: 1 }] }]
    });

    const [modules, setModules] = useState<Modulo[]>([]);
    const [loadingModules, setLoadingModules] = useState<boolean>(true);
    const [loadingQuiz, setLoadingQuiz] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "tiempo_limite_segundos" || name === "puntos_recompensa" ? Math.max(0, Number(value)) : value
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
            nuevas.splice(index, 1);
            nuevas.forEach((p, idx) => p.orden = idx + 1);
            return { ...prev, preguntas: nuevas };
        });
    };

    const agregarOpcion = (pIndex: number) => {
        setForm(prev => {
            const nuevasPreguntas = [...prev.preguntas];
            const maxOrden = nuevasPreguntas[pIndex].opcion.length;
            nuevasPreguntas[pIndex].opcion.push({ Texto: "", es_correcta: false, orden: maxOrden + 1 });
            return { ...prev, preguntas: nuevasPreguntas };
        });
    };

    const eliminarOpcion = (pIndex: number, oIndex: number) => {
        setForm(prev => {
            const nuevasPreguntas = [...prev.preguntas];
            if(nuevasPreguntas[pIndex].opcion.length <= 1) return prev;
            nuevasPreguntas[pIndex].opcion.splice(oIndex, 1);
            nuevasPreguntas[pIndex].opcion.forEach((o, idx) => o.orden = idx + 1);
            if (!nuevasPreguntas[pIndex].opcion.some(o => o.es_correcta)) {
                nuevasPreguntas[pIndex].opcion[0].es_correcta = true;
            }
            return { ...prev, preguntas: nuevasPreguntas };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.modulo || !form.titulo) {
            alert('Por favor completa los campos principales');
            return;
        }

        const bodyUpdateQuiz = {
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
                navigate('/');
                return;
            }

            await updateQuiz(token, Number(id), bodyUpdateQuiz);
            
            alert('Quiz actualizado exitosamente');
            navigate('/quizzes-admin');

        } catch (error) {
            console.error('Error al actualizar el quiz:', error);
            alert('Error al conectar con el servidor: ' + error);
        }
    };

    const handleCancel = () => {
        navigate("/quizzes-admin");
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = localStorage.getItem("token");
            if (!token || !id) {
                navigate("/");
                return;
            }

            try {
                setLoadingModules(true);
                setLoadingQuiz(true);

                // Fetch modules
                const modulesData = await getAllModules(token);
                setModules(modulesData);
                setLoadingModules(false);

                // Fetch quiz data
                const quizData = await getOneQuiz(token, Number(id));
                if (quizData) {
                    setForm({
                        modulo: quizData.id_modulo?.toString() || "",
                        titulo: quizData.titulo || "",
                        tiempo_limite_segundos: quizData.tiempo_limite_segundos || 600,
                        puntos_recompensa: quizData.puntos_recompensa || 10,
                        preguntas: quizData.pregunta && quizData.pregunta.length > 0 ? quizData.pregunta.map((p: any) => ({
                            enunciado: p.enunciado,
                            orden: p.orden,
                            opcion: p.opcion && p.opcion.length > 0 ? p.opcion.map((o: any) => ({
                                Texto: o.Texto,
                                es_correcta: o.es_correcta,
                                orden: o.orden
                            })) : [{ Texto: "", es_correcta: true, orden: 1 }]
                        })) : [{ enunciado: "", orden: 1, opcion: [{ Texto: "", es_correcta: true, orden: 1 }] }]
                    });
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
                alert("No se pudo cargar la información del quiz");
            } finally {
                setLoadingQuiz(false);
            }
        };

        fetchInitialData();
    }, [id, navigate]);

    if(loadingQuiz) {
        return (
            <main className="page-edit-quiz">
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando datos del quiz...</p>
            </main>
        )
    }

    return (
        <main className="page-edit-quiz">
            <header className="header-admin-pages">
                <button
                    className="button-back-modules"
                    onClick={() => navigate("/quizzes-admin")}>
                    <ArrowLeftStroke />
                    Volver a los quizzes
                </button>
            </header>
            <form onSubmit={handleSubmit} className="form-edit-quiz">
                <header className="header-edit-quiz">
                    <h1>Editar Quiz</h1>
                    <p>Modifica el cuestionario de validación para un módulo de aprendizaje</p>
                </header>

                <section className="principal-info-quiz">
                    <header>
                        <h2> <BookOpen size="sm"/> Información Básica</h2>
                        <small>Datos generales del quiz</small>
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

                <section className="questions-quiz-section">
                    <header>
                        <h2> <NetworkChart size="sm"/> Preguntas Dinámicas</h2>
                        <small>Estructura las preguntas y opciones de tu quiz</small>
                    </header>
                    
                    {form.preguntas.map((pregunta, pIndex) => (
                        <div key={pIndex} className="question-item">
                            <div className="question-header">
                                <h3>Pregunta {pIndex + 1}</h3>
                                {form.preguntas.length > 1 && (
                                    <button type="button" className="btn-remove-question" onClick={() => eliminarPregunta(pIndex)}>
                                        <Trash className="delete-question-btn"/>
                                    </button>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label>Enunciado *</label>
                                <textarea
                                    name="enunciado"
                                    placeholder="Cúal es la complejidad de..."
                                    value={pregunta.enunciado}
                                    onChange={(e) => handlePreguntaChange(pIndex, e)}
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
                                            onChange={(e) => handleOpcionChange(pIndex, oIndex, e)}
                                        />
                                        <input 
                                            type="text" 
                                            name="Texto"
                                            className="option-text"
                                            placeholder={`Opción ${oIndex + 1}`}
                                            value={op.Texto}
                                            onChange={(e) => handleOpcionChange(pIndex, oIndex, e)}
                                            required
                                        />
                                        <button type="button" className="btn-remove-option" onClick={() => eliminarOpcion(pIndex, oIndex)} title="Quitar opción">
                                            <X size="xs" />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn-add-option" onClick={() => agregarOpcion(pIndex)}>
                                    + Agregar Opción
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="button" className="btn-add-question" onClick={agregarPregunta}>
                        + Agregar Otra Pregunta
                    </button>
                </section>

                <div className="btns-options-quiz">
                    <button type="submit" className="button-edit-quiz"><Save size="xs"/> Guardar Cambios</button>
                    <button type="button" className="button-cancel-quiz" onClick={handleCancel}><X size="xs"/> Cancelar</button>
                </div>
            </form>
        </main>
    );
}
