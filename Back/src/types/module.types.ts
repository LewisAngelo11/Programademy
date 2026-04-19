export interface CreateModuloDTO {
    titulo: string;
    descripcion?: string;
    contenido_teorico: string;
    orden: number;
    id_curso: number;
}

export interface UpdateModuloDTO {
    titulo?: string;
    descripcion?: string;
    contenido_teorico?: string;
    orden?: number;
    id_curso?: number;
}

export interface ModuloFilters {
    id_curso?: number;
    estatus?: string;
}