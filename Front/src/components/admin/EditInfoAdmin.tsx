import { useState, type SetStateAction } from "react";
import "./EditInfoAdmin.css";

interface EditInfoStudentProp {
    adminName: string;
    setAdminName: React.Dispatch<SetStateAction<string>>;
    adminEmail: string;
    setAdminEmail: React.Dispatch<SetStateAction<string>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditInfoAdmin({ adminName, setAdminName, adminEmail, setAdminEmail, setOpenModal }:EditInfoStudentProp) {
    const [localName, setLocalName] = useState<string>(adminName);
    const [localEmail, setLocalEmail] = useState<string>(adminEmail);

    const editInfoStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        const API_URL = "http://localhost:3000/usuario/update";

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("No estás autenticado.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: localName,
                    email: localEmail
                })
            });

            if (!response.ok) {
                alert("Error al actualizar perfil");
                console.error("Error al actualizar", response);
                return;
            }

            const data = await response.json();

            alert(data.message);
            // Actualiza los datos en la UI
            setAdminName(localName);
            setAdminEmail(localEmail);

            setOpenModal(false); // Cierra el modal

        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error del servidor");
        }
    };

    return (
        <section className="edit-info-admin">
            <h1>Editar Perfil</h1>
            <form onSubmit={editInfoStudent} className="form-edit-admin">
                <div className="input-name-admin">
                    <label htmlFor="admin-name">Nombre Completo</label>
                    <input
                        type="text"
                        id="admin-name"
                        value={localName}
                        onChange={(e) => setLocalName(e.target.value)}
                        placeholder="Ingrese su nombre completo"/>
                </div>
                <div className="input-email-admin">
                    <label htmlFor="admin-email">Correo Electrónico</label>
                    <input
                        type="text"
                        id="admin-email"
                        value={localEmail}
                        onChange={(e) => setLocalEmail(e.target.value)}
                        placeholder="tu@email.com"/>
                </div>
                <button className="confirm-edit-info">Guardar Cambios</button>
            </form>
        </section>
    );
}