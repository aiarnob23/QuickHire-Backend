import { Schema, model } from "mongoose";
import { ExperienceLevel, JobStatus, JobType, SalaryCurrency, WorkSetting, type IJob } from "./jobs.interface";


const jobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
        },
        company: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        jobType: {
            type: String,
            enum: Object.values(JobType),
            required: true,
        },
        workSetting: {
            type: String,
            enum: Object.values(WorkSetting),
            required: true,
        },
        categories: {
            type: [String],
            default: [],
        },
        experienceLevel: {
            type: String,
            enum: Object.values(ExperienceLevel),
        },
        shortDescription: {
            type: String,
            trim: true,
            default: "",
        },
        description: {
            type: String,
            required: [true, "Job description is required"],
        },
        requirements: {
            type: [String],
            required: true,
        },
        responsibilities: {
            type: [String],
            default: [],
        },
        salaryRange: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 },
            currency: { type: String, default: SalaryCurrency.BDT },
        },
        companyWebsite: {
            type: String,
            trim: true,
        },
        companyLogo: {
            type: String,
        },
        applicants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: Object.values(JobStatus),
            default: JobStatus.PENDING_VERIFICATION,
        },
        expiresAt: {
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);


jobSchema.index({ title: "text", company: "text"});
export const JobModel = model<IJob>("Job", jobSchema);