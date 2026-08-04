import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
    if (site === undefined) {
        return new Response("Site URL is not configured.", { status: 500 });
    }

    const sitemapUrl = new URL("/sitemap.xml", site);
    const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};
