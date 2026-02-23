import "./ResumeDashboard.css"
import { BookOpen, FileDetail, ClipboardDetail } from "@boxicons/react"; 

export default function ResumeDashboard() {
    return(
        <section className="resume-dashboard">
            <TotalCourses/>
            <TotalModules/>
            <TotalQuizzes/>
        </section>
    );
}

function TotalCourses() {
    return(
        <article className="total-courses">
            <header>
                <span>Total de Cursos</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div>
                <span className="counter-courses">0</span>
                <small>Cursos activos</small>
            </div>
        </article>
    );
}

function TotalModules() {
    return(
        <article className="total-modules">
            <header>
                <span>Total de Módulos</span>
                <FileDetail fill="#00b20a"/>
            </header>
            <div>
                <span className="counter-modules">0</span>
                <small>Módulo creados</small>
            </div>
        </article>
    );
}

function TotalQuizzes() {
    return(
        <article className="total-quizzes">
            <header>
                <span>Total de Quizzes</span>
                <ClipboardDetail fill="#d0b800" />
            </header>
            <div>
                <span className="counter-quizzes">0</span>
                <small>Evaluaciones disponibles</small>
            </div>
        </article>
    );
}