import type { SetStateAction } from "react";
import "./EditInfoStudent.css"

interface EditInfoStudentProp {
    studentName: string;
    setStudentName: React.Dispatch<SetStateAction<string>>;
    studentEmail: string;
    setStudentEmail: React.Dispatch<SetStateAction<string>>;
};

export default function EditInfoStudent({ studentName, setStudentName, studentEmail, setStudentEmail }:EditInfoStudentProp) {
    const editInfoStudent = () => {

    };

    return (
        <section className="edit-info-student">
            <h1>Editar Perfil</h1>
            <form onSubmit={editInfoStudent} className="form-edit-student">
                <div className="input-name-student">
                    <label htmlFor="student-name">Nombre Completo</label>
                    <input
                        type="text"
                        id="student-name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ingrese su nombre completo"/>
                </div>
                <div className="input-email-student">
                    <label htmlFor="student-email">Correo Electrónico</label>
                    <input
                        type="text"
                        id="student-email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="tu@email.com"/>
                </div>
                <button className="confirm-edit-info">Guardar Cambios</button>
            </form>
        </section>
    );
}