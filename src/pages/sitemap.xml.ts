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

const toW3CDate = (date: Date): string => date.toISOString().slice(0, 10);

const getLatestDate = (dates: readonly Date[]): Date | undefined =>
    dates.reduce<Date | undefined>(
        (latest, date) =>
            latest === undefined || date > latest ? date : latest,
        undefined,
    );

export const GET: APIRoute = async ({ site }) => {
    if (site === undefined) {
        return new Response("Site URL is not configured.", { status: 500 });
    }

    const workEntries = await getVisibleWorkEntries();
    const publishedDates = workEntries
        .map((entry) => entry.data.publishedAt)
        .filter((date): date is Date => date !== undefined);
    // Landing and archive pages both change whenever the newest case study does.
    const latestPublishedAt = getLatestDate(publishedDates);
    const entries: { url: URL; lastmod: Date | undefined }[] = [
        { url: new URL("/", site), lastmod: latestPublishedAt },
        { url: new URL("/work/", site), lastmod: latestPublishedAt },
        ...workEntries.map((entry) => ({
            url: new URL(`/work/${entry.id}/`, site),
            lastmod: entry.data.publishedAt,
        })),
    ];
    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries.map(({ url, lastmod }) => {
            const location = `<loc>${escapeXml(url.href)}</loc>`;
            const modified =
                lastmod === undefined
                    ? ""
                    : `<lastmod>${toW3CDate(lastmod)}</lastmod>`;

            return `  <url>${location}${modified}</url>`;
        }),
        "</urlset>",
    ].join("\n");

    return new Response(body, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
};
