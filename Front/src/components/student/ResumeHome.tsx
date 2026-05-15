import { BookOpen, Trophy, TrendingUp } from "@boxicons/react";
import "./ResumeHome.css";

interface TotalStartedCoursesProp {
    totalStartedCourses: number;
}

interface TotalAviableCoursesProp {
    totalAviableCourses: number;
}

export default function ResumeHome({ totalStartedCourses, totalAviableCourses }: TotalStartedCoursesProp & TotalAviableCoursesProp) {
    return (
        <section className="resume-home">
            <StartedCourses totalAviableCourses={totalAviableCourses} totalStartedCourses={totalStartedCourses} />
            <TotalAverage/>
            <CompletedQuizzes/>
        </section>
    );
}

function StartedCourses({ totalStartedCourses, totalAviableCourses }: TotalStartedCoursesProp & TotalAviableCoursesProp) {
    return (
        <article className="started-courses">
            <header>
                <span>Cursos Iniciados</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div>
                <span className="counter-started-courses">{totalStartedCourses}</span>
                <small>de {totalAviableCourses} disponibles</small>
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