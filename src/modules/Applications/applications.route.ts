import { Router, type Request, type Response } from "express";
import { validateRequest } from "../../middlewares/validation";
import { asyncHandler } from "../../middlewares/asyncHandler";
import type { ApplicationController } from "./applications.controller";
import { ApplicationValidation } from "./applications.validation";


export class ApplicationRoutes {
    private router: Router;
    private applicationController: ApplicationController;

    constructor(applicationController: ApplicationController) {
        this.router = Router();
        this.applicationController = applicationController;
        this.initialized();
    }

    private initialized(): void {
        //----------public routes ---------
        //create application
        this.router.post(
            '/',
            validateRequest({
                body: ApplicationValidation.create,
            }),
            asyncHandler((req: Request, res: Response) => this.applicationController.createApplication(req, res))
        )
    }

    public getRouter(): Router {
        return this.router;
    }
}