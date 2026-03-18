export default async function getAllCourses(token: string) {
    const API_URL = "http://localhost:3000/curso/all";
    
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los cursos");
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error en getAllCourses:", error);
        return { error: "No se pudieron cargar los cursos" };
    }
}