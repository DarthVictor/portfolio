import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import {
    assertNoClientJavaScript,
    assertRootRelativeLinksResolve,
    cvPath,
    distDirectory,
    draftCaseStudies,
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
        { level: 1, text: "Victor Follet, senior product engineer" },
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
    assert.equal(existsSync(cvPath), true);

    for (const { slug } of draftCaseStudies) {
        assert.doesNotMatch(indexHtml, new RegExp(`/work/${slug}/`));
    }
});

test("production work archive stays empty and contains no draft routes", () => {
    const workHtml = readOutput(workIndexPath);

    assert.match(workHtml, /<h1[^>]*>Work<\/h1>/);
    assert.match(workHtml, /Case studies are being prepared/);
    assert.match(workHtml, /href="\/work"[^>]*aria-current="page"/);
    assert.match(workHtml, /href="\/#experience-heading"/);
    assert.match(workHtml, /href="\/#about-heading"/);
    assert.match(workHtml, /href="\/#contact-heading"/);
    assert.match(workHtml, /href="#top"/);
    assertNoClientJavaScript(workHtml, "production work archive");

    for (const { slug, title } of draftCaseStudies) {
        assert.equal(existsSync(workPagePath(slug)), false);
        assert.doesNotMatch(workHtml, new RegExp(escapeRegExp(title)));
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
    assertRootRelativeLinksResolve([indexPath, workIndexPath]);
});

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
