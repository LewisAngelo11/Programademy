import { BookOpen, Trophy, TrendingUp } from "@boxicons/react";
import "./ResumeHome.css";
import Skeleton from "../ui/Skeleton";

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

interface LoadingProp {
    loading?: boolean;
}

export default function ResumeHome({ totalStartedCourses, totalAviableCourses, totalAverage, quizCompleted, loading }: TotalStartedCoursesProp & TotalAviableCoursesProp & TotalAverageProp & QuizCompletedProp & LoadingProp) {
    return (
        <section className="resume-home">
            <StartedCourses totalAviableCourses={totalAviableCourses} totalStartedCourses={totalStartedCourses} loading={loading} />
            <TotalAverage totalAverage={totalAverage} loading={loading} />
            <CompletedQuizzes quizCompleted={quizCompleted} loading={loading} />
        </section>
    );
}

function StartedCourses({ totalStartedCourses, totalAviableCourses, loading }: TotalStartedCoursesProp & TotalAviableCoursesProp & LoadingProp) {
    return (
        <article className="started-courses">
            <header>
                <span>Cursos Iniciados</span>
                <BookOpen fill="#3e00ff"/>
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="45px" height="28px" />
                        <Skeleton width="115px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="counter-started-courses">{totalStartedCourses}</span>
                        <small>de {totalAviableCourses} disponibles</small>
                    </>
                )}
            </div>
        </article>
    );
}

function TotalAverage({ totalAverage, loading }: TotalAverageProp & LoadingProp) {
    return (
        <article className="total-average">
            <header>
                <span>Promedio General</span>
                <Trophy fill="#d0b800" />
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="60px" height="28px" />
                        <Skeleton width="115px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="average">{totalAverage}%</span>
                        <small>En quizzes evaluativos</small>
                    </>
                )}
            </div>
        </article>
    );
}

function CompletedQuizzes({ quizCompleted, loading }: QuizCompletedProp & LoadingProp) {
    return (
        <article className="completed-quizzes">
            <header>
                <span>Quizzes Completados</span>
                <TrendingUp fill="#00b20a" />
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                    <>
                        <Skeleton width="45px" height="28px" />
                        <Skeleton width="115px" height="14px" style={{ marginTop: "4px" }} />
                    </>
                ) : (
                    <>
                        <span className="completed-counter">{quizCompleted}</span>
                        <small>Evaluaciones realizadas</small>
                    </>
                )}
            </div>
        </article>
    );
}