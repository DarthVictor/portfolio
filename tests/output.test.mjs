import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");
const themeBPath = join(distDirectory, "theme-b", "index.html");
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

test("alternate palette builds without development-only theme controls", () => {
    assert.equal(existsSync(themeBPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");
    const themeBHtml = readFileSync(themeBPath, "utf8");

    assert.match(indexHtml, /data-palette="paper"/);
    assert.match(themeBHtml, /data-palette="atlantic"/);
    assert.match(themeBHtml, /<meta name="robots" content="noindex">/);
    assert.match(indexHtml, /--color-background:#f3f0e9/);
    assert.doesNotMatch(indexHtml, /#edf3f8|#0d1424|#0b1620/);
    assert.match(themeBHtml, /--color-background:#edf3f8/);
    assert.doesNotMatch(themeBHtml, /#f3f0e9|#0d1424|#0b1620/);
    assert.doesNotMatch(indexHtml, /theme-comparison/);
    assert.doesNotMatch(themeBHtml, /theme-comparison/);
    assert.doesNotMatch(indexHtml, /data-mode-option=/);
    assert.doesNotMatch(themeBHtml, /data-mode-option=/);
    assert.doesNotMatch(indexHtml, /portfolio-color-mode/);
    assert.doesNotMatch(themeBHtml, /portfolio-color-mode/);
    assert.doesNotMatch(
        readLinkedStylesheets(indexHtml),
        /theme-comparison|appearance-option|#edf3f8|#0d1424|#0b1620/,
    );
    assert.match(
        themeBHtml,
        /<link rel="stylesheet" href="\/_astro\/[^"']+\.css"/,
    );
    assert.doesNotMatch(themeBHtml, /_astro\/[^"']+\.js/);
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
