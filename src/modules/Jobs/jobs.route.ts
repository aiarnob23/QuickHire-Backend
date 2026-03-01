import { Router, type Request, type Response } from "express";
import type { JobController } from "./jobs.controller";
import { validateRequest } from "../../middlewares/validation";
import { JobValidation } from "./jobs.validation";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { authenticate, authorize } from "../../middlewares/auth";


export class JobRoutes {
    private router: Router;
    private jobController: JobController;

    constructor(jobController: JobController) {
        this.router = Router();
        this.jobController = jobController;
        this.initialized();
    }

    private initialized(): void {
        //----------protected routes (admin only)
        //create job
        this.router.post(
            '/',
            authenticate,
            authorize('admin'),
            validateRequest({
                body: JobValidation.create,
            }),
            asyncHandler((req: Request, res: Response) => this.jobController.createJob(req, res))
        )

        //get all jobs
        this.router.get(
            '/',
            asyncHandler((req: Request, res: Response) => this.jobController.getAllJobs(req, res))
        )

        //get job by id
        this.router.get(
            '/:id',
            asyncHandler((req: Request, res: Response) => this.jobController.getJobById(req, res))
        )

        //get featured jobs
        this.router.get(
            '/featured',
            asyncHandler((req: Request, res: Response) => this.jobController.getFeaturedJobs(req, res))
        )
    }

    public getRouter(): Router {
        return this.router;
    }
}