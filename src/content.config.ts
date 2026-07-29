import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
    loader: glob({
        base: "./src/content/work",
        pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        employerLabel: z.string(),
        role: z.string(),
        period: z.string(),
        disciplines: z.array(z.string()).min(1),
        technologies: z.array(z.string()).min(1),
        featured: z.boolean().default(false),
        featuredOrder: z.number().int().nonnegative().optional(),
        draft: z.boolean().default(false),
        publishedAt: z.coerce.date(),
        cover: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        seoDescription: z.string(),
        confidentiality: z.enum(["public", "anonymized", "private"]),
    }),
});

const decisions = defineCollection({
    loader: glob({
        base: "./src/content/decisions",
        pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        summary: z.string(),
        status: z.enum(["proposed", "accepted", "superseded", "deprecated"]),
        tags: z.array(z.string()).min(1),
        relatedWork: reference("work").optional(),
        draft: z.boolean().default(false),
    }),
});

const writing = defineCollection({
    loader: glob({
        base: "./src/content/writing",
        pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        tags: z.array(z.string()).min(1),
        draft: z.boolean().default(false),
    }),
});

export const collections = { work, decisions, writing };
