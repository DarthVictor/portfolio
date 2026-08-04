import type { APIRoute } from "astro";

import { getVisibleWorkEntries } from "../lib/work-content";

const escapeXml = (value: string): string =>
    value.replace(/[<>&'"]/g, (character) => {
        const entities: Record<string, string> = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&apos;",
        };

        return entities[character];
    });

export const GET: APIRoute = async ({ site }) => {
    if (site === undefined) {
        return new Response("Site URL is not configured.", { status: 500 });
    }

    const workEntries = await getVisibleWorkEntries();
    const urls = [
        new URL("/", site),
        new URL("/work/", site),
        ...workEntries.map((entry) => new URL(`/work/${entry.id}/`, site)),
    ];
    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((url) => `  <url><loc>${escapeXml(url.href)}</loc></url>`),
        "</urlset>",
    ].join("\n");

    return new Response(body, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
};
