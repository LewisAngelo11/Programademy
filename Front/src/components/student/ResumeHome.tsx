import { BookOpen, Trophy, TrendingUp } from "@boxicons/react";
import "./ResumeHome.css";

export default function ResumeHome() {
    return (
        <section className="resume-home">
            <StartedCourses/>
            <TotalAverage/>
            <CompletedQuizzes/>
        </section>
    );
}

function StartedCourses() {
    return (
        <article className="started-courses">
            <header>
                <span>Cursos Iniciados</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div>
                <span className="counter-started-courses">0</span>
                <small>de 0 disponibles</small>
            </div>
        </article>
    );
}

function TotalAverage() {
    return (
        <article className="total-average">
            <header>
                <span>Promedio General</span>
                <Trophy fill="#d0b800" />
            </header>
            <div>
                <span className="average">0%</span>
                <small>En quizzes evaluativos</small>
            </div>
        </article>
    )
}

function CompletedQuizzes() {
    return (
        <article className="completed-quizzes">
            <header>
                <span>Quizzes Completados</span>
                <TrendingUp fill="#00b20a" />
            </header>
            <div>
                <span className="completed-counter">0</span>
                <small>Evaluaciones realizadas</small>
            </div>
        </article>
    );
}