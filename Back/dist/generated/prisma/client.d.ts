import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Intento_quizs
 * const intento_quizs = await prisma.intento_quiz.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model intento_quiz
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type intento_quiz = Prisma.intento_quizModel;
/**
 * Model logro
 *
 */
export type logro = Prisma.logroModel;
/**
 * Model modulo
 *
 */
export type modulo = Prisma.moduloModel;
/**
 * Model pregunta
 *
 */
export type pregunta = Prisma.preguntaModel;
/**
 * Model quiz
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type quiz = Prisma.quizModel;
/**
 * Model rango
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type rango = Prisma.rangoModel;
/**
 * Model usuario
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type usuario = Prisma.usuarioModel;
/**
 * Model usuario_logro
 *
 */
export type usuario_logro = Prisma.usuario_logroModel;
/**
 * Model curso
 *
 */
export type curso = Prisma.cursoModel;
/**
 * Model opcion
 *
 */
export type opcion = Prisma.opcionModel;
/**
 * Model codigo_ejemplo
 *
 */
export type codigo_ejemplo = Prisma.codigo_ejemploModel;
/**
 * Model curso_iniciado
 *
 */
export type curso_iniciado = Prisma.curso_iniciadoModel;
/**
 * Model token_usuario
 *
 */
export type token_usuario = Prisma.token_usuarioModel;
/**
 * Model modulo_completado
 *
 */
export type modulo_completado = Prisma.modulo_completadoModel;
//# sourceMappingURL=client.d.ts.map