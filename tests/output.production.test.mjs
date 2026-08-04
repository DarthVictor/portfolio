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
        { level: 1, text: "Victor Follet, senior frontend engineer" },
        { level: 2, text: "Selected work" },
        { level: 2, text: "Experience" },
        { level: 2, text: "Capabilities" },
        { level: 2, text: "How I work" },
        { level: 2, text: "Contact" },
    ]);
    assert.match(indexHtml, /href="\/work"/);
    assert.match(indexHtml, /href="\/#experience-heading"/);
    assert.match(indexHtml, /href="\/#about-heading"/);
    assert.match(indexHtml, /href="\/#contact-heading"/);
    assert.match(indexHtml, /href="\/cv\.pdf"/);
    assert.match(
        indexHtml,
        /<link rel="canonical" href="https:\/\/darthvictor\.xyz\/"/,
    );
    assert.match(
        indexHtml,
        /<meta property="og:image" content="https:\/\/darthvictor\.xyz\/images\/social-preview\.jpg"/,
    );
    assert.match(indexHtml, /<meta name="twitter:card" content="summary_large_image"/);
    assert.equal(existsSync(cvPath), true);

    for (const { slug } of caseStudies) {
        assert.match(indexHtml, new RegExp(`href="/work/${slug}/"`));
    }
});

test("production work archive contains published case studies and routes", () => {
    const workHtml = readOutput(workIndexPath);
    const cardCount = (workHtml.match(/class="archive-card"/g) ?? []).length;

    assert.match(workHtml, /<h1[^>]*>Work<\/h1>/);
    assert.equal(cardCount, caseStudies.length);
    assert.doesNotMatch(workHtml, /Case studies are being prepared/);
    assert.match(workHtml, /href="\/work"[^>]*aria-current="page"/);
    assert.match(workHtml, /href="\/#experience-heading"/);
    assert.match(workHtml, /href="\/#about-heading"/);
    assert.match(workHtml, /href="\/#contact-heading"/);
    assert.match(workHtml, /href="#top"/);
    assertNoClientJavaScript(workHtml, "production work archive");

    for (const { slug, title, cover, additionalImage } of caseStudies) {
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
        assert.match(
            caseStudyHtml,
            /<meta property="og:image" content="https:\/\/darthvictor\.xyz\/images\/social-preview\.jpg"/,
        );
        assert.match(
            caseStudyHtml,
            new RegExp(`<h1[^>]*>${escapeRegExp(title)}</h1>`),
        );
        assert.match(
            caseStudyHtml,
            /<h2 id="evidence-heading"[^>]*>At a glance<\/h2>/,
        );

        for (const label of ["Problem", "My scope", "Key decision", "Outcome"]) {
            assert.match(caseStudyHtml, new RegExp(`<dt[^>]*>${label}<\/dt>`));
        }

        assert.match(
            caseStudyHtml,
            new RegExp(`<img[^>]*src="${escapeRegExp(cover)}"`),
        );

        if (additionalImage) {
            assert.match(caseStudyHtml, new RegExp(escapeRegExp(additionalImage)));
        }

        assertNoClientJavaScript(caseStudyHtml, `production ${slug}`);
    }
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
