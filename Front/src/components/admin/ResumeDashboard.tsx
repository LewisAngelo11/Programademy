import "./ResumeDashboard.css";
import { BookOpen, FileDetail, ClipboardDetail } from "@boxicons/react"; 
import Skeleton from "../ui/Skeleton";

interface TotalCursosProp {
    totalCursos: number;
}

interface TotalModulosProp {
    totalModulos: number;
}

interface TotalQuizzesProp {
    totalQuizzes: number;
}

interface LoadingProp {
    loading?: boolean;
}

export default function ResumeDashboard({ totalCursos, totalModulos, totalQuizzes, loading }: TotalCursosProp & TotalModulosProp & TotalQuizzesProp & LoadingProp) {
    return(
        <section className="resume-dashboard">
            <TotalCourses totalCursos={totalCursos} loading={loading} />
            <TotalModules totalModulos={totalModulos} loading={loading} />
            <TotalQuizzes totalQuizzes={totalQuizzes} loading={loading} />
        </section>
    );
}

function TotalCourses({ totalCursos, loading }: TotalCursosProp & LoadingProp) {
    return(
        <article className="total-courses">
            <header>
                <span>Total de Cursos</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="45px" height="28px" />
                        <Skeleton width="100px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="counter-courses">{totalCursos}</span>
                        <small>Cursos activos</small>
                    </>
                )}
            </div>
        </article>
    );
}

function TotalModules({ totalModulos, loading }: TotalModulosProp & LoadingProp) {
    return(
        <article className="total-modules">
            <header>
                <span>Total de Módulos</span>
                <FileDetail fill="#00b20a"/>
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="45px" height="28px" />
                        <Skeleton width="100px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="counter-modules">{totalModulos}</span>
                        <small>Módulos creados</small>
                    </>
                )}
            </div>
        </article>
    );
}

function TotalQuizzes({ totalQuizzes, loading }: TotalQuizzesProp & LoadingProp) {
    return(
        <article className="total-quizzes">
            <header>
                <span>Total de Quizzes</span>
                <ClipboardDetail fill="#d0b800" />
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="45px" height="28px" />
                        <Skeleton width="100px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="counter-quizzes">{totalQuizzes}</span>
                        <small>Evaluaciones disponibles</small>
                    </>
                )}
            </div>
        </article>
    );
}