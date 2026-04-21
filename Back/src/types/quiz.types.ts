export interface CreateOpcionDTO {
    Texto: string;
    es_correcta: boolean;
    orden: number;
}

export interface UpdateOpcionDTO extends CreateOpcionDTO {}

export interface CreatePreguntaDTO {
    enunciado: string;
    orden: number;
    opcion: CreateOpcionDTO[];
}

export interface UpdatePreguntaDTO extends CreatePreguntaDTO {}

export interface CreateQuizDTO {
    id_modulo: number;
    titulo: string;
    tiempo_limite_segundos: number;
    puntos_recompensa: number;
    pregunta: CreatePreguntaDTO[];
}

export interface UpdateQuizDTO extends CreateQuizDTO {}
