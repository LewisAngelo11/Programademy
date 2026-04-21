import HeaderAdminPages from "../../components/admin/HeaderAdminPages";
import { Plus, Pencil, Trash, Search } from "@boxicons/react";
import { useEffect, useState } from "react";
import "./AdminQuizzes.css";
import { useNavigate } from "react-router";
import { deleteQuiz, getAllQuizzes } from "../../services/quizServices";
import { getAllModules } from "../../services/moduleServices";

interface Quiz {
    id_quiz: number;
    titulo: string;
    tiempo_limite_segundos: number;
    puntos_recompensa: number;
    id_modulo: number;
    // Opcional, solo si el endpoint /quizzes/all devuelve información del módulo
    modulo?: {
        titulo: string;
    }
}

export default function AdminQuizzes() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filteredQuizzes = quizzes.filter(q =>
        q.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleQuizDeleted = (idQuiz: number) => {
        setQuizzes(prev => prev.filter(q => q.id_quiz !== idQuiz));
    };

    const fetchAllQuizzes = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/");
                return;
            }
            const data = await getAllQuizzes(token);
            setQuizzes(data);
        } catch (err) {
            setError('No se pudieron consultar los quizzes');
            console.error('Error al consultar los quizzes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllQuizzes();
    }, []);

    return (
        <main className="admin-quizzes-page">
            <HeaderAdminPages />
            <section className="admin-quizzes-section">
                <header className="header-quizzes-sections">
                    <div>
                        <h1>Gestión de Quizzes</h1>
                        <small>Administra las evaluaciones de los módulos educativos</small>
                    </div>
                    <button
                        className="add-new-quiz"
                        onClick={() => navigate("/quizzes/create")}>
                        <Plus size="xs" />
                        Nuevo Quiz
                    </button>
                </header>
                <div className="search-container">
                    <Search size="sm" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar quizzes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="quizzes-grid">
                    {loading && (
                        <div className="empty-state">Cargando quizzes...</div>
                    )}

                    {error && (
                        <div className="empty-state error">{error}</div>
                    )}

                    {!loading && !error && filteredQuizzes.length === 0 && quizzes.length > 0 && (
                        <div className="empty-state">No se encontraron quizzes</div>
                    )}

                    {filteredQuizzes.length > 0 && (quizzes.map(q => (
                        <QuizCard
                            key={q.id_quiz}
                            id_quiz={q.id_quiz}
                            titulo={q.titulo}
                            id_modulo={q.id_modulo}
                            puntos_recompensa={q.puntos_recompensa}
                            tiempo_limite_segundos={q.tiempo_limite_segundos}
                            moduloTitulo={q.modulo?.titulo}
                            onDelete={handleQuizDeleted}
                        />
                    )))}
                </div>
            </section>
        </main>
    );
}

interface QuizCardProps {
    id_quiz: number;
    titulo: string;
    id_modulo: number;
    puntos_recompensa: number;
    tiempo_limite_segundos: number;
    moduloTitulo?: string;
    onDelete?: (id: number) => void;
}

function QuizCard({ id_quiz, titulo, id_modulo, puntos_recompensa, tiempo_limite_segundos, moduloTitulo, onDelete }: QuizCardProps) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [moduleName, setModuleName] = useState(moduloTitulo || "");

    useEffect(() => {
        // En caso de que el quiz no incluya el titulo del módulo por defecto
        if (!moduloTitulo) {
            const fetchModuleName = async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const mods = await getAllModules(token);
                        const mod = mods.find((m: any) => m.id_modulo === id_modulo);
                        if (mod) setModuleName(mod.titulo);
                    } catch (e) {
                        // Fallback silencioso
                    }
                }
            }
            fetchModuleName();
        }
    }, [id_modulo, moduloTitulo]);

    const handleDelete = async () => {
        const confirmacion = window.confirm(
            `¿Estás seguro de que deseas eliminar el quiz "${titulo}"?`
        );

        if (!confirmacion) return;
        setIsDeleting(true);

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            throw new Error("No hay token de autenticación");
        }

        try {
            await deleteQuiz(token, id_quiz);
            alert('Quiz eliminado exitosamente');
            if (onDelete) onDelete(id_quiz);
        } catch (error) {
            console.error('Error al eliminar quiz:', error);
            alert(error instanceof Error ? error.message : 'Error al eliminar el quiz');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <article className="quiz-container">
            <div className="secundary-quiz-info">
                <span className="puntos-quiz">{puntos_recompensa} pts</span>
                <span className="modulo-quiz">Módulo: {moduleName || id_modulo}</span>
            </div>
            <div className="primary-quiz-info">
                <h2>{titulo}</h2>
                <small>{Math.floor(tiempo_limite_segundos / 60)} min {(tiempo_limite_segundos % 60) > 0 ? (tiempo_limite_segundos % 60) + "s" : ""}</small>
            </div>
            <div className="buttons-actions-quiz">
                <button
                    className="edit-btn"
                    onClick={() => navigate(`/quizzes/edit/${id_quiz}`)}
                >
                    <Pencil size="xs" />
                    Editar
                </button>
                <button
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    <Trash fill="#ff3b30" size="xs" />
                </button>
            </div>
        </article>
    );
}
