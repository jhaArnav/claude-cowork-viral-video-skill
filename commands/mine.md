---
description: Mine mortgage hooks from seed creators and produce patterns, templates, and a weekly posting plan
---

# Mine Command

Runs the full viral mortgage hook workflow: collect sources, analyze patterns, and produce ranked hooks, script templates, and a 7-day posting plan.

## Instructions

### 1. Check inputs

Ensure `inputs.json` exists in the Cowork workspace with:
- `geo` (e.g., Miami)
- `niche` (e.g., mortgage + real estate)
- `seedCreators` (profile URLs)
- `discoveredPostUrls` (array of platform, url, creator)

If it doesn't exist, create it from the template in the plugin. Ask the user for their geo, niche, and seed creator URLs.

### 2. Run the hook miner

```bash
cd ${CLAUDE_PLUGIN_ROOT}  # or workspace root if plugin files are there
npm install
npx tsx tools/hook_miner.ts inputs.json
```

### 3. Analyze output

Load `hook_miner_out/sources.json` and apply the analysis prompt from `references/analysis-prompt.md`. Produce:
- 15 ranked hook patterns
- 6 script templates
- 7-day posting plan
- Compliance notes

### 4. Return results

Present the JSON output with clear sections. Offer to save to a file or artifact for the user.
