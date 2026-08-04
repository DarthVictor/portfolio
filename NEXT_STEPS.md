# SEO Implementation Plan

## Goal

Make `https://darthvictor.xyz` reliably discoverable, unambiguous to search
engines, and easier to share, while preserving the portfolio's evidence-first
content standard.

## Order of work

1. **Discovery foundation — complete**
   - Generate a sitemap from public portfolio routes at build time.
   - Publish an explicit `robots.txt` that permits crawling and names the
     sitemap.
   - Link the sitemap from the document head.

2. **Entity and article structured data — complete**
   - Add `Person` and `WebSite` JSON-LD to the homepage.
   - Add `Article` JSON-LD and article-specific social metadata to public case
     studies.

3. **Metadata quality — complete**
   - Strengthen the short Tolstoy meta description.
   - Review every title, description, canonical URL, and social-image alt text
     in production output.

4. **Page experience — complete**
   - Replace oversized case-study PNGs with appropriately sized modern images.
   - Recheck production performance and layout stability.

5. **Search-engine onboarding — manual after deployment**
   - Verify the domain in Google Search Console.
   - Submit the live sitemap and request indexing for the homepage and public
     case studies.

## Guardrails

- Do not publish draft or confidential content in a sitemap or structured data.
- Do not add unsupported metrics, testimonials, or claims.
- Keep the portfolio focused on recruiter- and client-relevant evidence.
