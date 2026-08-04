import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

export const distDirectory = join(process.cwd(), "dist");
export const indexPath = join(distDirectory, "index.html");
export const workIndexPath = join(distDirectory, "work", "index.html");
export const cvPath = join(distDirectory, "cv.pdf");

export const caseStudies = [
    {
        slug: "tolstoy-ai-integrations",
        title: "What Building 30+ Integrations Taught Me About AI Product Engineering",
        homepage: true,
        cover: "/images/work/tolstoy_connectors.png",
        additionalImage: "/images/work/klaviyo_integration.png",
    },
    {
        slug: "tenengroup-ui-migration",
        title: "From Better Architecture to Better Sales in E-Commerce",
        homepage: true,
        cover: "/images/work/tenengroup-checkout-ux.svg",
        additionalImage: "/images/work/tenengroup-platform-boundary.svg",
    },
    {
        slug: "yandex-disk-spa-migration",
        title: "2017, Before LLMs: The Patient Rewrite of Yandex.Disk",
        homepage: true,
        cover: "/images/work/yandex-disk-spa-migration.png",
        additionalImage: "/images/work/yandex-disk-migration-stages.svg",
    },
];

export function workPagePath(slug) {
    return join(distDirectory, "work", slug, "index.html");
}

export function readOutput(path) {
    assert.equal(existsSync(path), true, `Expected output file: ${path}`);
    return readFileSync(path, "utf8");
}

export function assertNoClientJavaScript(html, label) {
    assert.doesNotMatch(
        html,
        /_astro\/[^"']+\.js/,
        `${label} must not load bundled client-side JavaScript`,
    );
    assert.doesNotMatch(
        html,
        /<script\b/,
        `${label} must not contain script elements`,
    );
}

export function assertRootRelativeLinksResolve(pagePaths) {
    for (const pagePath of pagePaths) {
        const html = readOutput(pagePath);
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(
            ([, href]) => href,
        );

        for (const href of hrefs) {
            const outputPath = resolveRootRelativeHref(href);

            if (outputPath === undefined) {
                continue;
            }

            assert.equal(
                existsSync(outputPath),
                true,
                `Broken internal link ${href} in ${pagePath}`,
            );
        }
    }
}

export function readPageStyles(html) {
    const inlineStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .map(([, styles]) => styles)
        .join("\n");

    return `${inlineStyles}\n${readLinkedStylesheets(html)}`;
}

export function expectHeadings(actual, expected) {
    const primaryHeadings = actual.filter(({ level }) => level < 3);

    assert.deepEqual(primaryHeadings, expected);
    assert.equal(actual.filter(({ level }) => level === 1).length, 1);
}

function resolveRootRelativeHref(href) {
    if (!href.startsWith("/")) {
        return undefined;
    }

    const pathname = href.split(/[?#]/, 1)[0];

    if (pathname === "/") {
        return indexPath;
    }

    const relativePath = pathname.replace(/^\/+|\/+$/g, "");

    if (extname(relativePath) !== "") {
        return join(distDirectory, relativePath);
    }

    return join(distDirectory, relativePath, "index.html");
}

function readLinkedStylesheets(html) {
    return [...html.matchAll(/href="(\/_astro\/[^"']+\.css)"/g)]
        .map(([, stylesheetPath]) =>
            readFileSync(join(distDirectory, stylesheetPath), "utf8"),
        )
        .join("\n");
}
