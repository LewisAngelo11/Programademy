import { useNavigate } from "react-router";
import { ArrowLeftStroke, Pencil } from "@boxicons/react";
import Modal from "../../Modals/Modal";
import "./AdminProfile.css";
import { useEffect, useState } from "react";
import EditInfoAdmin from "../../components/admin/EditInfoAdmin";
import Skeleton from "../../components/ui/Skeleton";
import { UserService } from "../../services/userService";

export default function AdminProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [adminName, setAdminName] = useState<string>("");
    const [adminEmail, setAdminEmail] = useState<string>("");
    const [adminRegisterDate, setAdminRegisterDate] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const getInfoUser = async () => {
            try {
                setLoading(true);
                const dataUsuario = await UserService.getInfo();
                setAdminName(dataUsuario.nombre);
                setAdminEmail(dataUsuario.email);
                const dateFormat = dataUsuario.fecha_registro.split("T")[0];
                setAdminRegisterDate(dateFormat);
            } catch (err: any) {
                console.error(err);
                if (err.message?.includes("token") || err.message?.includes("autorizado")) {
                    localStorage.clear();
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

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
                        {loading ? (
                            <Skeleton width="180px" height="24px" />
                        ) : (
                            <>
                                <h2 className="name-admin fade-in-skeleton">{adminName}</h2>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="button-edit-info"
                                >
                                    <Pencil size="xs"/>
                                </button>
                            </>
                        )}
                    </div>
                    <div className="container">
                        <dl className="email-admin">
                            <dt>Correo Electrónico</dt>
                            <dd className="fade-in-skeleton">{loading ? <Skeleton width="180px" height="18px" /> : adminEmail}</dd>
                        </dl>
                        <dl className="register-date-admin">
                            <dt>Fecha de Registro</dt>
                            <dd className="fade-in-skeleton">{loading ? <Skeleton width="120px" height="18px" /> : adminRegisterDate}</dd>
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