import { useEffect, useState } from "react";
import HeaderStudentDashboard from "../../components/student/HeaderStudentDashboard";
import "./StudentDashboard.css";
import ResumeHome from "../../components/student/ResumeHome";

export default function StudentDashboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");

    useEffect(() => {
        const getInfoUser = async () => {
            const API_URL = 'http://localhost:3000/usuario/info';
            const token = localStorage.getItem("token");

            try {
                setLoading(true);
    
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
    
                const dataUsuario = await response.json();
                setStudentName(dataUsuario.nombre);
                setStudentEmail(dataUsuario.email);
            } catch (err) {
                console.error();
            } finally {
                setLoading(false);
            }
        }

        getInfoUser();
    }, []);

    return(
        <main className="student-dashboard-page">
            <HeaderStudentDashboard
                studentName={studentName}
                studentEmail={studentEmail}
                loading={loading}
            />
            <ResumeHome/>
        </main>
    );
}