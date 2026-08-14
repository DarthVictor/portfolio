import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
    assertNoClientJavaScript,
    assertRootRelativeLinksResolve,
    cvPath,
    distDirectory,
    caseStudies,
    expectHeadings,
    indexPath,
    readOutput,
    readPageStyles,
    workIndexPath,
    workPagePath,
} from "./output-helpers.mjs";

const removedThemePaths = ["theme-a", "theme-b", "theme-c", "theme-d"].map(
    (theme) => join(distDirectory, theme, "index.html"),
);

test("production output is static and loads no bundled client-side JavaScript", () => {
    const indexHtml = readOutput(indexPath);

    assert.match(
        indexHtml,
        /<link rel="stylesheet" href="\/_astro\/[^"']+\.css"/,
    );
    assertNoClientJavaScript(indexHtml, "production homepage");
});

test("production homepage has the planned semantic structure", () => {
    const indexHtml = readOutput(indexPath);
    const mainMatch = indexHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/);

    assert.ok(mainMatch);
    assert.equal((mainMatch[1].match(/<section\b/g) ?? []).length, 6);

    const headings = [
        ...indexHtml.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g),
    ].map(([, level, content]) => ({
        level: Number(level),
        text: content
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim(),
    }));

    expectHeadings(headings, [
        { level: 1, text: "Victor Follet, senior full-stack engineer" },
        { level: 2, text: "Selected work" },
        { level: 2, text: "Experience" },
        { level: 2, text: "Capabilities" },
        { level: 2, text: "How I work" },
        { level: 2, text: "Contact" },
    ]);
    assert.match(indexHtml, /href="\/work\/"/);
    assert.match(indexHtml, /href="\/#experience-heading"/);
    assert.match(indexHtml, /href="\/#about-heading"/);
    assert.match(indexHtml, /href="\/#contact-heading"/);
    assert.match(indexHtml, /Discuss an engineering role/);
    assert.match(indexHtml, /href="\/cv\.pdf"/);
    assert.match(
        indexHtml,
        /<link rel="canonical" href="https:\/\/darthvictor\.xyz\/"/,
    );
    assert.match(indexHtml, /<link rel="sitemap" href="\/sitemap\.xml"/);
    assert.match(
        indexHtml,
        /<meta property="og:image" content="https:\/\/darthvictor\.xyz\/images\/social-preview\.jpg"/,
    );
    assert.match(
        indexHtml,
        /<meta name="twitter:card" content="summary_large_image"/,
    );
    assert.match(indexHtml, /"@type":"Person"/);
    assert.match(indexHtml, /"@type":"ProfilePage"/);
    assert.match(indexHtml, /"jobTitle":"Senior Full-Stack Engineer"/);
    assert.match(
        indexHtml,
        /<meta property="og:image:alt" content="Victor Follet, Senior Full-Stack Engineer"/,
    );
    assert.match(indexHtml, /"@type":"WebSite"/);
    assert.equal(existsSync(cvPath), true);

    for (const { slug } of caseStudies) {
        assert.match(indexHtml, new RegExp(`href="/work/${slug}/"`));
    }
});

test("production publishes a sitemap containing only public portfolio routes", () => {
    const sitemap = readOutput(join(distDirectory, "sitemap.xml"));
    const robots = readOutput(join(distDirectory, "robots.txt"));

    assert.match(
        sitemap,
        /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/,
    );
    assert.match(sitemap, /<loc>https:\/\/darthvictor\.xyz\/<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/darthvictor\.xyz\/work\/<\/loc>/);

    for (const { slug } of caseStudies) {
        assert.match(
            sitemap,
            new RegExp(`<loc>https://darthvictor\\.xyz/work/${slug}/</loc>`),
        );
    }

    const urlCount = (sitemap.match(/<url>/g) ?? []).length;
    const lastmodCount = (
        sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) ?? []
    ).length;
    const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        ([, location]) => location,
    );
    const sitemapLastModifiedDates = [
        ...sitemap.matchAll(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g),
    ].map(([, date]) => date);

    assert.equal(urlCount, caseStudies.length + 2);
    assert.equal(lastmodCount, caseStudies.length);
    assert.equal(new Set(sitemapLocations).size, sitemapLocations.length);
    assert.equal(
        sitemapLocations.every((location) =>
            location.startsWith("https://darthvictor.xyz/"),
        ),
        true,
    );
    assert.equal(
        sitemapLastModifiedDates.every((date) => new Date(date) <= new Date()),
        true,
    );
    assert.doesNotMatch(
        sitemap,
        /<url><loc>https:\/\/darthvictor\.xyz\/<\/loc><lastmod>/,
    );
    assert.doesNotMatch(
        sitemap,
        /<url><loc>https:\/\/darthvictor\.xyz\/work\/<\/loc><lastmod>/,
    );

    assert.match(robots, /User-agent: \*/);
    assert.match(robots, /Allow: \//);
    assert.match(robots, /Sitemap: https:\/\/darthvictor\.xyz\/sitemap\.xml/);
});

