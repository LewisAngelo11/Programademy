const API_URL = import.meta.env.VITE_API_URL;

export const getAllModulesFromCourse = async (token: string, idCurso: number) => {
    const response = await fetch(`${API_URL}/modulo/course/all/${idCurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener los módulos');
    }

    return await response.json();
}

export const getOneModule = async (token: string, idModulo: number) => {
    const response = await fetch(`${API_URL}/modulo/get/${idModulo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al consultar el módulo');
    }

    return await response.json();
}

export const deleteModulo = async (token: string, idModulo: number): Promise<any> => {  
    const response = await fetch(`${API_URL}/modulo/delete/${idModulo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el módulo');
    }

    return await response.json();
};

export const getAllModules = async (token: string) => {
    const response = await fetch(`${API_URL}/modulo/all`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) {
        return {
            error: "No autorizado.",
            status: 401
        };
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cargar los módulos');
    }

    return await response.json();;
};