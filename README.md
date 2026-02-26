# Viral Mortgage Hooks — Cowork Plugin

A [Claude Cowork](https://claude.com/product/cowork) plugin that mines mortgage and real estate short-form content patterns from seed creators. Produces ranked hook patterns, script templates, editing checklists, and weekly posting plans for loan officers and mortgage pros — all using compliant sources (TikTok oEmbed, web search, Meta Ad Library).

## Installation

### Option 1: Install in Claude Cowork (Desktop App)

1. **Download the plugin:**
   - Click the green **Code** button on this repo
   - Choose **Download ZIP**
   - Unzip to a folder on your computer

2. **Add the plugin to Cowork:**
   - Open **Claude Cowork** (desktop app)
   - Go to **Settings** → **Plugins** (or **Capabilities** → **Plugins**)
   - Click **Upload plugin** or **Add plugin**
   - Select the `viral-mortgage-hooks` subfolder (inside the unzipped repo)
   - Enable the plugin

3. **First run:** In your Cowork workspace, run `npm install` once so the hook miner script can run. You can ask Claude: *"Run npm install in the viral mortgage hooks plugin folder"*.

### Option 2: Add as Marketplace (Claude Code / Cowork)

1. In Cowork: **Settings** → **Plugins** → **Add marketplace from GitHub**
2. Enter: `jhaArnav/claude-cowork-viral-video-skill`
3. After the marketplace is added, install the plugin: `viral-mortgage-hooks`

## What It Does

- **Mine hook patterns** — Analyze seed creators (TikTok, Instagram, YouTube) using compliant APIs (oEmbed, public metadata)
- **Rank patterns** — 15 ranked hook patterns with "why it works" and paraphrased examples
- **Script templates** — 6 reusable templates: talking head, news reaction, rent vs buy math, condo trap, ITIN, rate strategy
- **Weekly posting plan** — 7-day plan with DM keyword CTAs
- **Compliance notes** — Do/don't lists to avoid copying or platform violations

## Commands

| Command | What it does |
|---------|--------------|
| `/viral-mortgage-hooks:mine` | Run the full workflow: collect sources, analyze patterns, produce hooks + templates + weekly plan |

## Skills

| Skill | Description |
|-------|-------------|
| `viral-mortgage-hooks` | Mines mortgage/real estate short-form content patterns. Activates when you ask to "mine mortgage hooks", "analyze viral content", "create content strategy", or "mortgage Instagram TikTok strategy" |

## Example Workflows

**Full workflow:**
```
You: Mine hooks from my seed creators and give me a weekly plan

Claude: [Edits inputs.json if needed, runs hook_miner, analyzes sources,
         produces ranked patterns, templates, and 7-day posting plan]
```

**Analysis only:**
```
You: I have sources.json — analyze it for hook patterns

Claude: [Loads sources, applies analysis, returns patterns + templates + weekly plan]
```

## Requirements

- **Node.js** (v18+)
- **npm** (for `tsx` and `typescript`)
- No MCP or external API keys required for basic use

## Data Sources (Compliant Only)

| Platform | Method |
|----------|--------|
| TikTok | oEmbed (public, no auth) |
| Instagram/Facebook | Web search; no scraping |
| YouTube | Public metadata |
| Meta Ad Library | Search mortgage/real estate advertisers |

## License

MIT
