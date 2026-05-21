import "./ResumeDashboard.css"
import { BookOpen, FileDetail, ClipboardDetail } from "@boxicons/react"; 

interface TotalCursosProp {
    totalCursos: number;
}

interface TotalModulosProp {
    totalModulos: number;
}

interface TotalQuizzesProp {
    totalQuizzes: number;
}

export default function ResumeDashboard({ totalCursos, totalModulos, totalQuizzes }: TotalCursosProp & TotalModulosProp & TotalQuizzesProp) {
    return(
        <section className="resume-dashboard">
            <TotalCourses totalCursos={totalCursos}/>
            <TotalModules totalModulos={totalModulos}/>
            <TotalQuizzes totalQuizzes={totalQuizzes}/>
        </section>
    );
}

function TotalCourses({totalCursos}: TotalCursosProp) {
    return(
        <article className="total-courses">
            <header>
                <span>Total de Cursos</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div>
                <span className="counter-courses">{totalCursos}</span>
                <small>Cursos activos</small>
            </div>
        </article>
    );
}

function TotalModules({ totalModulos }: TotalModulosProp) {
    return(
        <article className="total-modules">
            <header>
                <span>Total de Módulos</span>
                <FileDetail fill="#00b20a"/>
            </header>
            <div>
                <span className="counter-modules">{totalModulos}</span>
                <small>Módulo creados</small>
            </div>
        </article>
    );
}

function TotalQuizzes({ totalQuizzes }: TotalQuizzesProp) {
    return(
        <article className="total-quizzes">
            <header>
                <span>Total de Quizzes</span>
                <ClipboardDetail fill="#d0b800" />
            </header>
            <div>
                <span className="counter-quizzes">{totalQuizzes}</span>
                <small>Evaluaciones disponibles</small>
            </div>
        </article>
    );
}