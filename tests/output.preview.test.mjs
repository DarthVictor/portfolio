import assert from "node:assert/strict";
import test from "node:test";

import {
    assertNoClientJavaScript,
    assertRootRelativeLinksResolve,
    caseStudies,
    indexPath,
    readOutput,
    workIndexPath,
    workPagePath,
} from "./output-helpers.mjs";

test("preview work archive contains the published case studies", () => {
    const workHtml = readOutput(workIndexPath);
    const cardCount = (workHtml.match(/class="archive-card"/g) ?? []).length;

    assert.equal(cardCount, caseStudies.length);
    assert.doesNotMatch(workHtml, /Case studies are being prepared/);

    let previousTitleIndex = -1;

    for (const { slug, title } of caseStudies) {
        assert.match(workHtml, new RegExp(`href="/work/${slug}/"`));
        assert.match(workHtml, new RegExp(escapeRegExp(title)));

        const titleIndex = workHtml.indexOf(title);
        assert.ok(titleIndex > previousTitleIndex, `${title} is out of order`);
        previousTitleIndex = titleIndex;
    }

    assertNoClientJavaScript(workHtml, "preview work archive");
});

test("preview homepage links to the approved mapped case studies", () => {
    const indexHtml = readOutput(indexPath);

    for (const { slug, homepage } of caseStudies) {
        const routePattern = new RegExp(`href="/work/${slug}/"`);

        if (homepage) {
            assert.match(indexHtml, routePattern);
        } else {
            assert.doesNotMatch(indexHtml, routePattern);
        }
    }

    assertNoClientJavaScript(indexHtml, "preview homepage");
});

test("every preview case-study route is indexable, stable, and static", () => {
    for (const { slug, title, cover, optimizedImageCount } of caseStudies) {
        const html = readOutput(workPagePath(slug));

        assert.doesNotMatch(
            html,
            /<meta name="robots" content="noindex, nofollow"/,
        );
        assert.doesNotMatch(html, /draft-label/);
        assert.match(html, new RegExp(`<h1[^>]*>${escapeRegExp(title)}</h1>`));
        assert.match(html, /<h2 id="evidence-heading"[^>]*>At a glance<\/h2>/);

        for (const label of [
            "Problem",
            "My scope",
            "Key decision",
            "Outcome",
        ]) {
            assert.match(html, new RegExp(`<dt[^>]*>${label}</dt>`));
        }

        assert.doesNotMatch(html, /aria-label="Editorial question"/);
        if (optimizedImageCount === 0) {
            assert.match(
                html,
                new RegExp(`<img[^>]*src="${escapeRegExp(cover)}"`),
            );
        } else {
            assert.equal(
                (html.match(/<picture\b/g) ?? []).length,
                optimizedImageCount,
            );
            assert.match(html, /<source[^>]*type="image\/avif"/);
            assert.match(html, /<source[^>]*type="image\/webp"/);
        }

        assert.match(html, /href="\/work\/"/);
        assertNoClientJavaScript(html, `preview ${slug}`);
    }
});

test("preview root-relative links resolve", () => {
    assertRootRelativeLinksResolve([
        indexPath,
        workIndexPath,
        ...caseStudies.map(({ slug }) => workPagePath(slug)),
    ]);
});

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
