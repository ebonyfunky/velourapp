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
  audience_location: string | null;
  audience_goals: string[] | null;
  audience_fears: string[] | null;
  audience_internal_dialogue: string[] | null;
  audience_interests: string[] | null;
  audience_content_consumed: string[] | null;
  audience_decision_style: string | null;
  audience_wants: string[] | null;
  audience_doesnt_want: string[] | null;
  audience_fingerprint: string | null;
}

function buildPrompt(data: ProfilePayload): string {
  const {
    creator_profession,
    creator_offer_description,
    audience_fingerprint,
    audience_age_range,
    audience_gender,
    audience_marital_status,
    audience_children,
    audience_education,
    audience_career_field,
    audience_location,
    audience_goals,
    audience_fears,
    audience_internal_dialogue,
    audience_interests,
    audience_content_consumed,
    audience_decision_style,
    audience_wants,
    audience_doesnt_want,
  } = data;

  const sep = "=".repeat(59);
  const fingerprint = (audience_fingerprint || "").trim();
  const hasFingerprint = fingerprint.length > 0;

  const fingerprintBlock = hasFingerprint
    ? `${sep}
PRIMARY ANCHOR - THE CREATOR'S OWN WORDS:
${sep}
The creator described their perfect audience in their own voice:

"${fingerprint}"

This sentence is the spine. Build around this human. The chip data below is supporting detail.
`
    : "";

  return `You are writing an identity statement about ONE specific person: the AUDIENCE that a content creator serves. The audience is a hypothetical composite - the creator's ideal viewer.

${sep}
CONTEXT (DO NOT DESCRIBE THIS PERSON):
${sep}
The creator is a ${creator_profession || "content creator"} who offers: ${creator_offer_description || "guidance and education"}.

The audience may be a version of the creator at an earlier stage, or someone completely different. If the audience appears to be a version of the creator (similar profession, similar life stage), write with recognition - like the creator is looking back at who they used to be. Tender and specific, not clinical.

${fingerprintBlock}
${sep}
AUDIENCE CHIP DATA:
${sep}
- Age: ${audience_age_range || "unspecified"}
- Gender: ${audience_gender || "unspecified"}
- Relationship status: ${audience_marital_status || "unspecified"}
- Children: ${audience_children || "unspecified"}
- Education: ${audience_education || "unspecified"}
- Career field: ${audience_career_field || "unspecified"}
- Location: ${audience_location || "unspecified"}

What they want: ${(audience_goals || []).join(", ") || "unspecified"}
What they fear: ${(audience_fears || []).join(", ") || "unspecified"}
What they tell themselves: ${(audience_internal_dialogue || []).join(", ") || "unspecified"}
Interests: ${(audience_interests || []).join(", ") || "unspecified"}
Content they consume: ${(audience_content_consumed || []).join(", ") || "unspecified"}
How they decide: ${audience_decision_style || "unspecified"}
Wants: ${(audience_wants || []).join(", ") || "unspecified"}
Avoids: ${(audience_doesnt_want || []).join(", ") || "unspecified"}

${sep}
FORBIDDEN LANGUAGE - DO NOT USE THESE WORDS OR PHRASES:
${sep}
The following words are banned because every coaching brand uses them. They are verbal wallpaper. If you reach for one of these, stop and write something concrete instead.

- financial freedom
- sustainable income
- authentic / authenticity / authentically
- evidence-based
- empty promises
- rigorous logic
- crave / craves / craving (when describing wants)
- pathway / pathways
- imposter syndrome
- time-starved
- ambitious yet [anything]
- journey / journeying
- dignified / dignity (when paired with money or work)
- hustle / grind
- transform / transformation
- unlock / unlocking
- empower / empowerment

The chip data may contain these words (e.g. "Financial Freedom" as a chip label). You may NOT pass them through verbatim. Translate the IDEA into concrete human specifics.

${sep}
VOICE DIRECTION - WRITE LIKE THIS INSTEAD:
${sep}

WRITE CONCRETE SENSORY SPECIFICS, not abstract aspirations.

BAD: "She craves authority in her field."
GOOD: "She wants to be the one people text when they have a question about their thyroid."

BAD: "Time-starved professional balancing motherhood."
GOOD: "She checks her phone in the parking lot before walking into work."

BAD: "She wrestles with imposter syndrome about online ventures."
GOOD: "She can explain a complex diagnosis to a stranger in three minutes and cannot bring herself to record a 30-second video."

BAD: "She seeks evidence-based pathways to financial freedom."
GOOD: "She has watched seventeen videos this week. None of them felt safe enough to try."

BAD: "Raising young children while seeking sustainable income."
GOOD: "The baby monitor is on while she watches another creator's livestream at 11pm."

NAME THE INTERNAL CONTRADICTION plainly. The most compelling thing about any audience is the gap between what they have and what they want. Show that gap with one concrete contrast - not with abstract emotional vocabulary.

WRITE LIKE THE AUDIENCE WOULD DESCRIBE THEMSELVES AT 11PM ON A TUESDAY, not like a marketing deck describes them.

${sep}
YOUR TASK:
${sep}
Return ONLY valid JSON in this exact shape - no preamble, no markdown, no code fences:

{
  "short": "A 2-3 sentence portrait. Under 60 words. Specific, evocative, human. Used for headers and hooks.",
  "long": "A 4-6 sentence portrait. Under 100 words. Captures the emotional truth and the internal contradiction. Used for narrative reference."
}

Final check before you write:
- Did you use any banned word? Rewrite.
- Did you describe the AUDIENCE, not the creator? If audience traits overlap with creator traits, that is fine - just describe the audience.
- Is there at least one concrete sensory specific (a parking lot, a baby monitor, a number, a time of day, a physical object)? If not, add one.
- Does the portrait feel like a real person at a specific moment, or like a category?

Return only the JSON object.`;
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
