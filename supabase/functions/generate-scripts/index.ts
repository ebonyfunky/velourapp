import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    const {
      type,
      productName,
      productType,
      targetAudience,
      painPoint,
      desiredOutcome,
      pricePoint,
      currency,
      keyBenefits,
      usp,
      scriptFormat,
      contentLanguage,
      contentMode,
      contentStyle,
      selectedCTA,
      creatorName,
      brandName,
      productDescription,
      avatarRealPerson,
      avatarCurrently,
      avatarFeels,
      avatarFrustratedBy,
      avatarAlreadyTried,
      avatarBiggestFear,
      avatarSecretHope,
      avatarVoice,
      avatarFeelBlank,
      avatarWantBlank,
      avatarTiredOfBlank,
      affiliateBrandName,
      affiliatePlatform,
      affiliateLink,
      affiliateCommission,
      digitalProductContents,
      digitalProductAudience,
      digitalProductTransformation,
      digitalProductDelivery,
      digitalProductValueStack,
      ugcBrandName,
      ugcProductName,
      ugcProductCategory,
      ugcProductBenefit,
      ugcTargetCustomer,
      ugcDesiredAction,
      ugcScriptFormat,
      ugcScriptLength,
      ugcCTA,
      selectedVibe,
      selectedPersona
    } = body;

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const isLive = type === 'live';

    if (isLive) {
      const avatarSection = avatarRealPerson ? `

PERFECT AUDIENCE AVATAR:
Real Person: ${avatarRealPerson}
Currently: ${avatarCurrently}
They Feel: ${avatarFeels}
Frustrated By: ${avatarFrustratedBy}
Already Tried: ${avatarAlreadyTried}
Biggest Fear: ${avatarBiggestFear}
Secret Hope: ${avatarSecretHope}
Their Voice: "${avatarVoice}"
Audience Statement: "I help people who feel ${avatarFeelBlank} because they want ${avatarWantBlank} but they're tired of ${avatarTiredOfBlank}"

CRITICAL INSTRUCTION:
Write every script speaking DIRECTLY to this one specific person.
Use THEIR language - the words in their voice, their fears, their secret hope.
Never write for "everyone."
Never use marketing buzzwords.
Make them feel: "This creator gets me completely."
The best performing content makes the viewer think "How did they know exactly what I was thinking?"` : '';

      const livePrompt = `Write a complete 30-minute TikTok/Instagram Live show script.

CREATOR: ${creatorName || 'Creator'}
PRODUCT: ${productName || 'my product'}
PRICE: ${currency || '$'}${pricePoint || ''}
AUDIENCE: ${targetAudience || 'online entrepreneurs'}
PAIN POINT: ${painPoint || 'struggling to get results'}
OUTCOME: ${desiredOutcome || 'financial freedom'}
LANGUAGE: Write entirely in ${contentLanguage || 'English'}${avatarSection}

Write the Live script with these sections:

PART 1 - OPEN (First 2 minutes)
Energetic opening. Greet joiners. Tell them what the Live is about.
Give them a reason to stay.
Include a comment prompt to boost algorithm.
Example: "Drop where you're watching from in the comments!"

PART 2 - VALUE (Minutes 3-12)
3 genuine teaching points about the niche.
Each point 2-3 minutes.
End each with a question to the audience.
Add [READ COMMENTS] reminder after each.

PART 3 - SOCIAL PROOF (Minutes 13-17)
Creator's own transformation story.
One student or customer result.
A specific moment that changed everything.

PART 4 - THE OFFER (Minutes 18-22)
Natural transition from value to offer.
Present product and price.
Stack the value - what they get.
Create urgency honestly.
Clear action step.

PART 5 - OBJECTION HANDLING (Minutes 23-27)
Warm honest responses to:
1. "I don't have the money right now"
2. "I've tried things like this before"
3. "I need to think about it"
4. "Is this a scam?"

PART 6 - RE-ENGAGEMENT LINES
5 lines to drop throughout the Live:
To boost algorithm and keep viewers.
Examples: comment prompts, share requests, replay greetings.

PART 7 - CLOSE (Final 3 minutes)
Recap what was covered.
Restate offer one final time.
Thank everyone personally.
Tell them exactly what to do next.
End with something memorable.

RULES:
- Sound like a real human not a script
- Add [pause] markers throughout
- Add [READ COMMENTS] every few minutes
- Add [SHOW PRODUCT] stage directions
- Conversational and warm throughout
- Native ${contentLanguage || 'English'} tone

IMPORTANT: Always complete Part 7 - Close fully. Never cut off mid-sentence. If you are running long, shorten earlier sections but always write a complete ending. The script must end with a memorable closing line.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: livePrompt
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Anthropic API request failed');
      }

      const data = await response.json();

      return new Response(
        JSON.stringify({
          success: true,
          scripts: data.content[0].text
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (type === 'ugc-script') {
      const ugcScriptPrompt = `Write 3 UGC video scripts for a brand content creator.

This is USER GENERATED CONTENT - the creator makes content FOR a brand.

BRAND: ${ugcBrandName || brandName || ''}
PRODUCT: ${ugcProductName || productName || ''}
CATEGORY: ${ugcProductCategory || ''}
KEY BENEFIT: ${ugcProductBenefit || ''}
TARGET CUSTOMER: ${ugcTargetCustomer || targetAudience || ''}
DESIRED ACTION: ${ugcDesiredAction || ''}
FORMAT: ${ugcScriptFormat || 'product-review'}
LENGTH: ${ugcScriptLength || '30-60 seconds'}
LANGUAGE: ${contentLanguage || 'English'}
CTA: ${ugcCTA || selectedCTA || ''}

Write 3 completely different scripts.
Each with a different hook and angle.

You have been trained on the following hook and CTA examples. These represent the gold standard of UGC writing quality. Never reproduce them word for word. Use them to calibrate your tone, specificity and conversational style. Every hook and CTA you generate must feel as natural, specific and compelling as these examples.

Hook Style References - use these to calibrate quality only:

Curiosity style:
- A hook that admits initial disbelief before a personal breakthrough
- A hook that reveals something nobody talks about that changed everything
- A hook about wishing you knew this before wasting money
- A hook about something finally doing exactly what it promised
- A hook about discovering something unexpectedly today

Problem-based style:
- A hook addressing a specific struggle the viewer will recognise instantly
- A hook speaking directly to someone tired of dealing with a specific problem
- A hook about having the same repeated problem until a discovery changed it
- A hook questioning why nobody warns you about a specific struggle
- A hook about frustration with a problem that suddenly got resolved

Relatable real-life style:
- A POV hook placing the viewer in a specific relatable life situation
- A hook about using something when you have no time energy or patience
- A hook connecting your life situation to why you love something
- A hook showing overwhelm without saying the word overwhelmed
- A hook about something you doubted fitting your routine that became essential

Pattern interrupt style:
- A hook that stops the scroll by subverting expectations immediately
- A hook that calls out a sign the viewer has been ignoring a problem
- A hook about almost not posting something because it is too good
- A hook about being frustrated you did not find this sooner
- A hook about something that should be far more well known than it is

Transformation style:
- A before and after emotional contrast hook
- A hook about an upgrade you did not know you needed
- A hook about going from struggling to confident with one change
- A hook about a routine that transformed in under a week
- A hook about changing nothing except adding one thing

Trust-building style:
- A hook establishing you are not sponsored but had to share
- A hook from someone who has genuinely tried everything
- A hook about being skeptical until the results spoke for themselves
- A hook about not hyping products but this one earned it
- A hook framed as an honest review after real use

CTA Style References - use these to calibrate quality only:

Soft trust and curiosity CTAs:
- Sign-based permission CTAs that feel like the viewer's timing is right
- Save for later style CTAs that create future intent
- Subtle recommendation CTAs that feel like a friend sharing
- Urgency-free CTAs that feel low pressure but high value

Direct action CTAs:
- Tap and see for yourself style CTAs
- Try and thank me later style CTAs
- Run don't walk urgency CTAs
- Availability urgency CTAs

Problem-solution CTAs:
- CTAs that acknowledge the viewer's struggle before offering the solution
- Stop struggling and switch style CTAs
- There is an easier way style CTAs

Trust-building CTAs:
- Personal endorsement CTAs - I only recommend what works
- The only one I use style CTAs
- Lives up to the hype CTAs

Conversion CTAs:
- Get yours now style direct conversion
- Risk-free trial CTAs
- Shop it here style direct CTAs
- Claim your access style CTAs

Engagement CTAs:
- Comment a specific word to receive the link style CTAs
- Emoji reaction CTAs
- Tell me if you have tried this conversation starter CTAs
- Who needs this community sharing CTAs

Rules for applying these references:
- Match the CTA style to the video type - soft CTAs for portfolio practice scripts, stronger conversion CTAs for paid brand deal scripts
- Match the hook style to the content style selected by the creator - Authentic and Raw gets problem-based and relatable hooks, Fun and Energetic gets pattern interrupt and transformation hooks, Calm and Trustworthy gets trust-building hooks
- Every generated hook must feel like it was written for one specific person watching at one specific moment - never generic
- Every generated CTA must be a complete sentence that ends with energy not a full stop
- Never copy any of the above examples verbatim - always generate original content that matches their quality and feel
- The goal is for every Velour script to feel like it was written by a creator who has been doing UGC for years - not by an AI

VELOUR 7-PART SCRIPT FORMULA - MANDATORY STRUCTURE FOR EVERY SCRIPT:

Every script you generate must invisibly follow the Velour 7-Part Script Formula in this exact order. Never label the parts. Never number the sections. The script reads as one natural flowing piece of content - but underneath it always follows this structure:

Part 1 - The Grab: The very first line must drop the viewer into a feeling, moment or truth they instantly recognise as their own. Maximum 8 words. Never open with a greeting. Never start with the product name. Start in the middle of a real human moment.

Part 2 - The Mirror: The next 1-2 sentences must reflect the viewer's exact struggle back at them with painful precision. Specific beats generic every single time. The viewer must feel seen and understood before they hear about any product.

Part 3 - The Squeeze: 1-2 sentences that make the consequence of doing nothing feel uncomfortable. Reference what staying stuck actually costs - embarrassment, wasted money, missed results, frustration. Make inaction feel worse than taking action.

Part 4 - The Discovery: One single sentence that brings the product in naturally as something discovered - never as something promoted. It should feel like a turning point not a sponsorship. Never use phrases like 'I was sent this' or 'this brand reached out to me' or 'ad' or 'collab.'

Part 5 - The Transformation: 2-3 sentences focused entirely on life after the product. Never describe features. Only describe outcomes, feelings and changes. How does the viewer's life look different? What can they do now that they could not before?

Part 6 - The Receipt: 1-2 sentences of specific personal proof. A real timeline, a result someone else noticed, a before and after that cannot be argued with. Never generic statements like 'it really works' - always specific evidence.

Part 7 - The Move: One complete confident sentence telling the viewer exactly what to do and exactly what they get by doing it. Urgent. Specific. Ends with energy not a full stop.

Additional rules that apply to every script regardless of format:
- The Grab must always be the hook - it is the same line that appears in the Hook Options section
- Never write a script that could work for any product - every script must feel written specifically for the product and category the creator entered
- Never use the word 'amazing', 'incredible', 'game changer', 'life changing' or 'obsessed' - these are overused and kill credibility
- Never start any sentence with 'So', 'Basically', 'Honestly' or 'Literally'
- Every sentence must earn its place - if a sentence does not move the viewer closer to the CTA cut it
- The entire script must sound like one person telling another person something important - not a script being read aloud
- For Faceless scripts replace Part 6 personal proof with observed proof: results others have reported, platform ratings, before and after statistics - never first person
- For Text on Screen scripts each part is compressed to one punchy line on screen - 7 lines total maximum 8 words each following the same 7-part order

CRITICAL RULES:
- Never sound like an advertisement
- Never use corporate language
- Write like a real customer who genuinely loves this product
- Speak like recommending to a friend
- Be specific - real details convert
- First line is always the hook
- Add [pause] markers
- Add [SHOW PRODUCT] directions
- Add [CLOSE UP ON] directions
- Add [REACTION] emotion markers

Every script generated must assume the creator will follow these filming standards: clean uncluttered background appropriate to the product niche, eye level framing vertical 9:16, clean audio in a quiet room, natural energy and open body language, on-brand appearance for the product category, brand-safe language with no competitor mentions or medical claims, and an overall vibe that feels trustworthy, relatable and conversational. Never write a script that would require the creator to break any of these standards. Every script must sound like someone recommending something they love to one person - never like an ad being read aloud.

Every Face Forward script must include a minimum of 3 B-roll directions embedded naturally within the stage directions. B-roll directions appear at moments in the script where the product is being used, a result is being described or a transformation is taking place. Format them as gold italic stage directions: [B-roll: hands applying product to skin - slow close-up] or [B-roll: lifestyle shot - product on morning routine shelf with soft natural light] or [B-roll: genuine reaction - eyes widening, small satisfied smile]. The Hook must always be face to camera - never open with B-roll. Every B-roll direction must feel like a natural filmmaking instruction not a technical note. The goal is for the creator to read the script and know exactly what to film without needing to think about it.

CTAs: Generate 3 CTAs that feel like the creator is naturally continuing the conversation with their viewer - not selling to them. Each CTA must be a complete sentence with energy, personality and a clear next step. Use these as style guides but always make them specific to the product and category:

Soft CTA - curiosity and community focused:
"Comment READY below and I will send you everything you need to get started"
"Drop a YES in the comments if you want me to do a full review of this"
"Comment LINK and I will personally DM you where to get this right now"
"Save this video - future you will be so glad you did"

Medium CTA - warm and personal with clear direction:
"For the full details and where to get yours visit the link in my bio right now"
"Everything you need to know including the link is waiting for you in my bio"
"I have left all the details in my bio - go check it out and thank me later"
"Head to my bio for the link - I promise it is worth the click"

Strong CTA - urgent, benefit-driven and impossible to ignore:
"Use my code [CODE] at checkout for 10% off - link in my bio and it expires soon"
"My exclusive discount is in my bio right now - grab it before it disappears"
"The deal I negotiated for you is in my bio - link is live right now go go go"
"Bio link is live - use code [CODE] and get yours before stock runs out again"

Rules for every CTA:
- Must be a complete sentence that makes total sense on its own
- Must feel like the creator is talking TO the viewer not AT them
- Must have energy - use dashes, natural pauses and conversational language
- Must tell the viewer exactly what to do AND what they will get by doing it
- Never end flat - end with momentum, urgency or warmth
- Maximum 20 words
- Always specific to the product being featured - never generic

Label each:
UGC SCRIPT 1, UGC SCRIPT 2, UGC SCRIPT 3

For each script show:
FORMAT: [which format used]
HOOK TYPE: [what makes this hook work]
EST. LENGTH: [seconds]
Then the full script.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: ugcScriptPrompt
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Anthropic API request failed');
      }

      const data = await response.json();

      return new Response(
        JSON.stringify({
          success: true,
          scripts: data.content[0].text
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const formatInstructions: Record<string, string> = {
      'hook-and-sell': 'Bold pattern interrupt hook. Build to the offer fast. Direct CTA.',
      'story-led': 'Personal story hook. Build tension. Reveal transformation. Close with CTA.',
      'problem-solution': 'Name the pain clearly. Agitate it. Present solution. Proof. CTA.',
      'trend-challenge': 'High energy. Trend-aware. Bold. Designed to be shared or dueted.',
      'results-first': 'Show the transformation result first. Then explain how to get it.',
      'faith-purpose': 'Scripture or purpose-driven hook. Faith context. Purpose CTA.'
    };

    const lang = contentLanguage || 'English';
    const format = scriptFormat || 'hook-and-sell';
    const cta = selectedCTA || 'Follow for more';
    const delivery = contentMode === 'real-face'
      ? 'Direct-to-camera. Conversational. Add [pause] markers. Short punchy sentences.'
      : 'AI avatar delivery. Slightly polished. Add [B-ROLL: description] markers.';

    const safeKeyBenefits = Array.isArray(keyBenefits) ? keyBenefits : [];
    const styleNote = contentStyle ? `Style: ${contentStyle}` : '';

    const avatarSection = avatarRealPerson ? `

PERFECT AUDIENCE AVATAR:
Real Person: ${avatarRealPerson}
Currently: ${avatarCurrently}
They Feel: ${avatarFeels}
Frustrated By: ${avatarFrustratedBy}
Already Tried: ${avatarAlreadyTried}
Biggest Fear: ${avatarBiggestFear}
Secret Hope: ${avatarSecretHope}
Their Voice: "${avatarVoice}"
Audience Statement: "I help people who feel ${avatarFeelBlank} because they want ${avatarWantBlank} but they're tired of ${avatarTiredOfBlank}"

CRITICAL INSTRUCTION:
Write every script speaking DIRECTLY to this one specific person.
Use THEIR language - the words in their voice, their fears, their secret hope.
Never write for "everyone."
Never use marketing buzzwords.
Make them feel: "This creator gets me completely."
The best performing content makes the viewer think "How did they know exactly what I was thinking?"` : '';

    const promptContent = `Write 3 complete viral social media scripts.

CRITICAL: Never use emojis or unicode symbols in any output. Use only plain ASCII text (letters, numbers, standard punctuation such as hyphens and commas). No exceptions.

CREATOR: ${creatorName || 'Creator'}
BRAND: ${brandName || 'Brand'}
PRODUCT: ${productName || 'my product'}
DESCRIPTION: ${productDescription || ''}
PRICE: ${currency || '$'}${pricePoint || ''}
KEY BENEFITS: ${safeKeyBenefits.join(', ')}
UNIQUE VALUE: ${usp || ''}
TARGET AUDIENCE: ${targetAudience || 'online entrepreneurs'}
PAIN POINT: ${painPoint || 'struggling to get results'}
DESIRED OUTCOME: ${desiredOutcome || 'financial freedom'}${avatarSection}
${productType === 'affiliate' ? `

AFFILIATE CONTENT RULES:
This creator earns commission promoting someone else's product.

Brand being promoted: ${affiliateBrandName || productName}
Platform: ${affiliatePlatform || ''}
Link or Code: ${affiliateLink || ''}
Commission: ${affiliateCommission || ''}

CRITICAL RULES FOR AFFILIATE SCRIPTS:
- NEVER make the content feel like an ad or paid promotion
- Write as if the creator genuinely discovered this product and cannot stop talking about it
- The affiliate link or code is mentioned ONCE at the very end
- Structure every script:
  1. Relatable problem or personal story - NO product mention yet
  2. Build emotional connection
  3. Introduce product naturally as the solution they found
  4. Share a specific result or benefit
  5. CTA with link or code at the end
- Make the audience feel like they got a recommendation from a trusted friend - not a paid promo
` : ''}
${['ebook','template','guide-workbook','mini-course','spreadsheet-tracker','swipe-file','printable'].includes(productType) ? `

DIGITAL PRODUCT SCRIPT RULES:

Product Contents: ${digitalProductContents || ''}
Who It Is For: ${digitalProductAudience || ''}
The Transformation: ${digitalProductTransformation || ''}
Delivery Method: ${digitalProductDelivery || ''}
Value Stack: ${digitalProductValueStack || ''}

SCRIPT STRUCTURE - USE THIS EXACTLY:

1. HOOK
Lead with the transformation result not the product itself.
e.g. "I made my first $500 online using a $17 PDF I made in a weekend"
Numbers and specifics always.

2. PROBLEM
Name the struggle their audience knows personally.
Make them nod their head.

3. SOLUTION TEASE
Hint at what you created.
Do not reveal the price yet.
Build curiosity.

4. VALUE STACK
Walk through what is inside.
Make each component sound valuable.
Use the contents list provided.
Mention the total value.

5. PRICE REVEAL
State the price AFTER the value stack.
Always contrast with total value.
e.g. "All of that for just $27"

6. URGENCY
Give a real reason to act now.
Limited time, price going up, limited spots - keep it honest.

7. CTA
One clear action.
Direct and simple.

GOLDEN RULES:
- Product title mentioned ONCE max
- Transformation mentioned multiple times
- Use specific numbers always
  "47 pages" beats "comprehensive"
  "Made in one weekend" beats "easy"
  "$500 in 30 days" beats "great results"
- Price revealed AFTER value stack every single time
` : ''}

FORMAT: ${format.replace(/-/g, ' ').toUpperCase()}
${formatInstructions[format]}

LANGUAGE: Write entirely in ${lang}. Native tone.
DELIVERY: ${delivery}
${styleNote}
CTA: End each script with this woven in naturally: "${cta}"

DETECT FACELESS VS FACE FORWARD VIDEO TYPES:

For FACELESS video types (if delivery mode indicates AI avatar or voiceover without face):
- Voiceover scripts should be conversational spoken word only with no face or body directions. Stage directions should only describe what the camera shows - the product, the background, close up shots. Maximum 40 words for very short content.
- Scripts with B-roll focus should only include [B-ROLL: description] markers and product/scene directions.

For FACE FORWARD video types (direct-to-camera real person):
- Include full body and face stage directions in brackets
- Script should be conversational and natural as if talking directly to camera
- Word count follows the 60-90 seconds when spoken aloud rule

Never write a face forward style script for a faceless video type.

RULES:
- Label them SCRIPT 1, SCRIPT 2, SCRIPT 3
- Each script has a completely different hook and angle
- 60-90 seconds when spoken aloud
- First line is always the hook - no preamble
- Human authentic voice, no corporate language
- Short punchy sentences that hit emotionally
- Never start with "Are you tired of"
- Never use "game-changer" or "journey"`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: promptContent
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Anthropic API request failed');
    }

    const data = await response.json();
    let scriptText = data.content[0].text;

    // Generate filming directions based on vibe and persona
    if (selectedVibe && selectedPersona) {
      const vibeMap: Record<string, string> = {
        'natural': 'Natural lighting, conversational energy, casual setting',
        'bold': 'Strong lighting, high energy delivery, confident posture',
        'minimal': 'Clean simple background, calm composed tone, soft lighting',
        'luxury': 'Polished aesthetic, elevated setting, sophisticated feel',
        'casual': 'Everyday environment, relaxed vibe, authentic energy',
        'power': 'Professional backdrop, commanding presence, authoritative tone'
      };

      const personaMap: Record<string, string> = {
        'teacher': 'clear explanatory pace, friendly approachable tone',
        'friend': 'warm conversational style, like texting your best mate',
        'coach': 'motivational energy, direct eye contact, push them forward',
        'rebel': 'bold unapologetic delivery, challenge the status quo',
        'expert': 'calm authoritative tone, data-driven confident energy',
        'storyteller': 'expressive emotional delivery, paint the picture'
      };

      const vibeDirection = vibeMap[selectedVibe] || 'Natural authentic setting';
      const personaDirection = personaMap[selectedPersona] || 'conversational tone';

      const filmingDirection = `\n\nSCENE DIRECTION: ${vibeDirection}, ${personaDirection}`;

      // Append filming direction to each script
      scriptText = scriptText.replace(/(SCRIPT [123][\s\S]*?)(?=SCRIPT [123]|$)/g, (match) => {
        return match.trim() + filmingDirection + '\n\n';
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        scripts: scriptText
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Generate error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
