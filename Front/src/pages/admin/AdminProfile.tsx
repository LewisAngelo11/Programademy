import { useNavigate } from "react-router";
import { ArrowLeftStroke, Pencil } from "@boxicons/react";
import Modal from "../../Modals/Modal";
import "./AdminProfile.css"
import { useEffect, useState } from "react";
import EditInfoAdmin from "../../components/admin/EditInfoAdmin";

export default function AdminProfile() {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [adminRegisterDate, setAdminRegisterDate] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const getInfoUser = async () => {
            const API_URL = 'http://localhost:3000/usuario/info';
            const token = localStorage.getItem("token");

            try {
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
                setAdminRegisterDate(dataUsuario.fecha_registro);
            } catch (err) {
                console.error();
            }
        }

        getInfoUser();
    }, []);

    return (
        <main className="admin-profile-page">
            <header className="header-admin-profile">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/admin/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="info-admin-profile">
                <header className="header-info-student">
                    <h1>Perfil de Administrador</h1>
                    <p>Datos personales del usuario</p>
                </header>
                <div className="info-admin-container">
                    <div className="container">
                        <h2 className="name-admin">{adminName}</h2>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="button-edit-info"
                        >
                            <Pencil size="xs"/>
                        </button>
                    </div>
                    <div className="container">
                        <dl className="email-admin">
                            <dt>Correo Electrónico</dt>
                            <dd>{adminEmail}</dd>
                        </dl>
                        <dl className="register-date-admin">
                            <dt>Fecha de Registro</dt>
                            <dd>{adminRegisterDate}</dd>
                        </dl>
                    </div>
                </div>
            </section>
            {openModal && <Modal children={
                    <EditInfoAdmin
                        adminName={adminName}
                        setAdminName={setAdminName}
                        adminEmail={adminEmail}
                        setAdminEmail={setAdminEmail}
                        setOpenModal={setOpenModal}
                        />
                } setOpenModal={setOpenModal}/>}
        </main>
    );
}