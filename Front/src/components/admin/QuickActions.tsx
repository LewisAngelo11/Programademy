import { BookOpen, FileDetail, ClipboardDetail, Plus } from "@boxicons/react";
import "./QuickActions.css";
import { useNavigate } from "react-router";

export default function QuickActions() {
    return (
        <section className="quick-actions">
            <header>
                <h2>Acciones Rápidas</h2>
            </header>
            <div className="modules-actions">
                <ManageCourses />
                <ManageModules />
                <ManageQuizzes />
            </div>
        </section>
    );
}

function ManageCourses() {
    const navigate = useNavigate();

    return (
        <article className="manage-courses">
            <div className="header-module">
                <BookOpen />
                <span>Gestionar Cursos</span>
            </div>
            <small>Crea, edita, o elimina cursos</small>
            <button
                className="button-manage-courses"
                onClick={() => navigate("/courses-admin")}>
                <Plus />
                Ver Cursos
            </button>
        </article>
    );
}

function ManageModules() {
    const navigate = useNavigate();

    return (
        <article className="manage-module">
            <div className="header-module">
                <FileDetail />
                <span>Gestionar Módulos</span>
            </div>
            <small>Administra contenido de módulos</small>
            <button
                className="button-manage-modules"
                onClick={() => navigate("/modules-admin")}>
                <Plus />
                Ver Módulos
            </button>
        </article>
    );
}

function ManageQuizzes() {
    const navigate = useNavigate();

    return (
        <article className="manage-quizzes">
            <div className="header-module">
                <ClipboardDetail />
                <span>Gestionar Quizzes</span>
            </div>
            <small>Crea y edita evaluaciones</small>
            <button
                className="button-manage-quizzes"
                onClick={() => navigate("/quizzes-admin")}>
                <Plus />
                Ver Quizzes
            </button>
        </article>
    );
}