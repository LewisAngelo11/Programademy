const API_URL = "http://localhost:3000/quiz";

export const getAllQuizzes = async (token: string) => {
    const response = await fetch(`${API_URL}/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener los quizzes');
    }

    return await response.json();
}

export const getOneQuiz = async (token: string, idQuiz: number) => {
    const response = await fetch(`${API_URL}/getOne/${idQuiz}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al consultar el quiz');
    }

    return await response.json();
}

export const createQuiz = async (token: string, data: any) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el quiz');
    }

    return await response.json();
}

export const updateQuiz = async (token: string, idQuiz: number, data: any) => {
    const response = await fetch(`${API_URL}/update/${idQuiz}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el quiz');
    }

    return await response.json();
}

export const deleteQuiz = async (token: string, idQuiz: number): Promise<any> => {
    const response = await fetch(`${API_URL}/delete/${idQuiz}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el quiz');
    }

    return await response.json();
};
