import type { Request, Response } from "express";
import { BaseController } from "../../core/BaseController";
import type { JobService } from "./jobs.service";


export class JobController extends BaseController {
    constructor(private jobService: JobService) {
        super()
    }

    /**
     * Create a new job
     * POST /api/jobs (admin only)
     */
    public createJob = async (req: Request, res: Response) => {
        const body = req.validatedBody || req.body;
        this.logAction('register', req, { titie: body.titie, company: body.company });

        const result = await this.jobService.createJob(body);

        return this.sendCreatedResponse(
            res,
            'Job created successfully',
            result
        );
    }
}