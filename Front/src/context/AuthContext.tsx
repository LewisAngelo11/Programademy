import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router";
import { UserService } from "../services/userService";

interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    rol: "admin" | "student";
    puntos_totales: number | null;
}

interface AuthContextType {
    usuario: Usuario | null;
    loading: boolean;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const data = await UserService.getInfo();
                setUsuario(data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
                setUsuario(null);
            } finally {
                setLoading(false);
            }
        };

        obtenerUsuario();
    }, []);

    const logout = async () => {
        try {
            await AuthService.logout();
        } finally {
            setUsuario(null);
            navigate("/login", { replace: true });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                loading,
                setUsuario,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de un AuthProvider"
        );
    }

    return context;
};