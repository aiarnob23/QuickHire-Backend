import type { Types } from "mongoose";

export enum JobType {
    FULL_TIME = "full_time",
    PART_TIME = "part_time",
    CONTRACT = "contract",
    INTERNSHIP = "internship",
}

export enum JobStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING_VERIFICATION = "pending_verification",
    EXPIRED = "expired",
}

export enum WorkSetting {
    ON_SITE = "on_site",
    REMOTE = "remote",
    HYBRID = "hybrid",
}

export enum ExperienceLevel {
    JUNIOR = "Junior",
    INTERMEDIATE = "Intermediate",
    SENIOR = "Senior",
    EXPERT = "Expert",
}
export interface IJob {
    _id: Types.ObjectId;
    title: string;
    company: string;
    location: string;
    jobType: JobType;
    workSetting: WorkSetting;
    categories: string[];
    experienceLevel?: ExperienceLevel;
    shortDescription?: string;
    description: string;
    requirements: string[];
    responsibilities?: string[];
    salaryRange?: {
        min: number;
        max: number;
        currency: string;
    };
    companyWebsite?: string;
    companyLogo?: string;
    applicants: Types.ObjectId[];

    isFeatured?: boolean;
    status: JobStatus;
    expiresAt?: Date;

    isDeleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}