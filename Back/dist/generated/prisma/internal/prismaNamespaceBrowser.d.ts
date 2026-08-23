import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly intento_quiz: "intento_quiz";
    readonly logro: "logro";
    readonly modulo: "modulo";
    readonly pregunta: "pregunta";
    readonly quiz: "quiz";
    readonly rango: "rango";
    readonly usuario: "usuario";
    readonly usuario_logro: "usuario_logro";
    readonly curso: "curso";
    readonly opcion: "opcion";
    readonly codigo_ejemplo: "codigo_ejemplo";
    readonly curso_iniciado: "curso_iniciado";
    readonly token_usuario: "token_usuario";
    readonly modulo_completado: "modulo_completado";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Intento_quizScalarFieldEnum: {
    readonly id_intento: "id_intento";
    readonly id_usuario: "id_usuario";
    readonly id_quiz: "id_quiz";
    readonly calificacion: "calificacion";
    readonly puntos_otorgados: "puntos_otorgados";
    readonly completado_100: "completado_100";
};
export type Intento_quizScalarFieldEnum = (typeof Intento_quizScalarFieldEnum)[keyof typeof Intento_quizScalarFieldEnum];
export declare const LogroScalarFieldEnum: {
    readonly id_logro: "id_logro";
    readonly titulo: "titulo";
    readonly descripcion: "descripcion";
    readonly condicion: "condicion";
    readonly icono: "icono";
};
export type LogroScalarFieldEnum = (typeof LogroScalarFieldEnum)[keyof typeof LogroScalarFieldEnum];
export declare const ModuloScalarFieldEnum: {
    readonly id_modulo: "id_modulo";
    readonly titulo: "titulo";
    readonly descripcion: "descripcion";
    readonly orden: "orden";
    readonly contenido_teorico: "contenido_teorico";
    readonly id_curso: "id_curso";
    readonly estatus: "estatus";
};
export type ModuloScalarFieldEnum = (typeof ModuloScalarFieldEnum)[keyof typeof ModuloScalarFieldEnum];
export declare const PreguntaScalarFieldEnum: {
    readonly id_pregunta: "id_pregunta";
    readonly id_quiz: "id_quiz";
    readonly enunciado: "enunciado";
    readonly orden: "orden";
};
export type PreguntaScalarFieldEnum = (typeof PreguntaScalarFieldEnum)[keyof typeof PreguntaScalarFieldEnum];
export declare const QuizScalarFieldEnum: {
    readonly id_quiz: "id_quiz";
    readonly id_modulo: "id_modulo";
    readonly titulo: "titulo";
    readonly tiempo_limite_segundos: "tiempo_limite_segundos";
    readonly puntos_recompensa: "puntos_recompensa";
};
export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum];
export declare const RangoScalarFieldEnum: {
    readonly id_rango: "id_rango";
    readonly titulo: "titulo";
    readonly puntos_requeridos: "puntos_requeridos";
    readonly icono: "icono";
};
export type RangoScalarFieldEnum = (typeof RangoScalarFieldEnum)[keyof typeof RangoScalarFieldEnum];
export declare const UsuarioScalarFieldEnum: {
    readonly id_usuario: "id_usuario";
    readonly nombre: "nombre";
    readonly email: "email";
    readonly password: "password";
    readonly id_rango_actual: "id_rango_actual";
    readonly puntos_totales: "puntos_totales";
    readonly fecha_registro: "fecha_registro";
    readonly rol: "rol";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const Usuario_logroScalarFieldEnum: {
    readonly id_relacion: "id_relacion";
    readonly id_usuario: "id_usuario";
    readonly id_logro: "id_logro";
    readonly fecha_obtencion: "fecha_obtencion";
};
export type Usuario_logroScalarFieldEnum = (typeof Usuario_logroScalarFieldEnum)[keyof typeof Usuario_logroScalarFieldEnum];
export declare const CursoScalarFieldEnum: {
    readonly id_curso: "id_curso";
    readonly titulo: "titulo";
    readonly descripcion: "descripcion";
    readonly fecha_creacion: "fecha_creacion";
    readonly estado: "estado";
    readonly imagen_url: "imagen_url";
};
export type CursoScalarFieldEnum = (typeof CursoScalarFieldEnum)[keyof typeof CursoScalarFieldEnum];
export declare const OpcionScalarFieldEnum: {
    readonly id_opcion: "id_opcion";
    readonly id_pregunta: "id_pregunta";
    readonly Texto: "Texto";
    readonly es_correcta: "es_correcta";
    readonly orden: "orden";
    readonly explicacion: "explicacion";
};
export type OpcionScalarFieldEnum = (typeof OpcionScalarFieldEnum)[keyof typeof OpcionScalarFieldEnum];
export declare const Codigo_ejemploScalarFieldEnum: {
    readonly id_codigo_ejemplo: "id_codigo_ejemplo";
    readonly explicacion_codigo: "explicacion_codigo";
    readonly codigo: "codigo";
    readonly lenguaje: "lenguaje";
    readonly id_modulo: "id_modulo";
};
export type Codigo_ejemploScalarFieldEnum = (typeof Codigo_ejemploScalarFieldEnum)[keyof typeof Codigo_ejemploScalarFieldEnum];
export declare const Curso_iniciadoScalarFieldEnum: {
    readonly id_curso_iniciado: "id_curso_iniciado";
    readonly id_usuario: "id_usuario";
    readonly id_curso: "id_curso";
    readonly completado: "completado";
    readonly fecha_completado: "fecha_completado";
};
export type Curso_iniciadoScalarFieldEnum = (typeof Curso_iniciadoScalarFieldEnum)[keyof typeof Curso_iniciadoScalarFieldEnum];
export declare const Token_usuarioScalarFieldEnum: {
    readonly id_token: "id_token";
    readonly token: "token";
    readonly tipo: "tipo";
    readonly expiracion: "expiracion";
    readonly usado: "usado";
    readonly id_usuario: "id_usuario";
    readonly created_at: "created_at";
};
export type Token_usuarioScalarFieldEnum = (typeof Token_usuarioScalarFieldEnum)[keyof typeof Token_usuarioScalarFieldEnum];
export declare const Modulo_completadoScalarFieldEnum: {
    readonly id_modulo_completado: "id_modulo_completado";
    readonly id_usuario: "id_usuario";
    readonly id_modulo: "id_modulo";
    readonly completado: "completado";
    readonly fecha_completado: "fecha_completado";
};
export type Modulo_completadoScalarFieldEnum = (typeof Modulo_completadoScalarFieldEnum)[keyof typeof Modulo_completadoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map