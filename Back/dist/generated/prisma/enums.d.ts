export declare const rol_usuario: {
    readonly student: "student";
    readonly admin: "admin";
};
export type rol_usuario = (typeof rol_usuario)[keyof typeof rol_usuario];
export declare const estado_curso: {
    readonly activo: "activo";
    readonly eliminado: "eliminado";
};
export type estado_curso = (typeof estado_curso)[keyof typeof estado_curso];
export declare const estatus_modulo: {
    readonly activo: "activo";
    readonly eliminado: "eliminado";
};
export type estatus_modulo = (typeof estatus_modulo)[keyof typeof estatus_modulo];
export declare const lenguaje_programacion: {
    readonly C: "C";
    readonly C__: "C__";
    readonly Python: "Python";
    readonly JavaScript: "JavaScript";
    readonly Java: "Java";
    readonly C_: "C_";
};
export type lenguaje_programacion = (typeof lenguaje_programacion)[keyof typeof lenguaje_programacion];
export declare const TipoToken: {
    readonly RESET_PASSWORD: "RESET_PASSWORD";
    readonly VERIFY_EMAIL: "VERIFY_EMAIL";
};
export type TipoToken = (typeof TipoToken)[keyof typeof TipoToken];
//# sourceMappingURL=enums.d.ts.map