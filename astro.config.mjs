import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

export default defineConfig({
    site: "https://darthvictor.xyz",
    output: "static",
    integrations: [mdx(), preact()],
});
