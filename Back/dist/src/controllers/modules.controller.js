"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuloController = void 0;
const modules_service_1 = require("../services/modules.service");
class ModuloController {
    constructor() {
        // Obtiene todos los módulos activos
        this.getAll = async (req, res) => {
            try {
                const modulos = await this.moduloService.getAllModules();
                return res.json(modulos);
            }
            catch (error) {
                console.error('Error al obtener módulos:', error);
                return res.status(500).json({ error: 'Error al obtener módulos' });
            }
        };
        // Obtiene todos los módulos de un curso específico
        this.getByCourse = async (req, res) => {
            try {
                const { id } = req.params;
                const idCurso = Number(id);
                const idUsuario = Number(req.usuario.id); // Obtener el ID del usuario de la solicitud
                if (isNaN(idCurso) || isNaN(idUsuario)) {
                    return res.status(400).json({ error: 'ID de curso o usuario inválido' });
                }
                const modulos = await this.moduloService.getModulosByCurso(idCurso, idUsuario);
                return res.json(modulos);
            }
            catch (error) {
                console.error('Error al obtener módulos por curso:', error);
                return res.status(500).json({ error: 'Error al obtener módulos' });
            }
        };
        // Obtiene un módulo por su ID
        this.getById = async (req, res) => {
            try {
                const { id } = req.params;
                const idModulo = Number(id);
                if (isNaN(idModulo)) {
                    return res.status(400).json({ error: 'ID de módulo inválido' });
                }
                const modulo = await this.moduloService.getModuloById(idModulo);
                if (!modulo) {
                    return res.status(404).json({ error: 'Módulo no encontrado' });
                }
                return res.json(modulo);
            }
            catch (error) {
                console.error('Error al obtener el módulo:', error);
                return res.status(500).json({ error: 'Error al obtener el módulo' });
            }
        };
        // Crea un nuevo módulo
        this.create = async (req, res) => {
            try {
                const { titulo, descripcion, contenido_teorico, orden, id_curso, codigo_ejemplo } = req.body;
                const ordenNumero = Number(orden);
                const idCursoNumero = Number(id_curso);
                // Verificar que el curso existe
                const cursoExiste = await this.moduloService.cursoExists(idCursoNumero);
                if (!cursoExiste) {
                    return res.status(404).json({ error: 'El curso especificado no existe' });
                }
                // Crear el módulo
                const nuevoModulo = await this.moduloService.createModulo({
                    titulo,
                    descripcion,
                    contenido_teorico,
                    orden: ordenNumero,
                    id_curso: idCursoNumero,
                    codigo_ejemplo
                });
                return res.status(201).json(nuevoModulo);
            }
            catch (error) {
                console.error('Error al crear módulo:', error);
                return res.status(500).json({ error: 'Error al crear el módulo' });
            }
        };
        // Actualiza un módulo existente
        this.update = async (req, res) => {
            try {
                const { id } = req.params;
                const { titulo, descripcion, contenido_teorico, orden, id_curso, codigo_ejemplo } = req.body;
                const idModulo = Number(id);
                // Verificar que el módulo existe
                const moduloExiste = await this.moduloService.moduloExists(idModulo);
                if (!moduloExiste) {
                    return res.status(404).json({ error: 'Módulo no encontrado' });
                }
                // Si se intenta cambiar el curso, verificar que existe
                if (id_curso && id_curso !== moduloExiste.id_curso) {
                    const idCursoNumero = Number(id_curso);
                    const cursoExiste = await this.moduloService.cursoExists(idCursoNumero);
                    if (!cursoExiste) {
                        return res.status(404).json({ error: 'El curso especificado no existe' });
                    }
                }
                // Construir objeto de actualización solo con campos presentes
                const updateData = {};
                if (titulo !== undefined)
                    updateData.titulo = titulo;
                if (descripcion !== undefined)
                    updateData.descripcion = descripcion;
                if (contenido_teorico !== undefined)
                    updateData.contenido_teorico = contenido_teorico;
                if (orden !== undefined)
                    updateData.orden = Number(orden);
                if (id_curso !== undefined)
                    updateData.id_curso = Number(id_curso);
                if (codigo_ejemplo !== undefined)
                    updateData.codigo_ejemplo = codigo_ejemplo;
                // Actualizar el módulo
                const moduloActualizado = await this.moduloService.updateModulo(idModulo, updateData);
                return res.json(moduloActualizado);
            }
            catch (error) {
                console.error('Error al actualizar módulo:', error);
                return res.status(500).json({ error: 'Error al actualizar el módulo' });
            }
        };
        // Marca un módulo como eliminado (soft delete)
        this.delete = async (req, res) => {
            try {
                const { id } = req.params;
                const idModulo = Number(id);
                if (isNaN(idModulo)) {
                    return res.status(400).json({ error: 'ID de módulo inválido' });
                }
                // Verificar que el módulo existe
                const moduloExiste = await this.moduloService.moduloExists(idModulo);
                if (!moduloExiste) {
                    return res.status(404).json({ error: 'Módulo no encontrado' });
                }
                // Marcar como eliminado
                const moduloActualizado = await this.moduloService.deleteModulo(idModulo);
                return res.status(200).json({
                    mensaje: 'Módulo marcado como eliminado exitosamente',
                    modulo: moduloActualizado
                });
            }
            catch (error) {
                console.error('Error al eliminar módulo:', error);
                return res.status(500).json({
                    error: 'Error interno del servidor al eliminar el módulo'
                });
            }
        };
        this.moduloService = new modules_service_1.ModuloService();
    }
}
exports.ModuloController = ModuloController;
//# sourceMappingURL=modules.controller.js.map