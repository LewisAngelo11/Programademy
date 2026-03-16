import { useNavigate } from "react-router";
import { ArrowLeftStroke } from "@boxicons/react";
import "./HeaderStudentsPages.css";

export default function HeaderStudentsPages() {
    const navigate = useNavigate();

    return (
        <header className="header-student-pages">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/student/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
    );
}