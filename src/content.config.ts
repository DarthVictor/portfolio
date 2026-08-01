import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { workSchema } from "./lib/work-schema";

const work = defineCollection({
    loader: glob({
        base: "./src/content/work",
        pattern: "**/*.{md,mdx}",
    }),
    schema: workSchema,
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
