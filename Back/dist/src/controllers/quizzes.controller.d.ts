import { Request, Response } from 'express';
export declare class QuizController {
    private quizService;
    constructor();
    create: (req: Request, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response) => Promise<void>;
    getQuiz: (req: any, res: Response) => Promise<void>;
    update: (req: any, res: Response) => Promise<void>;
    createAttempt: (req: any, res: Response) => Promise<void>;
    getAllAtempts: (req: any, res: Response) => Promise<void>;
    getAttemptComplete: (req: any, res: Response) => Promise<void>;
    getLastAttempt: (req: any, res: Response) => Promise<void>;
    getAllAttemptsStudents: (req: Request, res: Response) => Promise<void>;
    delete: (req: any, res: Response) => Promise<void>;
}
//# sourceMappingURL=quizzes.controller.d.ts.map