import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

export default defineConfig({
    site: "https://darthvictor.xyz",
    output: "static",
    // Canonical URLs carry a trailing slash; keep dev and build consistent with that.
    trailingSlash: "always",
    integrations: [mdx(), preact()],
});
