import type { Types } from "mongoose";

export enum ApplicationStatus {
    PENDING = 'pending',
    REVIEWED = 'reviewed',
    SHORTLISTED = 'shortlisted',
    INTERVIEWED = 'interviewed',
    OFFERED = 'offered',
    HIRED = 'hired',
    DECLINED = 'declined',
    REJECTED = 'rejected'
}

export enum ExpectedSalaryCurrency {
    USD = 'USD',
    BDT = 'BDT',
    EUR = 'EUR'
}

export interface IApplication {
    _id: Types.ObjectId;
    jobId: Types.ObjectId;
    userId?: Types.ObjectId;

    name: string;
    email: string;
    phoneNumber: string;
    resumeLink: string;
    portfolioLink?: string;
    linkedInProfileLink?: string;
    githubProfileLink?: string;

    totalYearsOfExperience: number;
    currentCompany?: string;
    currentDesignation?: string;
    skills?: string[];

    expectedSalary: {
        amount: number;
        currency: ExpectedSalaryCurrency;
    };
    noticePeriodInMonths: number;
    isImmediatelyAvailable: boolean;

    coverNote?: string;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}

