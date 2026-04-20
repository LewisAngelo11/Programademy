export interface CodigoEjemploDTO {
    explicacion_codigo?: string;
    codigo: string;
    lenguaje?: "C" | "C__" | "Python" | "JavaScript" | "Java" | "C_";
}

export interface CreateModuloDTO {
    titulo: string;
    descripcion?: string;
    contenido_teorico: string;
    orden: number;
    id_curso: number;
    codigo_ejemplo?: CodigoEjemploDTO[];
}

export interface UpdateModuloDTO {
    titulo?: string;
    descripcion?: string;
    contenido_teorico?: string;
    orden?: number;
    id_curso?: number;
    codigo_ejemplo?: CodigoEjemploDTO[];
}

export interface ModuloFilters {
    id_curso?: number;
    estatus?: string;
}