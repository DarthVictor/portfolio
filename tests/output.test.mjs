import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");
const removedThemePaths = ["theme-a", "theme-b", "theme-c", "theme-d"].map(
    (theme) => join(distDirectory, theme, "index.html"),
);
const cvPath = join(distDirectory, "cv.pdf");

test("build output is static and loads no bundled client-side JavaScript", () => {
    assert.equal(existsSync(indexPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");

    assert.match(
        indexHtml,
        /<link rel="stylesheet" href="\/_astro\/[^"']+\.css"/,
    );
    assert.doesNotMatch(indexHtml, /_astro\/[^"']+\.js/);
    assert.doesNotMatch(indexHtml, /<script\b/);
});

test("homepage output has the planned semantic structure", () => {
    assert.equal(existsSync(indexPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");
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
    assert.match(indexHtml, /href="\/cv\.pdf"/);
    assert.equal(existsSync(cvPath), true);
});

test("production uses only the system-aware Paper Terracotta palette", () => {
    const indexHtml = readFileSync(indexPath, "utf8");
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

function readPageStyles(html) {
    const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .map(([, styles]) => styles)
        .join("\n");

    return `${inlineStyles}\n${readLinkedStylesheets(html)}`;
}

function readLinkedStylesheets(html) {
    return [...html.matchAll(/href="(\/_astro\/[^"']+\.css)"/g)]
        .map(([, stylesheetPath]) =>
            readFileSync(join(distDirectory, stylesheetPath), "utf8"),
        )
        .join("\n");
}

function expectHeadings(actual, expected) {
    const primaryHeadings = actual.filter(({ level }) => level < 3);

    assert.deepEqual(primaryHeadings, expected);
    assert.equal(actual.filter(({ level }) => level === 1).length, 1);
}
