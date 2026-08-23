import { Request, Response } from 'express';
export declare class CursoController {
    private cursoService;
    constructor();
    create: (req: Request, res: Response) => Promise<Response>;
    getAll: (req: Request, res: Response) => Promise<Response>;
    getById: (req: any, res: Response) => Promise<Response>;
    getStarted: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response>;
    started: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=courses.controller.d.ts.map