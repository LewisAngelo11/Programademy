import { Request, Response } from 'express';
export declare class ModuloController {
    private moduloService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<Response>;
    getByCourse: (req: any, res: Response) => Promise<Response>;
    getById: (req: Request, res: Response) => Promise<Response>;
    create: (req: Request, res: Response) => Promise<Response>;
    update: (req: Request, res: Response) => Promise<Response>;
    delete: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=modules.controller.d.ts.map