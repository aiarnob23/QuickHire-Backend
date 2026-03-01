import { Types, type Model } from "mongoose";
import { BaseService } from "../../core/BaseService";
import { AppLogger } from "../../core/logging/logger";
import type { IApplication } from "./applications.interface";
import type { CreateApplicationInput } from "./applications.validation";



export class ApplicationService extends BaseService<IApplication> {
    constructor(
        ApplicationModel: Model<IApplication>
    ) {
        super(ApplicationModel, "Application", {
            enableAuditFields: true,
            enableSoftDelete: true,
        });
    }

    /**
     * Create a new applicaton
     */
    async createApplication(data: CreateApplicationInput): Promise<IApplication> {

        const transformedData: Partial<IApplication> = {
            ...data,
            jobId: new Types.ObjectId(data.jobId),
            userId: new Types.ObjectId(data.userId? data.userId : ""),
        };
        AppLogger.info('Creating Application...', transformedData);
        const application = await this.create(transformedData);
        return application;
    }
}