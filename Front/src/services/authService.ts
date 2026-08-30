import { apiFetch } from "./apiFetch";

export class AuthService {
    static async signIn(credentials: { email: string; passw: string; }) {
        const response = await apiFetch('/auth/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            skipAuthRedirect: true // Si da error 401, no redireccionar al login
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

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al registrar usuario");
        }

        return data;
    }

    static async forgotPassword(email: string) {
        const response = await apiFetch('/auth/forgot-password', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al enviar correo de recuperación");
        }

        return data;
    }

    static async resetPassword(dataUser: { token: string; password: string; }) {
        const response = await apiFetch('/auth/reset-password', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUser)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || data.error || "Error al actualizar contraseña");
        }

        return data;
    }

    static async logout() {
        const response = await apiFetch('/auth/logout', {
            method: "POST"
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data.message || data.error || "Error al cerrar sesión"
            );
        }

        return data;
    }
}

