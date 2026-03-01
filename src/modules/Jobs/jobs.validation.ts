import { z } from "zod";
import {
    JobType,
    JobStatus,
    WorkSetting,
    ExperienceLevel,
    SalaryCurrency,
} from "./jobs.interface";



// Mongo ObjectId
const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ObjectId");

// Enums
const jobTypeSchema = z.enum(
    Object.values(JobType) as [JobType, ...JobType[]]
);
const jobStatusSchema = z.enum(
    Object.values(JobStatus) as [JobStatus, ...JobStatus[]]
);
const workSettingSchema = z.enum(
    Object.values(WorkSetting) as [WorkSetting, ...WorkSetting[]]
);
const experienceLevelSchema = z.enum(
    Object.values(ExperienceLevel) as [ExperienceLevel, ...ExperienceLevel[]]
);
const salaryCurrencySchema = z.enum(
    Object.values(SalaryCurrency) as [SalaryCurrency, ...SalaryCurrency[]]
);

// ----------------JOB VALIDATION------------------------------
export const JobValidation = {
    /* --------------------
       CREATE JOB
    -------------------- */
    create: z
        .object({
            title: z.string().min(3).max(200).trim(),
            company: z.string().min(2).max(200).trim(),
            location: z.string().min(2).max(200).trim(),
            jobType: jobTypeSchema,
            workSetting: workSettingSchema,
            categories: z
                .array(z.string().min(2))
                .min(1, "At least one category is required"),
            experienceLevel: experienceLevelSchema.optional(),
            shortDescription: z.string().max(500).trim().optional(),
            description: z.string().min(10),
            requirements: z
                .array(z.string().min(2))
                .min(1, "At least one requirement is required"),

            responsibilities: z.array(z.string().min(2)).optional(),
            salaryRange: z
                .object({
                    min: z.number().nonnegative(),
                    max: z.number().nonnegative(),
                    currency: salaryCurrencySchema,
                })
                .refine((data) => data.max >= data.min, {
                    message: "Max salary must be greater than or equal to min salary",
                    path: ["max"],
                })
                .strict()
                .optional(),
            companyWebsite: z.string().url().optional(),
            companyLogo: z.string().url().optional(),

            isFeatured: z.boolean().optional(),
            status: jobStatusSchema.optional(),
            expiresAt: z
                .preprocess(
                    (arg) => (arg ? new Date(arg as string) : undefined),
                    z.date()
                )
                .refine(
                    (date) => date.getTime() > Date.now(),
                    { message: "Expiry date must be in the future" }
                )
                .optional(),
        })
        .strict(),

    /* --------------------
       UPDATE JOB
    -------------------- */
    update: z
        .object({
            title: z.string().min(3).max(200).trim().optional(),
            company: z.string().min(2).max(200).trim().optional(),
            location: z.string().min(2).max(200).trim().optional(),
            jobType: jobTypeSchema.optional(),
            workSetting: workSettingSchema.optional(),
            categories: z.array(z.string().min(2)).optional(),
            experienceLevel: experienceLevelSchema.optional(),
            shortDescription: z.string().max(500).trim().optional(),
            description: z.string().min(10).optional(),
            requirements: z.array(z.string().min(2)).optional(),
            responsibilities: z.array(z.string().min(2)).optional(),
            salaryRange: z
                .object({
                    min: z.number().nonnegative(),
                    max: z.number().nonnegative(),
                    currency: salaryCurrencySchema,
                })
                .refine((data) => data.max >= data.min, {
                    message: "Max salary must be greater than or equal to min salary",
                    path: ["max"],
                })
                .strict()
                .optional(),
            companyWebsite: z.string().url().optional(),
            companyLogo: z.string().url().optional(),

            isFeatured: z.boolean().optional(),
            status: jobStatusSchema.optional(),
            expiresAt: z
                .preprocess(
                    (arg) => (arg ? new Date(arg as string) : undefined),
                    z.date()
                )
                .refine(
                    (date) => date.getTime() > Date.now(),
                    { message: "Expiry date must be in the future" }
                )
                .optional(),
        })
        .strict(),

    /* --------------------
       QUERY FILTER
    -------------------- */
    query: z
        .object({
            search: z.string().trim().min(1).optional(),
            category: z.string().trim().min(1).optional(),
            location: z.string().optional(),
            jobType: jobTypeSchema.optional(),
            workSetting: workSettingSchema.optional(),
            status: jobStatusSchema.optional(),
            featured: z
                .enum(["true", "false"])
                .transform((val) => val === "true")
                .optional(),
        })
        .strict(),

    /* --------------------
       PARAM VALIDATION
    -------------------- */
    params: {
        jobId: z.object({
            jobId: objectIdSchema,
        }),
    },
};

/* =====================================================
   TYPE EXPORTS
===================================================== */

export type CreateJobInput = z.infer<typeof JobValidation.create>;
export type UpdateJobInput = z.infer<typeof JobValidation.update>;
export type JobQueryInput = z.infer<typeof JobValidation.query>;