// Phase A5.2 — Edge Function for Velour Audience Identity Statement generation
// Calls Claude via Anthropic API, returns short + long synthesis

import Anthropic from "npm:@anthropic-ai/sdk@0.78.0";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

if (!ANTHROPIC_API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY secret");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ProfilePayload {
  creator_profession: string | null;
  creator_offer_description: string | null;
  audience_age_range: string | null;
  audience_gender: string | null;
  audience_marital_status: string | null;
  audience_children: string | null;
  audience_education: string | null;
  audience_career_field: string | null;
  audience_location: string | nul
  audience_goals: string[] | null;
  audience_fears: string[] | null;
  audience_internal_dialogue: string[] | null;
  audience_interests: string[] | null;
  audience_content_consumed: string[] | null;
  audience_decision_style: string | null;
  audience_wants: string[] | null;
  audience_doesnt_want: string[] | null;
}

function buildPrompt(p: ProfilePayload): string {
  const list = (label: string, val: string[] | null) =>
    val && val.length > 0 ? `${label}: ${val.join(", ")}` : `${label}: (not specified)`;
  const v = (label: string, val: string | null) =>
    val ? `${label}: ${val}` : `${label}: (not specified)`;

  return `You are synthesizing a Perfect Audience Profile for a content creator on the Velour platform. Velour is a luxury AI content generator with a calm, authoritative tone — think Cormorant Garamond elegance, warm gold accents, never hype-driven or salesy.

Below is everything the creator entered about themselves and their target audience.

CREATOR:
${v("Profession", p.creator_profeion)}
${v("What they offer", p.creator_offer_description)}

AUDIENCE DEMOGRAPHICS:
${v("Age range", p.audience_age_range)}
${v("Gender", p.audience_gender)}
${v("Marital status", p.audience_marital_status)}
${v("Children", p.audience_children)}
${v("Education", p.audience_education)}
${v("Career field", p.audience_career_field)}
${v("Location", p.audience_location)}

AUDIENCE PSYCHOLOGY:
${list("Goals", p.audience_goals)}
${list("Fears", p.audience_fears)}
${list("Internal dialogue", p.audience_internal_dialogue)}

AUDIENCE BEHAVIOR:
${list("Interests", p.audience_interests)}
${list("Content they consume", p.audience_content_consumed)}
${v("Decision-making style", p.audience_decision_style)}

AUDIENCE DESIRES:
${list("What they want", p.audience_wants)}
${list("What they want to avoid", p.audience_doesnt_want)}

Generate a Perfect Audience Profile in TWO formats:

1. **SHORT** — 2-3 sentences, max 50 words. Sharp, vivid, written in Velour's calm authority. Captures who this person fundamentally is.

2. **LO** — A single paragraph, max 100 words. Reads like a confident character study. Weaves demographics, psychology, and desires into a portrait the creator can hold in their head while writing content.

Return ONLY valid JSON in this exact shape, no markdown, no preamble:

{"short": "...", "long": "..."}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const payload: ProfilePayload = await req.json();

    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Server missing ANTHROPIC_API_KEY" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        { role: "user", content: buildPrompt(payload) },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return new Response(
        JSON.stringify({ error: "Empty model response" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const raw = textBlock.text.trim();
    let parsed: { short: string; long: string };
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Sometimes models wrap JSON in code fences despite instructions; strip and retry
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    if (typeof parsed.short !== "string" || typeof parsed.long !== "string") {
      return new Response(
        JSON.stringify({ error: "Malformed model response", raw }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ short: parsed.short, long: parsed.long }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
