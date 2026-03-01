import { BaseModule } from "../../core/BaseModule";
import { config } from "../../core/config";
import { AppLogger } from "../../core/logging/logger";
import { ApplicationController } from "./applications.controller";
import { ApplicationModel } from "./applications.model";
import  { ApplicationRoutes } from "./applications.route";
import  { ApplicationService } from "./applications.service";

export class ApplicationModule extends BaseModule {
    public readonly name = 'ApplicationModule';
    public readonly version = '1.0.0';
    public readonly dependencies = [];

    private applicationService!: ApplicationService;
    private applicationControler!: ApplicationController;
    private applicationRoutes!: ApplicationRoutes;

    /**
     * Setup module services
     */
    protected async setupServices(): Promise<void> {
        if (!config.security.jwt.secret) {
            throw new Error('JWT_SECRET is required in environment variables');
        }
        //Initialize service
        this.applicationService = new ApplicationService(ApplicationModel);
        AppLogger.info('ApplicationService initialized successfully');
    }

    /** 
     * Setup module routes
     */
    protected async setupRoutes(): Promise<void> {
        // Initialize controller
        this.applicationControler = new ApplicationController(this.applicationService);
        AppLogger.info('ApplicationController initialized successfully');

        // Initialize routes
        this.applicationRoutes = new ApplicationRoutes(this.applicationControler);
        AppLogger.info('ApplicationRoutes initialized successfully');

        // Mount routes under /api/applications
        this.router.use('/api/applications', this.applicationRoutes.getRouter());
    }


}