import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { marked } from "marked";
import { chromium } from "playwright";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "CV.md");
const stylePath = resolve(root, "scripts/styles/cv-print.css");
const outputPath = resolve(root, "public/cv.pdf");

const markdown = (await readFile(inputPath, "utf8")).replace(/^\uFEFF/, "");
const stylesheet = await readFile(stylePath, "utf8");
const content = await marked.parse(markdown, { gfm: true });

const document = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Victor Follet — CV</title>
        <style>${stylesheet}</style>
    </head>
    <body>
        <main class="cv">${content}</main>
    </body>
</html>`;

const browser = await chromium.launch({ headless: true });

try {
    const page = await browser.newPage();

    await page.setContent(document, { waitUntil: "load" });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);

    const pdf = await page.pdf({
        format: "A4",
        preferCSSPageSize: true,
        printBackground: true,
        displayHeaderFooter: false,
    });

    if (pdf.length < 10_000 || pdf.subarray(0, 5).toString() !== "%PDF-") {
        throw new Error("Generated file does not appear to be a valid PDF.");
    }

    await writeFile(outputPath, pdf);
    console.log(`Generated ${outputPath}`);
} finally {
    await browser.close();
}
