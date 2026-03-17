import { useNavigate } from "react-router";
import { ArrowLeftStroke } from "@boxicons/react";
import "./HeaderAdminPages.css";

export default function HeaderAdminPages() {
    const navigate = useNavigate();

    return (
        <header className="header-admin-pages">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
    );
}