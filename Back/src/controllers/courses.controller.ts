import { Request, Response } from 'express';
import { CursoService } from '../services/courses.service';

export class CursoController {
    private cursoService: CursoService;

    constructor() {
        this.cursoService = new CursoService();
    }

    // Crea un nuevo curso
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { title, descripcion, imagenUrl } = req.body;

            // Crear el curso
            const newCourse = await this.cursoService.createCurso({
                titulo: title,
                descripcion,
                imagen_url: imagenUrl
            });

            return res.status(201).json({
                message: "¡Curso creado exitosamente!",
                newCourse
            });
        } catch (error) {
            console.error("Error al crear el curso:", error);
            return res.status(500).json({ 
                message: "Error interno del servidor" 
            });
        }
    }

    // Obtiene todos los cursos activos
    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const courses = await this.cursoService.getAllCursos();
            return res.json(courses);
        } catch (error) {
            console.error("Error al consultar los cursos:", error);
            return res.status(500).json({ 
                message: "Error al consultar los cursos disponibles" 
            });
        }
    }

    // Obtiene un curso por su ID
    getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const idCurso = Number(id);

            const course = await this.cursoService.getCursoById(idCurso);

            if (!course) {
                return res.status(404).json({ 
                    message: "Curso no encontrado o ya fue eliminado" 
                });
            }

            return res.json(course);
        } catch (error) {
            console.error("Error al consultar el curso:", error);
            return res.status(500).json({ 
                message: "Error al consultar el curso" 
            });
        }
    }

    // Actualiza un curso existente
    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const idCurso = Number(id);

            // Verificar si el curso existe y está activo
            const courseExists = await this.cursoService.cursoExistsAndActive(idCurso);

            if (!courseExists) {
                return res.status(404).json({ 
                    message: "Curso no encontrado o ya fue eliminado" 
                });
            }

            // Actualizar el curso
            const updatedCourse = await this.cursoService.updateCurso(idCurso, req.body);

            return res.json({
                message: "Curso actualizado exitosamente",
                course: updatedCourse,
            });
        } catch (error) {
            console.error("Error al actualizar el curso:", error);
            return res.status(500).json({ 
                message: "Error al actualizar el curso" 
            });
        }
    }

    // Marca un curso como eliminado (soft delete)
    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const idCurso = Number(id);

            // Verificar si el curso existe y está activo
            const courseExists = await this.cursoService.cursoExistsAndActive(idCurso);

            if (!courseExists) {
                return res.status(404).json({ 
                    message: "Curso no encontrado o ya fue eliminado" 
                });
            }

            // Soft delete: cambiar estado a 'eliminado'
            const deletedCourse = await this.cursoService.deleteCurso(idCurso);

            return res.json({
                message: "Curso eliminado exitosamente",
                course: deletedCourse
            });
        } catch (error) {
            console.error("Error al eliminar el curso:", error);
            return res.status(500).json({ 
                message: "Error al eliminar el curso" 
            });
        }
    }
}