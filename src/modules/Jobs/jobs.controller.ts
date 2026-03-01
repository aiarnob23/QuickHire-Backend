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
     * Get all jobs
     * GET /api/jobs
     */
    public getAllJobs = async (req: Request, res: Response) => {

        const { search, category, location, workSetting } = req.query;

        const jobs = await this.jobService.getAllJobs({
            search: search as string,
            category: category as string,
            location: location as string,
            workSetting: workSetting as string,
        });

        return this.sendResponse(
            res,
            'Jobs fetched successfully',
            HTTPStatusCode.OK,
            jobs
        );
    }

    /**
     * Get job by id
     * GET /api/jobs/:id
     */
    public getJobById = async (req: Request, res: Response) => {
        console.log(req.params.id)
        const job = await this.jobService.getJobById(req.params.id as string);
        return this.sendResponse(
            res,
            'Job fetched successfully',
            HTTPStatusCode.OK,
            job);
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

    /**
     * Delete a job
     * DELETE /api/jobs/:id
     */
    public deleteJob = async (req: Request, res: Response) => {
        const job = await this.jobService.deleteJob(req.params.id as string);
        return this.sendResponse(
            res,
            'Job deleted successfully',
            HTTPStatusCode.OK,
            job);
    }
}