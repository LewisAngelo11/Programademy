import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getOneQuiz } from "../../services/quizServices";
import { ArrowLeftStroke, CheckCircle, InfoCircle } from "@boxicons/react";
import "./SolveQuiz.css";

interface Opcion {
    id_opcion: number;
    Texto: string;
    es_correcta: boolean;
    orden: number | null;
}

interface Pregunta {
    id_pregunta: number;
    id_quiz: number;
    enunciado: string;
    orden: number | null;
    opcion: Opcion[];
}

interface Quiz {
    id_quiz: number;
    id_modulo: number;
    titulo: string;
    tiempo_limite_segundos: number | null;
    puntos_recompensa: number | null;
    pregunta: Pregunta[];
}

export default function SolveQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isFinished, setIsFinished] = useState(false);

    // Use effect que se activa cuando id o navigate cambien
    useEffect(() => {
        const fetchQuiz = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                setLoading(true);
                const data = await getOneQuiz(token, Number(id));
                setQuiz(data);
            } catch (err: any) {
                setError(err.message || "Error al cargar el quiz");
            } finally {
                setLoading(false);
            }
        };

        // Si hay un id del quiz, llama la función
        if (id) {
            fetchQuiz();
        }
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="solve-quiz-page pulse-page">
                <div className="solve-quiz-loading">Cargando evaluación...</div>
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="solve-quiz-page">
                <main className="solve-quiz-card text-center slide-up">
                    <InfoCircle className="error-icon" size="lg" color="#ef4444" />
                    <h2 className="error-title">Ups.. algo salió mal</h2>
                    <p className="solve-quiz-error-text">{error || "No se encontró el quiz"}</p>
                    <button className="nav-button next mt-4" onClick={() => navigate(-1)}>Volver</button>
                </main>
            </div>
        );
    }

    const currentQuestion = quiz.pregunta[currentIndex];
    const totalQuestions = quiz.pregunta.length;
    const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

    const handleSelectOption = (id_pregunta: number, id_opcion: number) => {
        setAnswers({
            ...answers,
            [id_pregunta]: id_opcion
        });
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
            // Aquí en un futuro se podría enviar el intento al backend
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        quiz.pregunta.forEach((q) => {
            const selectedOptId = answers[q.id_pregunta];
            const option = q.opcion.find((o) => o.id_opcion === selectedOptId);
            if (option && option.es_correcta) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    };

    {/* Esto aparece cuando el estudiante finalizó el quiz */}
    if (isFinished) {
        const score = calculateScore();
        return (
            <div className="solve-quiz-page">
                <header className="header-solve-quiz">
                    <button
                        className="button-back-quiz"
                        onClick={() => navigate(-1)}>
                        <ArrowLeftStroke />
                            Volver al Curso
                        </button>
                </header>

                <main className="solve-quiz-card summary-container slide-up">
                    <div className="icon-wrapper">
                        <CheckCircle size="lg" color="#4f46e5" />
                    </div>
                    <h2>¡Evaluación Completada!</h2>
                    <div className="summary-score-container">
                        <div className="summary-score">
                            {score} / {totalQuestions}
                        </div>
                        <span className="summary-points">
                            {score === totalQuestions ? (`+${quiz.puntos_recompensa || 0} Pts`): "+0 Pts"}
                        </span>
                        {score < totalQuestions && (
                            <small style={{ color: "#10b981" }}>
                                Complete el quiz con excelencia para obtener los puntos
                            </small>
                        )}
                    </div>
                    <p className="summary-text">
                        Has respondido correctamente {score} de {totalQuestions} preguntas.
                    </p>
                    <button className="nav-button finish w-submit" onClick={() => navigate(-1)}>
                        Finalizar y Volver al Módulo
                    </button>
                </main>
            </div>
        );
    }

    // Asegurarse de que el quiz tenga al menos una pregunta antes de renderizar
    if (!currentQuestion) {
        return (
            <div className="solve-quiz-page">
                <main className="solve-quiz-card text-center slide-up">
                    <InfoCircle className="empty-icon" size="lg" color="#f59e0b" />
                    <h2>Aviso Importante</h2>
                    <p className="solve-quiz-error-text">Este quiz aún no tiene preguntas configuradas.</p>
                    <button className="nav-button next mt-4" onClick={() => navigate(-1)}>Volver al Módulo</button>
                </main>
            </div>
        );
    }

    return (
        <div className="solve-quiz-page">
            <header className="header-solve-quiz">
                <button
                    className="button-back-quiz"
                    onClick={() => navigate(-1)}>
                    <ArrowLeftStroke />
                    Volver al Curso
                </button>
            </header>

            <main className="solve-quiz-card slide-up">
                <div className="quiz-header">
                    <h1 className="quiz-title">Evaluación: {quiz.titulo}</h1>
                    <span className="quiz-progress-text">Pregunta {currentIndex + 1} de {totalQuestions}</span>
                </div>

                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill pulse"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                <div className="question-wrapper slide-fade" key={currentIndex}>
                    <h2 className="question-text">{currentQuestion.enunciado}</h2>

                    <div className="options-container">
                        {currentQuestion.opcion.map((opt) => {
                            const isSelected = answers[currentQuestion.id_pregunta] === opt.id_opcion;

                            return (
                                <button
                                    key={opt.id_opcion}
                                    className={`option-button ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSelectOption(currentQuestion.id_pregunta, opt.id_opcion)}
                                >
                                    <div className="option-radio">
                                        <div className="option-radio-dot"></div>
                                    </div>
                                    <span className="option-text">{opt.Texto}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="quiz-footer fade-in-delayed">
                    <button
                        className="nav-button prev"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        Anterior
                    </button>

                    <button
                        className={`nav-button ${currentIndex === totalQuestions - 1 ? 'finish' : 'next'}`}
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id_pregunta]} // Disable if empty
                    >
                        {currentIndex === totalQuestions - 1 ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            </main>
        </div>
    );
}