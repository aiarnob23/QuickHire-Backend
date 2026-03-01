import { z } from "zod";
import { ApplicationStatus, ExpectedSalaryCurrency } from "./applications.interface";



const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ObjectId");

const statusSchema = z.enum(
    Object.values(ApplicationStatus) as [
        ApplicationStatus,
        ...ApplicationStatus[]
    ]
);

const currencySchema = z.enum(
    Object.values(ExpectedSalaryCurrency) as [
        ExpectedSalaryCurrency,
        ...ExpectedSalaryCurrency[]
    ]
);

//CREATE APPLICATION

export const ApplicationValidation = {
    create: z
        .object({
            jobId: objectIdSchema,
            userId: objectIdSchema,

            name: z.string().min(2).max(150).trim(),
            email: z.string().email().max(255).trim().toLowerCase(),
            phoneNumber: z.string().min(6).max(20).trim(),

            resumeLink: z.string().url(),

            portfolioLink: z.string().url().optional(),
            linkedInProfileLink: z.string().url().optional(),
            githubProfileLink: z.string().url().optional(),

            totalYearsOfExperience: z
                .number()
                .nonnegative("Experience cannot be negative"),

            currentCompany: z.string().max(150).trim().optional(),
            currentDesignation: z.string().max(150).trim().optional(),

            skills: z
                .array(z.string().min(1).trim())
                .min(1, "At least one skill is required"),

            expectedSalary: z.object({
                amount: z.number().nonnegative("Salary cannot be negative"),
                currency: currencySchema,
            }),

            noticePeriodInMonths: z
                .number()
                .nonnegative("Notice period cannot be negative"),

            isImmediatelyAvailable: z.boolean(),

            coverNote: z.string().max(2000).optional(),

            status: statusSchema.optional(),
        })
        .strict()
        .refine(
            (data) => {
                if (data.isImmediatelyAvailable) {
                    return data.noticePeriodInMonths === 0;
                }
                return true;
            },
            {
                message:
                    "If immediately available, noticePeriodInMonths must be 0",
                path: ["noticePeriodInMonths"],
            }
        ),

    // UPDATE APPLICATION

    update: z
        .object({
            status: statusSchema.optional(),
            noticePeriodInMonths: z.number().nonnegative().optional(),
            isImmediatelyAvailable: z.boolean().optional(),
            coverNote: z.string().max(2000).optional(),
        })
        .strict(),

    /* =====================================
       PARAM VALIDATION
    ===================================== */

    params: {
        applicationId: z.object({
            applicationId: objectIdSchema,
        }),
    },
};


// TYPES


export type CreateApplicationInput = z.infer<
    typeof ApplicationValidation.create
>;

export type UpdateApplicationInput = z.infer<
    typeof ApplicationValidation.update
>;