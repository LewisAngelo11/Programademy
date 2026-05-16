import { BookOpen, Trophy, TrendingUp } from "@boxicons/react";
import "./ResumeHome.css";

interface TotalStartedCoursesProp {
    totalStartedCourses: number;
}

interface TotalAviableCoursesProp {
    totalAviableCourses: number;
}

interface TotalAverageProp {
    totalAverage: number;
}

interface QuizCompletedProp {
    quizCompleted: number;
}

export default function ResumeHome({ totalStartedCourses, totalAviableCourses, totalAverage, quizCompleted }: TotalStartedCoursesProp & TotalAviableCoursesProp & TotalAverageProp & QuizCompletedProp) {
    return (
        <section className="resume-home">
            <StartedCourses totalAviableCourses={totalAviableCourses} totalStartedCourses={totalStartedCourses} />
            <TotalAverage totalAverage={totalAverage}/>
            <CompletedQuizzes quizCompleted={quizCompleted}/>
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

function TotalAverage({ totalAverage }: TotalAverageProp) {
    return (
        <article className="total-average">
            <header>
                <span>Promedio General</span>
                <Trophy fill="#d0b800" />
            </header>
            <div>
                <span className="average">{totalAverage}%</span>
                <small>En quizzes evaluativos</small>
            </div>
        </article>
    )
}

function CompletedQuizzes({ quizCompleted }: QuizCompletedProp) {
    return (
        <article className="completed-quizzes">
            <header>
                <span>Quizzes Completados</span>
                <TrendingUp fill="#00b20a" />
            </header>
            <div>
                <span className="completed-counter">{quizCompleted}</span>
                <small>Evaluaciones realizadas</small>
            </div>
        </article>
    );
}