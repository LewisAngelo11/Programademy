import HeaderAdminDashboard from "../../components/admin/HeaderAdminDashboard";
import ResumeDashboard from "../../components/admin/ResumeDashboard";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css"
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const idUsuario = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");

    useEffect(() => {
            const getInfoUser = async () => {
                const API_URL = 'http://localhost:3000/usuario/info';
                const token = localStorage.getItem("token");
    
                try {
                    setLoading(true);
    
                    console.log(idUsuario.id);
    
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
                    setAdminName(dataUsuario.nombre);
                    setAdminEmail(dataUsuario.email);
                } catch (err) {
                    console.error();
                } finally {
                    setLoading(false);
                }
            }
    
            getInfoUser();
        }, []);
    
    return(
        <main className="admin-dashboard-page">
            <HeaderAdminDashboard 
                adminName={adminName}
                adminEmail={adminEmail}
                loading={loading}
            />
            <ResumeDashboard/>
            <QuickActions/>
        </main>
    );
}