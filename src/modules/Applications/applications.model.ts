import { Schema, model } from "mongoose";
import { ApplicationStatus, ExpectedSalaryCurrency, type IApplication } from "./applications.interface";


const expectedSalarySchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, "Salary amount cannot be negative"],
    },
    currency: {
      type: String,
      enum: Object.values(ExpectedSalaryCurrency),
      required: true,
    },
  },
  { _id: false }
);

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    resumeLink: {
      type: String,
      required: true,
      trim: true,
    },

    portfolioLink: {
      type: String,
      trim: true,
    },

    linkedInProfileLink: {
      type: String,
      trim: true,
    },

    githubProfileLink: {
      type: String,
      trim: true,
    },

    totalYearsOfExperience: {
      type: Number,
      required: true,
      min: [0, "Experience cannot be negative"],
    },

    currentCompany: {
      type: String,
      trim: true,
    },

    currentDesignation: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length > 0,
        message: "At least one skill is required",
      },
    },

    expectedSalary: {
      type: expectedSalarySchema,
      required: true,
    },

    noticePeriodInMonths: {
      type: Number,
      required: true,
      min: [0, "Notice period cannot be negative"],
    },

    isImmediatelyAvailable: {
      type: Boolean,
      required: true,
    },

    coverNote: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ========================
   INDEX STRATEGY
======================== */

applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ userId: 1 });
applicationSchema.index({ createdAt: -1 });

export const ApplicationModel = model<IApplication>(
  "Application",
  applicationSchema
);