test("production work archive contains published case studies and routes", () => {
    const workHtml = readOutput(workIndexPath);
    const cardCount = (workHtml.match(/class="archive-card"/g) ?? []).length;

    assert.match(workHtml, /<h1[^>]*>Work<\/h1>/);
    assert.match(workHtml, /"@type":"BreadcrumbList"/);
    assert.equal(cardCount, caseStudies.length);
    assert.doesNotMatch(workHtml, /Case studies are being prepared/);
    assert.match(workHtml, /href="\/work\/"[^>]*aria-current="page"/);
    assert.match(workHtml, /href="\/#experience-heading"/);
    assert.match(workHtml, /href="\/#about-heading"/);
    assert.match(workHtml, /href="\/#contact-heading"/);
    assert.match(workHtml, /href="#top"/);
    assertNoClientJavaScript(workHtml, "production work archive");

    for (const {
        slug,
        title,
        cover,
        coverAspectRatio,
        optimizedImageCount,
    } of caseStudies) {
        const caseStudyHtml = readOutput(workPagePath(slug));

        assert.match(workHtml, new RegExp(`href="/work/${slug}/"`));
        assert.match(workHtml, new RegExp(escapeRegExp(title)));
        assert.doesNotMatch(
            caseStudyHtml,
            /<meta name="robots" content="noindex, nofollow"/,
        );
        assert.doesNotMatch(caseStudyHtml, /draft-label/);
        assert.match(
            caseStudyHtml,
            new RegExp(
                `<link rel="canonical" href="https://darthvictor\\.xyz/work/${slug}/"`,
            ),
        );
        assert.doesNotMatch(caseStudyHtml, /images\/social-preview\.jpg/);
        assert.match(
            caseStudyHtml,
            /<meta property="og:image" content="https:\/\/darthvictor\.xyz\/(?:_astro\/|images\/work\/)[^"']+"/,
        );
        assert.match(
            caseStudyHtml,
            /<meta property="og:image:alt" content="[^"']+"/,
        );
        assert.match(
            caseStudyHtml,
            /<meta property="og:type" content="article"/,
        );
        assert.match(
            caseStudyHtml,
            /<meta property="article:published_time" content="[^"']+"/,
        );
        assert.match(caseStudyHtml, /"@type":"Article"/);
        assert.match(caseStudyHtml, /"@type":"BreadcrumbList"/);
        assert.match(caseStudyHtml, /Written by Victor Follet/);
        assert.match(
            caseStudyHtml,
            new RegExp(`<h1[^>]*>${escapeRegExp(title)}</h1>`),
        );
        assert.match(
            caseStudyHtml,
            /<h2 id="evidence-heading"[^>]*>At a glance<\/h2>/,
        );
        assert.match(
            caseStudyHtml,
            new RegExp(
                `<figure class="cover" style="--cover-aspect-ratio: ${escapeRegExp(coverAspectRatio)}"[^>]*>`,
            ),
        );

        for (const label of [
            "Problem",
            "My scope",
            "Key decision",
            "Outcome",
        ]) {
            assert.match(caseStudyHtml, new RegExp(`<dt[^>]*>${label}</dt>`));
        }

        if (optimizedImageCount === 0) {
            assert.match(
                caseStudyHtml,
                new RegExp(`<img[^>]*src="${escapeRegExp(cover)}"`),
            );
        } else {
            assert.equal(
                (caseStudyHtml.match(/<picture\b/g) ?? []).length,
                optimizedImageCount,
            );
            assert.match(caseStudyHtml, /<source[^>]*type="image\/avif"/);
            assert.match(caseStudyHtml, /<source[^>]*type="image\/webp"/);
        }

        assertNoClientJavaScript(caseStudyHtml, `production ${slug}`);
    }

    assert.match(
        readOutput(workPagePath("tolstoy-ai-integrations")),
        /<meta name="description" content="Lessons from building 30\+ third-party AI integrations for Tolstoy AI Studio, covering product design, access, testing, and operations\."/,
    );
    assert.match(
        readOutput(workPagePath("tolstoy-ai-integrations")),
        /<span class="work-image" style="--work-image-aspect-ratio: 910 \/ 739"[^>]*>/,
    );
});

test("production uses only the system-aware Paper Terracotta palette", () => {
    const indexHtml = readOutput(indexPath);
    const styles = readPageStyles(indexHtml);

    for (const themePath of removedThemePaths) {
        assert.equal(existsSync(themePath), false);
    }

    assert.doesNotMatch(indexHtml, /data-palette|theme-comparison/);
    assert.match(styles, /prefers-color-scheme:\s*light/);
    assert.match(styles, /data-theme=["']?dark["']?/);
    assert.match(styles, /data-theme=["']?light["']?/);
    assert.match(styles, /--color-background:\s*#0d1424/);
    assert.match(styles, /--color-background:\s*#f3f0e9/);
    assert.match(styles, /--color-accent:\s*#ff9a78/);
    assert.match(styles, /--color-accent:\s*#a34124/);
    assert.match(styles, /outline-color:\s*var\(--color-panel-accent\)/);
});

test("production root-relative links resolve", () => {
    assertRootRelativeLinksResolve([
        indexPath,
        workIndexPath,
        ...caseStudies.map(({ slug }) => workPagePath(slug)),
    ]);
});

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
