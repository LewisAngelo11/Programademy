import { useState } from "react";
import type { ChangeEvent } from "react";
import { Eye, EyeSlash } from "@boxicons/react";
import "./PasswordInput.css";

interface PasswordInputProps {
    id?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
}

// Input de password reutilizable para los componentes de auth
export default function PasswordInput({ id, value, onChange, placeholder, required, autoComplete }: PasswordInputProps) {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="password-input-wrapper">
            <input
                id={id}
                className="password-input"
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
            />
            <button
                type="button"
                className="toggle-password"
                onClick={() => setVisible((prev) => !prev)}
                aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={visible}
                title={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
                {visible ? <EyeSlash /> : <Eye />}
            </button>
        </div>
    );
}