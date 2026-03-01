import type { Model } from "mongoose";
import { BaseService } from "../../core/BaseService";
import type { IJob } from "./jobs.interface";
import type { CreateJobInput } from "./jobs.validation";
import { AppLogger } from "../../core/logging/logger";



export class JobService extends BaseService<IJob> {
    constructor(
        JobModel: Model<IJob>
    ) {
        super(JobModel, "Job", {
            enableAuditFields: true,
            enableSoftDelete: true,
        });
    }

    /**
     * Create a new job
     */
    async createJob(data: CreateJobInput): Promise<IJob> {
        AppLogger.info('Creating job...', data);
        const job = await this.create(data);
        return job;
    }

    /**
     * Get featured jobs
     */
    async getFeaturedJobs(): Promise<IJob[]> {
        const jobs = await this.findMany({ isFeatured: true });
        return jobs.data;
    }
}