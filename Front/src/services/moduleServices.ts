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