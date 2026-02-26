import { useNavigate } from "react-router";
import { ArrowLeftStroke, Pencil } from "@boxicons/react";
import Modal from "../../Modals/Modal";
import "./StudentProfile.css";
import { useEffect, useState } from "react";
import EditInfoStudent from "../../components/student/EditInfoStudent";

export default function StudentProfile() {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");
    const [studentRegisterDate, setStudentRegisterDate] = useState<string>("");
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
                setStudentName(dataUsuario.nombre);
                setStudentEmail(dataUsuario.email);
                setStudentRegisterDate(dataUsuario.fecha_registro);
            } catch (err) {
                console.error();
            }
        }

        getInfoUser();
    }, []);

    return (
        <main className="student-profile-page">
            <header className="header-student-profile">
                <button
                    className="button-back-dashboard"
                    onClick={() => navigate("/student/dashboard")}>
                    <ArrowLeftStroke />
                    Volver al Dashboard
                </button>
            </header>
            <section className="info-student-profile">
                <header className="header-info-student">
                    <h1>Perfil de Estudiante</h1>
                    <p>Datos personales del usuario</p>
                </header>
                <div className="info-student-container">
                    <div className="container">
                        <h2 className="name-student">{studentName}</h2>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="button-edit-info"
                        >
                            <Pencil size="xs"/>
                        </button>
                    </div>
                    <div className="container">
                        <dl className="email-student">
                            <dt>Correo Electrónico</dt>
                            <dd>{studentEmail}</dd>
                        </dl>
                        <dl className="register-date-student">
                            <dt>Fecha de Registro</dt>
                            <dd>{studentRegisterDate}</dd>
                        </dl>
                    </div>
                </div>
            </section>
            {openModal && <Modal children={
                    <EditInfoStudent
                        studentName={studentName}
                        setStudentName={setStudentName}
                        studentEmail={studentEmail}
                        setStudentEmail={setStudentEmail}
                        setOpenModal={setOpenModal}
                        />
                } setOpenModal={setOpenModal}/>}
        </main>
    );
}