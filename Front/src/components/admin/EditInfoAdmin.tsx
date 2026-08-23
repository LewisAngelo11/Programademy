import { useState, type SetStateAction } from "react";
import { UserService } from "../../services/userService";
import "./EditInfoAdmin.css";
import toast from "react-hot-toast";

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

    const editInfoStudent = async () => {
        try {
            const data = await UserService.updateInfo({ nombre: localName, email: localEmail });
            toast.success(data.message);
            // Actualiza los datos en la UI
            setAdminName(localName);
            setAdminEmail(localEmail);

            setOpenModal(false); // Cierra el modal

        } catch (error) {
            console.error("Error en la petición:", error);
            toast.error("Error del servidor");
        }
    };

    return (
        <section className="edit-info-admin">
            <h1>Editar Perfil</h1>
            <form action={editInfoStudent} className="form-edit-admin">
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