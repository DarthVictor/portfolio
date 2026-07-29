import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const distDirectory = join(process.cwd(), "dist");
const indexPath = join(distDirectory, "index.html");

test("build output is static and loads no client-side JavaScript", () => {
    assert.equal(existsSync(indexPath), true);

    const indexHtml = readFileSync(indexPath, "utf8");

    assert.doesNotMatch(indexHtml, /_astro\/[^"']+\.js/);
});
