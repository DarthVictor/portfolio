import { describe, expect, it } from "vitest";

import {
    createWritingStaticPaths,
    getSortedVisibleWritingEntries,
    getWritingHref,
    sortWritingEntries,
} from "../../src/lib/writing-entries";

const entry = (
    id: string,
    data: Partial<{ draft: boolean; publishedAt: Date; title: string }> = {},
) => ({
    id,
    data: {
        draft: false,
        publishedAt: new Date("2026-01-01"),
        title: id,
        ...data,
    },
});

describe("sortWritingEntries", () => {
    it("puts the newest article first and breaks ties by title", () => {
        const entries = [
            entry("older", { publishedAt: new Date("2025-06-01") }),
            entry("zebra", { title: "Zebra" }),
            entry("alpha", { title: "Alpha" }),
        ];

        expect(sortWritingEntries(entries).map(({ id }) => id)).toEqual([
            "alpha",
            "zebra",
            "older",
        ]);
    });
});

describe("writing visibility and paths", () => {
    const entries = [entry("published"), entry("draft", { draft: true })];

    it("excludes drafts from production listings and routes", () => {
        const production = { mode: "production", vercelEnv: "production" };

        expect(
            getSortedVisibleWritingEntries(entries, production).map(
                ({ id }) => id,
            ),
        ).toEqual(["published"]);
        expect(
            createWritingStaticPaths(entries, production).map(
                ({ params }) => params.slug,
            ),
        ).toEqual(["published"]);
    });

    it("includes drafts on preview deployments", () => {
        expect(
            getSortedVisibleWritingEntries(entries, {
                mode: "production",
                vercelEnv: "preview",
            }).map(({ id }) => id),
        ).toEqual(["draft", "published"]);
    });

    it("builds trailing-slash article URLs", () => {
        expect(getWritingHref("one-server")).toBe("/writing/one-server/");
    });
});
