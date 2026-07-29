import { describe, expect, it } from "vitest";

import {
    filterVisibleEntries,
    shouldIncludeDrafts,
} from "../../src/lib/content-visibility";

describe("shouldIncludeDrafts", () => {
    it("includes drafts during local development", () => {
        expect(shouldIncludeDrafts({ mode: "development" })).toBe(true);
    });

    it("includes drafts on Vercel preview deployments", () => {
        expect(
            shouldIncludeDrafts({
                mode: "production",
                vercelEnv: "preview",
            }),
        ).toBe(true);
    });

    it("excludes drafts in production", () => {
        expect(shouldIncludeDrafts({ mode: "production" })).toBe(false);
    });

    it("allows SHOW_DRAFTS only for local production checks", () => {
        expect(
            shouldIncludeDrafts({
                mode: "production",
                showDrafts: "true",
            }),
        ).toBe(true);

        expect(
            shouldIncludeDrafts({
                mode: "production",
                vercelEnv: "production",
                showDrafts: "true",
            }),
        ).toBe(false);
    });

    it("filters draft entries with the shared rule", () => {
        const entries = [
            { data: { draft: false }, id: "published" },
            { data: { draft: true }, id: "draft" },
        ];

        expect(filterVisibleEntries(entries, { mode: "production" })).toEqual([
            entries[0],
        ]);
    });
});
