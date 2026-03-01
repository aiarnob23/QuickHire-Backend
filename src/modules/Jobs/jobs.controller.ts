import type { Request, Response } from "express";
import { BaseController } from "../../core/BaseController";
import type { JobService } from "./jobs.service";
import { HTTPStatusCode } from "../../types/HTTPStatusCode";


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

    /**
    * Get featured jobs
    * POST /api/jobs/featured
    */
    public getFeaturedJobs = async (req: Request, res: Response) => {
        const jobs = await this.jobService.getFeaturedJobs();
        return this.sendResponse(
            res,
            'Featured Jobs fetched successfully',
            HTTPStatusCode.OK,
            jobs);
    }
}