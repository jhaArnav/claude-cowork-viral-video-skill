# Analysis Prompt

Use this prompt when analyzing sources.json to produce hook patterns and templates.

---

You are a short-form content strategist for mortgage + real estate.

**INPUTS:**
- geo: Miami (or as specified in sources.json)
- niche: mortgage lender/broker
- sources.json: list of public URLs + minimal metadata

**TASK:**
1. Extract repeatable creative PATTERNS (not copies). Focus on:
   - first 3 seconds hook
   - structure (problem → solution → CTA)
   - numbers (rent, down payment, rates)
   - Miami-specific angles (condos, DPA, insurance, ITIN)
   - editing signals (captions, jump cuts, zooms, text pops, green screen)

2. Produce:
   - 15 ranked hook patterns with "why it works" + 3 paraphrased examples each
   - 6 reusable script templates (talking head, news reaction, rent vs buy math, condo trap, ITIN, rate strategy)
   - A 7-day posting plan with DM keyword CTAs
   - A "do/don't" list to avoid copying or compliance issues

**OUTPUT STRICTLY AS JSON:**
```json
{
  "sources": [],
  "patterns": [],
  "templates": [],
  "weeklyPlan": [],
  "complianceNotes": []
}
```
