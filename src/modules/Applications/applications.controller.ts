import type { Request, Response } from "express";
import { BaseController } from "../../core/BaseController";
import type { ApplicationService } from "./applications.service";


export class ApplicationController extends BaseController {
    constructor(private applicationService: ApplicationService) {
        super()
    }

    /**
     * Create a new application
     * POST /api/applications
     */
    public createApplication = async (req: Request, res: Response) => {
        const body = req.validatedBody || req.body;
        this.logAction('register', req, { titie: body.titie, company: body.company });

        const result = await this.applicationService.createApplication(body);

        return this.sendCreatedResponse(
            res,
            'Application created successfully',
            result
        );
    }
}