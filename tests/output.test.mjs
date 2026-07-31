import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");
const themeAPath = join(distDirectory, "theme-a", "index.html");
const themeBPath = join(distDirectory, "theme-b", "index.html");
const themeCPath = join(distDirectory, "theme-c", "index.html");
const themeDPath = join(distDirectory, "theme-d", "index.html");
const cvPath = join(distDirectory, "cv.pdf");

test("build output is static and loads no bundled client-side JavaScript", () => {
    assert.equal(existsSync(indexPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");

    assert.match(
        indexHtml,
        /<link rel="stylesheet" href="\/_astro\/[^"']+\.css"/,
    );
    assert.doesNotMatch(indexHtml, /_astro\/[^"']+\.js/);
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

test("preview palettes build in isolation without development-only controls", () => {
    assert.equal(existsSync(themeAPath), true);
    assert.equal(existsSync(themeBPath), true);
    assert.equal(existsSync(themeCPath), true);
    assert.equal(existsSync(themeDPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");
    const themeAHtml = readFileSync(themeAPath, "utf8");
    const themeBHtml = readFileSync(themeBPath, "utf8");
    const themeCHtml = readFileSync(themeCPath, "utf8");
    const themeDHtml = readFileSync(themeDPath, "utf8");

    assert.match(indexHtml, /data-palette="paper-terracotta"/);
    assert.match(themeAHtml, /data-palette="paper"/);
    assert.match(themeBHtml, /data-palette="atlantic"/);
    assert.match(themeCHtml, /data-palette="linen"/);
    assert.match(themeDHtml, /data-palette="lilac"/);
    assert.match(indexHtml, /--color-background:#f3f0e9/);
    assert.match(indexHtml, /--color-accent:#a34124/);
    assert.doesNotMatch(
        indexHtml,
        /#edf3f8|#f2f1e9|#f3f0f6|#0d1424|#0b1620|#0f1814|#17121d/,
    );
    assert.match(themeAHtml, /--color-background:#f3f0e9/);
    assert.match(themeAHtml, /--color-accent:#3155d8/);
    assert.doesNotMatch(themeAHtml, /#a34124/);
    assert.match(themeBHtml, /--color-background:#edf3f8/);
    assert.doesNotMatch(
        themeBHtml,
        /#f3f0e9|#f2f1e9|#f3f0f6|#0d1424|#0b1620|#0f1814|#17121d/,
    );
    assert.match(themeCHtml, /--color-background:#f2f1e9/);
    assert.doesNotMatch(
        themeCHtml,
        /#f3f0e9|#edf3f8|#f3f0f6|#0d1424|#0b1620|#0f1814|#17121d/,
    );
    assert.match(themeDHtml, /--color-background:#f3f0f6/);
    assert.doesNotMatch(
        themeDHtml,
        /#f3f0e9|#edf3f8|#f2f1e9|#0d1424|#0b1620|#0f1814|#17121d/,
    );
    for (const previewHtml of [
        themeAHtml,
        themeBHtml,
        themeCHtml,
        themeDHtml,
    ]) {
        assert.match(previewHtml, /<meta name="robots" content="noindex">/);
        assert.doesNotMatch(previewHtml, /theme-comparison/);
        assert.doesNotMatch(previewHtml, /data-mode-option=/);
        assert.doesNotMatch(previewHtml, /portfolio-color-mode/);
        assert.match(
            previewHtml,
            /<link rel="stylesheet" href="\/_astro\/[^"']+\.css"/,
        );
        assert.doesNotMatch(previewHtml, /_astro\/[^"']+\.js/);
    }

    assert.doesNotMatch(indexHtml, /theme-comparison/);
    assert.doesNotMatch(indexHtml, /data-mode-option=/);
    assert.doesNotMatch(indexHtml, /portfolio-color-mode/);
    assert.doesNotMatch(
        readLinkedStylesheets(indexHtml),
        /theme-comparison|appearance-option|#edf3f8|#f2f1e9|#f3f0f6|#0d1424|#0b1620|#0f1814|#17121d/,
    );
});

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
