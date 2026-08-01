import assert from "node:assert/strict";
import test from "node:test";

import {
    assertNoClientJavaScript,
    assertRootRelativeLinksResolve,
    draftCaseStudies,
    indexPath,
    readOutput,
    workIndexPath,
    workPagePath,
} from "./output-helpers.mjs";

test("preview work archive contains six ordered draft cards", () => {
    const workHtml = readOutput(workIndexPath);
    const cardCount = (workHtml.match(/class="archive-card"/g) ?? []).length;

    assert.equal(cardCount, draftCaseStudies.length);
    assert.doesNotMatch(workHtml, /Case studies are being prepared/);

    let previousTitleIndex = -1;

    for (const { slug, title } of draftCaseStudies) {
        assert.match(workHtml, new RegExp(`href="/work/${slug}/"`));
        assert.match(workHtml, new RegExp(escapeRegExp(title)));

        const titleIndex = workHtml.indexOf(title);
        assert.ok(titleIndex > previousTitleIndex, `${title} is out of order`);
        previousTitleIndex = titleIndex;
    }

    assertNoClientJavaScript(workHtml, "preview work archive");
});

test("preview homepage links only to the approved mapped drafts", () => {
    const indexHtml = readOutput(indexPath);

    for (const { slug, homepage } of draftCaseStudies) {
        const routePattern = new RegExp(`href="/work/${slug}/"`);

        if (homepage) {
            assert.match(indexHtml, routePattern);
        } else {
            assert.doesNotMatch(indexHtml, routePattern);
        }
    }

    assertNoClientJavaScript(indexHtml, "preview homepage");
});

test("every preview draft route is labeled, noindexed, stable, and static", () => {
    for (const { slug, title } of draftCaseStudies) {
        const html = readOutput(workPagePath(slug));

        assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
        assert.match(
            html,
            /<span class="draft-label type-label"[^>]*>Draft<\/span>/,
        );
        assert.match(html, new RegExp(`<h1[^>]*>${escapeRegExp(title)}</h1>`));
        assert.match(html, /aria-label="Editorial question"/);
        assert.match(html, /<img[^>]*width="1600"[^>]*height="900"/);
        assert.match(html, /href="\/work"/);
        assertNoClientJavaScript(html, `preview ${slug}`);
    }
});

test("preview root-relative links resolve", () => {
    assertRootRelativeLinksResolve([
        indexPath,
        workIndexPath,
        ...draftCaseStudies.map(({ slug }) => workPagePath(slug)),
    ]);
});

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
