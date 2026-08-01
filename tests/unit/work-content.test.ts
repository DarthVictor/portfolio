import { describe, expect, it } from "vitest";

import {
    createWorkStaticPaths,
    getWorkHref,
    getSortedVisibleWorkEntries,
    sortWorkEntries,
} from "../../src/lib/work-entries";

interface WorkFixture {
    id: string;
    data: {
        draft: boolean;
        featured: boolean;
        featuredOrder?: number;
        publishedAt?: Date;
        title: string;
    };
}

const entry = (
    id: string,
    overrides: Partial<WorkFixture["data"]> = {},
): WorkFixture => ({
    id,
    data: {
        draft: false,
        featured: false,
        publishedAt: new Date("2026-01-01"),
        title: id,
        ...overrides,
    },
});

describe("sortWorkEntries", () => {
    it("orders featured work first by explicit order", () => {
        const entries = [
            entry("regular", { publishedAt: new Date("2026-04-01") }),
            entry("featured-two", { featured: true, featuredOrder: 2 }),
            entry("featured-one", { featured: true, featuredOrder: 1 }),
        ];

        expect(sortWorkEntries(entries).map(({ id }) => id)).toEqual([
            "featured-one",
            "featured-two",
            "regular",
        ]);
    });

    it("uses publication date and title as deterministic fallbacks", () => {
        const entries = [
            entry("older", { publishedAt: new Date("2025-01-01") }),
            entry("zebra", {
                publishedAt: new Date("2026-01-01"),
                title: "Zebra",
            }),
            entry("alpha", {
                publishedAt: new Date("2026-01-01"),
                title: "Alpha",
            }),
        ];

        expect(sortWorkEntries(entries).map(({ id }) => id)).toEqual([
            "alpha",
            "zebra",
            "older",
        ]);
    });

    it("orders entries without publication dates deterministically", () => {
        const entries = [
            entry("zebra", { publishedAt: undefined, title: "Zebra" }),
            entry("published", { publishedAt: new Date("2026-01-01") }),
            entry("alpha", { publishedAt: undefined, title: "Alpha" }),
        ];

        expect(sortWorkEntries(entries).map(({ id }) => id)).toEqual([
            "published",
            "alpha",
            "zebra",
        ]);
    });
});

describe("work visibility and paths", () => {
    const entries = [entry("published"), entry("draft", { draft: true })];

    it("excludes drafts from production work listings", () => {
        expect(
            getSortedVisibleWorkEntries(entries, { mode: "production" }).map(
                ({ id }) => id,
            ),
        ).toEqual(["published"]);
    });

    it("creates preview paths for drafts", () => {
        expect(
            createWorkStaticPaths(entries, {
                mode: "production",
                vercelEnv: "preview",
            }).map(({ params }) => params.slug),
        ).toEqual(["draft", "published"]);
    });

    it("does not create production paths for drafts", () => {
        expect(createWorkStaticPaths(entries, { mode: "production" })).toEqual([
            {
                params: { slug: "published" },
                props: { entry: entries[0] },
            },
        ]);
    });

    it("builds a trailing-slash work URL from an entry ID", () => {
        expect(getWorkHref("example-case-study")).toBe(
            "/work/example-case-study/",
        );
    });
});
