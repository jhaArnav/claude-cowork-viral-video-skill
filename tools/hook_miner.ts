/**
 * Hook Miner (Compliant-ish):
 * - Uses web search results (you provide URLs, or integrate SerpAPI later)
 * - TikTok: uses oEmbed to fetch title/author
 * - YouTube: optionally via API key (recommended)
 * - IG/FB: stores URLs + visible caption text (no login bypass)
 *
 * Run:  npx tsx tools/hook_miner.ts inputs.json
 */

import fs from "node:fs";
import path from "node:path";

type Input = {
  geo: string;
  niche: string;
  seedCreators: string[];
  discoveredPostUrls: {
    platform: "tiktok" | "instagram" | "facebook" | "youtube";
    url: string;
    creator?: string;
  }[];
  outDir?: string;
};

type SourceItem = {
  platform: string;
  url: string;
  creator?: string;
  title?: string;
  author?: string;
  captionSnippet?: string;
  observedSignals?: string[];
  notes?: string;
};

async function safeJson(url: string) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; HookMiner/1.0; +https://example.com/bot)",
      accept: "application/json,text/plain,*/*",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return res.json();
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

async function tiktokOembed(videoUrl: string) {
  const oembed = `https://www.tiktok.com/oembed?url=${encodeURIComponent(
    videoUrl
  )}`;
  return safeJson(oembed);
}

/**
 * NOTE:
 * Instagram oEmbed usually requires an access token nowadays.
 * We do NOT rely on it. We keep the URL and optionally
 * screenshot the page for manual review.
 */

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error("Usage: npx tsx tools/hook_miner.ts inputs.json");
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const input: Input = JSON.parse(raw);

  const outDir = input.outDir || path.join(process.cwd(), "hook_miner_out");
  ensureDir(outDir);

  const sources: SourceItem[] = [];

  for (const item of input.discoveredPostUrls) {
    try {
      if (item.platform === "tiktok") {
        const data = await tiktokOembed(item.url);
        sources.push({
          platform: "tiktok",
          url: item.url,
          creator: item.creator || data.author_name,
          title: data.title,
          author: data.author_name,
          notes: "Collected via TikTok oEmbed (public).",
        });
      } else {
        // IG/FB/YouTube: store URL + creator; optionally extend later
        sources.push({
          platform: item.platform,
          url: item.url,
          creator: item.creator,
          notes:
            item.platform === "instagram" || item.platform === "facebook"
              ? "No scraping. Manual review / screenshot recommended."
              : "YouTube enrichment recommended via Data API.",
        });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      sources.push({
        platform: item.platform,
        url: item.url,
        creator: item.creator,
        notes: `Enrichment failed: ${msg}`,
      });
    }
  }

  fs.writeFileSync(
    path.join(outDir, "sources.json"),
    JSON.stringify(
      { geo: input.geo, niche: input.niche, sources },
      null,
      2
    )
  );

  console.log(
    `Wrote ${sources.length} items to ${path.join(outDir, "sources.json")}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
