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
    getById = async (req: any, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const idCurso = Number(id);
            const usuario = req.usuario;
            const idUsuario = usuario.id_usuario;

            const isStarted = await this.cursoService.verifyCursoStarted(idCurso, idUsuario)
            const course = await this.cursoService.getCursoById(idCurso);

            if (!course) {
                return res.status(404).json({ 
                    message: "Curso no encontrado o ya fue eliminado" 
                });
            }

            return res.json({course, isStarted});
        } catch (error) {
            console.error("Error al consultar el curso:", error);
            return res.status(500).json({ 
                message: "Error al consultar el curso" 
            });
        }
    }

    getStarted = async (req: any, res: Response) => {
        try {
            const usuario = req.usuario;
            const idUsuario = usuario.id;

            const startedCourses = await this.cursoService.getStartedCourses(Number(idUsuario));

            if (!startedCourses) {
                return res.status(404).json({ 
                    message: "El estudante no tiene cursos iniciados"
                });
            }

            return res.json(startedCourses);
        } catch (error) {
            console.error("Error al consultar los cursos iniciados:", error);
            return res.status(500).json({ 
                message: "Error al consultar los cursos iniciados" 
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

    // Comenzar el curso por un usuario
    started = async (req: any, res: Response) => {
        try {
            const { id } = req.params;
            const idCurso = Number(id);
            const usuario = req.usuario;
            const idUsuario = usuario.id;

            console.log("Usuario: ", usuario);

            // Verificar si el curso ya fue iniciado
            const verifyStarted = await this.cursoService.verifyCursoStarted(Number(idCurso), Number(idUsuario))

            if (verifyStarted) {
                return res.status(404).json({ 
                    message: "El curso ya fue iniciado por el usuario"
                });
            }

            const startCourse = await this.cursoService.startedCourse(Number(idCurso), Number(idUsuario));

            return res.json({
                message: "¡¡Curso iniciado por el estudiante!!",
                course: startCourse,
            });

        } catch (error) {
            console.error("Error al iniciar el curso:", error);
            return res.status(500).json({ 
                message: "Error al iniciar el curso"
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