import { z } from "astro/zod";

export const workSchema = z
    .object({
        title: z.string(),
        summary: z.string(),
        employerLabel: z.string(),
        role: z.string(),
        period: z.string(),
        evidence: z.object({
            problem: z.string(),
            scope: z.string(),
            decision: z.string(),
            outcome: z.string(),
        }),
        disciplines: z.array(z.string()).min(1),
        technologies: z.array(z.string()).min(1),
        featured: z.boolean().default(false),
        featuredOrder: z.number().int().nonnegative().optional(),
        draft: z.boolean().default(false),
        publishedAt: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        cover: z.object({
            src: z.string(),
            alt: z.string(),
            width: z.number().int().positive(),
            height: z.number().int().positive(),
        }),
        socialImage: z
            .object({
                src: z.string(),
                alt: z.string(),
                width: z.number().int().positive(),
                height: z.number().int().positive(),
            })
            .optional(),
        seoDescription: z.string(),
        confidentiality: z.enum(["public", "anonymized", "private"]),
    })
    .superRefine((data, context) => {
        if (!data.draft && data.publishedAt === undefined) {
            context.addIssue({
                code: "custom",
                message: "Published work entries require publishedAt.",
                path: ["publishedAt"],
            });
        }
    });
