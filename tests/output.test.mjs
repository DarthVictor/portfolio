import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");
const cvPath = join(distDirectory, "cv.pdf");

test("build output is static and loads no client-side JavaScript", () => {
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

function expectHeadings(actual, expected) {
    const primaryHeadings = actual.filter(({ level }) => level < 3);

    assert.deepEqual(primaryHeadings, expected);
    assert.equal(actual.filter(({ level }) => level === 1).length, 1);
}
