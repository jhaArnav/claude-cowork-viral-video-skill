---
name: viral-mortgage-hooks
description: Mines mortgage and real estate short-form content patterns from seed creators using compliant sources (TikTok oEmbed, web search, Meta Ad Library). Produces ranked hook patterns, script templates, editing checklists, and weekly posting plans. Use when user asks to "mine mortgage hooks", "analyze viral content", "create content strategy", "hook patterns for loan officers", or "mortgage Instagram TikTok strategy".
license: MIT
metadata:
  version: 1.0.0
  category: content-strategy
compatibility: "Requires Node.js and tsx for hook_miner. No MCP required."
---

# Viral Mortgage Hook Miner

Mines mortgage/real estate short-form content patterns from seed creators. Outputs ranked hooks, script templates, weekly plans, and CTAs. **Compliant mode only** — no scraping, logins, or private APIs.

## Instructions

### Step 1: Gather URLs

Edit `inputs.json` in the Cowork workspace (or plugin root):
- Add seed creator profile URLs (IG, TikTok, YouTube)
- Add discovered post/video URLs to `discoveredPostUrls`
- For TikTok oEmbed metadata, use full video URLs (e.g. `.../video/123456`)

### Step 2: Run the hook miner

```bash
npm install
npx tsx tools/hook_miner.ts inputs.json
```

Output: `hook_miner_out/sources.json`

### Step 3: Analyze sources

Feed `sources.json` to Claude with the analysis prompt. See [references/analysis-prompt.md](../../references/analysis-prompt.md) for the exact prompt.

Claude will produce:
- 15 ranked hook patterns with paraphrased examples
- 6 reusable script templates (talking head, news reaction, rent vs buy math, condo trap, ITIN, rate strategy)
- 7-day posting plan with DM keyword CTAs
- Compliance notes (do/don't)

### Step 4: Output format

Return JSON with: `sources`, `patterns`, `templates`, `weeklyPlan`, `complianceNotes`. Full schema in [references/output-schema.md](../../references/output-schema.md).

## Hard constraints

- Do NOT bypass logins, paywalls, bot protections, or private endpoints
- Do NOT scrape "For You" feeds or private APIs
- Use only: public web pages, official oEmbed, YouTube public metadata, Meta Ad Library
- Respect robots.txt; rate-limit requests
- Never output scripts that copy specific posts — always produce pattern → fresh script with original phrasing

## Data sources (allowed)

| Platform | Method |
|----------|--------|
| TikTok | oEmbed: `https://www.tiktok.com/oembed?url={video_url}` |
| Instagram/Facebook | Web search for public URLs; no authenticated scraping |
| YouTube Shorts | Data API or public parsing |
| Meta Ad Library | Search mortgage/real-estate advertisers; extract angles, CTAs, edit style |

## Miami focus

Prefer: condo warrantability, FHA condo lists, Miami-Dade DPA, rent vs buy math, insurance crisis, ITIN; neighborhoods: Doral, Kendall, Homestead, Miami Gardens, Brickell.

## Examples

**Example 1: Full workflow**

User: "Mine hooks from my seed creators and give me a weekly plan"

Actions:
1. Run `npx tsx tools/hook_miner.ts inputs.json`
2. Load `hook_miner_out/sources.json`
3. Apply analysis prompt from references/analysis-prompt.md
4. Output patterns, templates, weeklyPlan as JSON

**Example 2: Analysis only**

User: "I have sources.json — analyze it for hook patterns"

Actions:
1. Load the provided sources.json
2. Apply analysis prompt
3. Produce ranked patterns, templates, 7-day plan

**Example 3: New geo/niche**

User: "Same workflow but for Austin and first-time buyers"

Actions:
1. Update inputs.json with geo: "Austin", niche: "first-time buyer"
2. Run hook miner
3. Adapt analysis for Austin (DPA programs, neighborhoods, etc.)

## Troubleshooting

**Hook miner fails on TikTok URL**

- Cause: Profile URLs don't support oEmbed; only video URLs do
- Solution: Add specific video URLs from the profile to discoveredPostUrls

**Skill doesn't trigger**

- Cause: Description may not match user phrasing
- Solution: User can explicitly say "use viral mortgage hooks skill" or "mine mortgage content patterns"

**Output missing patterns/templates**

- Cause: sources.json has minimal metadata (e.g. IG profile URLs only)
- Solution: Add more TikTok video URLs for oEmbed enrichment; patterns are inferred from domain knowledge when metadata is sparse
