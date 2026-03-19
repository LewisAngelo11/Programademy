export const getAllModulesFromCourse = async (token: string, idCurso: number) => {
    const API_URL = "http://localhost:3000/modulo/course/all";

    const response = await fetch(`${API_URL}/${idCurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener los módulos');
    }

    return await response.json();
}

export const getOneModule = async (token: string, idModulo: number) => {
    const API_URL = "http://localhost:3000/modulo/get";

    const response = await fetch(`${API_URL}/${idModulo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al consultar el módulo');
    }

    return await response.json();
}

export const deleteModulo = async (token: string, idModulo: number): Promise<any> => {  
    const API_URL = "http://localhost:3000/modulo/delete"
    
    const response = await fetch(`${API_URL}/${idModulo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el módulo');
    }

    return await response.json();
};

export const getAllModules = async (token: string) => {
    const API_URL = "http://localhost:3000/modulo/all"

    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cargar los módulos');
    }

    return await response.json();;
};