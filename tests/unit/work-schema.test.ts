import { describe, expect, it } from "vitest";

import { workSchema } from "../../src/lib/work-schema";

const validEntry = {
    title: "Example work",
    summary: "An example work summary.",
    employerLabel: "Example",
    role: "Engineer",
    period: "2026",
    evidence: {
        problem: "A clear problem.",
        scope: "A defined scope.",
        decision: "An explicit decision.",
        outcome: "A verifiable outcome.",
    },
    disciplines: ["Frontend"],
    technologies: ["TypeScript"],
    cover: {
        src: "/images/work/example.svg",
        alt: "An abstract example cover.",
        width: 1600,
        height: 900,
    },
    seoDescription: "An example case study.",
    confidentiality: "public" as const,
};

describe("workSchema publication contract", () => {
    it("allows drafts without a publication date", () => {
        const result = workSchema.safeParse({ ...validEntry, draft: true });

        expect(result.success).toBe(true);
    });

    it("rejects published entries without a publication date", () => {
        const result = workSchema.safeParse({ ...validEntry, draft: false });

        expect(result.success).toBe(false);
        expect(result.error?.issues).toContainEqual(
            expect.objectContaining({
                message: "Published work entries require publishedAt.",
                path: ["publishedAt"],
            }),
        );
    });

    it("coerces the publication date for published entries", () => {
        const result = workSchema.safeParse({
            ...validEntry,
            draft: false,
            publishedAt: "2026-08-01",
        });

        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data.publishedAt).toBeInstanceOf(Date);
        }
    });

    it("coerces an optional modified date", () => {
        const result = workSchema.safeParse({
            ...validEntry,
            draft: false,
            publishedAt: "2026-08-01",
            updatedAt: "2026-08-14",
        });

        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data.updatedAt).toBeInstanceOf(Date);
        }
    });
});
