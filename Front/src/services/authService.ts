import { apiFetch } from "./apiFetch";

export class AuthService {
    static async signIn(credentials: { email: string; passw: string; }) {
        const response = await apiFetch('/auth/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
    
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al iniciar sesión");
        }

        return data;
    }

    static async signUp(dataUser: { email: string; password: string; nombre: string; }) {
        const response = await apiFetch('/auth/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUser)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al cerrar sesión");
        }

        return data;
    }
}

