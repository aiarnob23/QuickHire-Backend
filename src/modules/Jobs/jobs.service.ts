import type { Model } from "mongoose";
import { BaseService } from "../../core/BaseService";
import type { IJob } from "./jobs.interface";
import type { CreateJobInput } from "./jobs.validation";
import { AppLogger } from "../../core/logging/logger";
interface JobFilters {
    search?: string;
    category?: string;
    location?: string;
    workSetting?: string;
}


export class JobService extends BaseService<IJob> {
    constructor(
        JobModel: Model<IJob>
    ) {
        super(JobModel, "Job", {
            enableAuditFields: true,
            enableSoftDelete: false,
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
     * Get all jobs
     */
    async getAllJobs(filters: JobFilters): Promise<IJob[]> {
        const query: any = {
            status: "active",
            deletedAt: null,
        };

        // Search (case insensitive)
        if (filters.search) {
            query.title = {
                $regex: filters.search,
                $options: "i",
            };
        }

        // Category (array)
        if (filters.category) {
            query.categories = {
                $in: [filters.category],
            };
        }

        // Location
        if (filters.location) {
            query.location = {
                $regex: `^${filters.location}$`,
                $options: "i",
            };
        }

        // Work Setting (enum match)
        if (filters.workSetting) {
            query.workSetting = filters.workSetting;
        }

        const jobs = await this.findMany(query);

        return jobs.data;
    }
    /**
     * Get featured jobs
     */
    async getFeaturedJobs(): Promise<IJob[]> {
        const jobs = await this.findMany({ isFeatured: true });
        return jobs.data;
    }

    /**
     * Get job by id
     */
    async getJobById(id: string): Promise<IJob> {
        const job = await this.findById(id);
        return job;
    }

    /**
     * Delete a job
     */
    async deleteJob(id: string) {
        AppLogger.info("Deleting job ...", id);
        await this.deleteById(id);
        return "Job deleted successfully";
    }
}