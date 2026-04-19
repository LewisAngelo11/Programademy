export interface CreateCursoDTO {
    titulo: string;
    descripcion: string;
    imagen_url?: string;
}

export interface UpdateCursoDTO {
    titulo?: string;
    descripcion?: string;
    imagen_url?: string;
}