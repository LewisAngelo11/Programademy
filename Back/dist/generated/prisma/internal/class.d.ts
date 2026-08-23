import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.intento_quiz`: Exposes CRUD operations for the **intento_quiz** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Intento_quizs
  * const intento_quizs = await prisma.intento_quiz.findMany()
  * ```
  */
    get intento_quiz(): Prisma.intento_quizDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.logro`: Exposes CRUD operations for the **logro** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Logroes
      * const logroes = await prisma.logro.findMany()
      * ```
      */
    get logro(): Prisma.logroDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.modulo`: Exposes CRUD operations for the **modulo** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Modulos
      * const modulos = await prisma.modulo.findMany()
      * ```
      */
    get modulo(): Prisma.moduloDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pregunta`: Exposes CRUD operations for the **pregunta** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Preguntas
      * const preguntas = await prisma.pregunta.findMany()
      * ```
      */
    get pregunta(): Prisma.preguntaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.quiz`: Exposes CRUD operations for the **quiz** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Quizzes
      * const quizzes = await prisma.quiz.findMany()
      * ```
      */
    get quiz(): Prisma.quizDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rango`: Exposes CRUD operations for the **rango** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Rangos
      * const rangos = await prisma.rango.findMany()
      * ```
      */
    get rango(): Prisma.rangoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.usuario`: Exposes CRUD operations for the **usuario** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Usuarios
      * const usuarios = await prisma.usuario.findMany()
      * ```
      */
    get usuario(): Prisma.usuarioDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.usuario_logro`: Exposes CRUD operations for the **usuario_logro** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Usuario_logroes
      * const usuario_logroes = await prisma.usuario_logro.findMany()
      * ```
      */
    get usuario_logro(): Prisma.usuario_logroDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.curso`: Exposes CRUD operations for the **curso** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Cursos
      * const cursos = await prisma.curso.findMany()
      * ```
      */
    get curso(): Prisma.cursoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.opcion`: Exposes CRUD operations for the **opcion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Opcions
      * const opcions = await prisma.opcion.findMany()
      * ```
      */
    get opcion(): Prisma.opcionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.codigo_ejemplo`: Exposes CRUD operations for the **codigo_ejemplo** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Codigo_ejemplos
      * const codigo_ejemplos = await prisma.codigo_ejemplo.findMany()
      * ```
      */
    get codigo_ejemplo(): Prisma.codigo_ejemploDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.curso_iniciado`: Exposes CRUD operations for the **curso_iniciado** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Curso_iniciados
      * const curso_iniciados = await prisma.curso_iniciado.findMany()
      * ```
      */
    get curso_iniciado(): Prisma.curso_iniciadoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.token_usuario`: Exposes CRUD operations for the **token_usuario** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Token_usuarios
      * const token_usuarios = await prisma.token_usuario.findMany()
      * ```
      */
    get token_usuario(): Prisma.token_usuarioDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.modulo_completado`: Exposes CRUD operations for the **modulo_completado** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Modulo_completados
      * const modulo_completados = await prisma.modulo_completado.findMany()
      * ```
      */
    get modulo_completado(): Prisma.modulo_completadoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map