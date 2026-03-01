import { BaseModule } from "../../core/BaseModule";
import { config } from "../../core/config";
import { AppLogger } from "../../core/logging/logger";
import { JobController } from "./jobs.controller";
import { JobModel } from "./jobs.model";
import { JobRoutes } from "./jobs.route";
import { JobService } from "./jobs.service";

export class JobModule extends BaseModule {
    public readonly name = 'JobModule';
    public readonly version = '1.0.0';
    public readonly dependencies = [];

    private jobService!: JobService;
    private jobControler!: JobController;
    private jobRoutes!: JobRoutes;

    /**
     * Setup module services
     */
    protected async setupServices(): Promise<void> {
        if (!config.security.jwt.secret) {
            throw new Error('JWT_SECRET is required in environment variables');
        }
        //Initialize service
        this.jobService = new JobService(JobModel);
        AppLogger.info('JobService initialized successfully');
    }

    /** 
     * Setup module routes
     */
    protected async setupRoutes(): Promise<void> {
        // Initialize controller
        this.jobControler = new JobController(this.jobService);
        AppLogger.info('JobController initialized successfully');

        // Initialize routes
        this.jobRoutes = new JobRoutes(this.jobControler);
        AppLogger.info('JobRoutes initialized successfully');

        // Mount routes under /api/jobs
        this.router.use('/api/jobs', this.jobRoutes.getRouter());
    }


}