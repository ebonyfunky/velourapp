import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Download, Sparkles } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step7({ onNext, onBack }: Step7Props) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { liveScript, isGeneratingLive } = useCampaignStore();

  const handleDownload = () => {
    const store = useCampaignStore.getState();

    console.log('Store state:', store);

    const divider = '═'.repeat(50);
    const thinDivider = '─'.repeat(50);

    const safeArray = (val: any) => Array.isArray(val) ? val : [];

    const categoryLabels: Record<string, string> = {
      'UGC Creator': 'UGC Creator',
      'Digital Course': 'Digital Course',
      'eBook / Digital Download': 'eBook / Digital Download',
      'Coaching Program': 'Coaching Program',
      'Membership / Community': 'Membership / Community',
      'Print on Demand': 'Print on Demand',
      'Technology & Software': 'Technology & Software',
      'SaaS & Apps': 'SaaS & Apps',
      'AI Tools & Automation': 'AI Tools & Automation',
      'Affiliate Marketing': 'Affiliate Marketing',
      'TikTok Shop': 'TikTok Shop',
      'Agency / Service Provider': 'Agency / Service Provider',
      'Fitness & Wellness': 'Fitness & Wellness',
      'Lifestyle & Travel': 'Lifestyle & Travel',
      'Food & Recipe': 'Food & Recipe',
      'Beauty & Fashion': 'Beauty & Fashion',
      'Faith & Ministry': 'Faith & Ministry',
      'Church / Religious Organisation': 'Church / Religious Organisation',
      'Motivational Speaker': 'Motivational Speaker',
      'Life Coach': 'Life Coach',
      'Non-Profit / Charity': 'Non-Profit / Charity',
      'Physical Product': 'Physical Product',
      'Personal Brand': 'Personal Brand',
      'Other': 'Digital Creator'
    };

    const formatLabels: Record<string, string> = {
      'hook-and-sell': 'Hook & Sell',
      'story-led': 'Story-Led',
      'problem-solution': 'Problem → Solution',
      'trend-challenge': 'Trend & Challenge',
      'results-first': 'Results First',
      'faith-purpose': 'Faith & Purpose',
      'brand-pitch': 'Brand Pitch'
    };

    const content = `
${divider}
VELOUR — CAMPAIGN PACK
Where Creators Become Empires
${divider}

CAMPAIGN: ${store.brandName || 'My Campaign'}
CREATOR: ${store.creatorName || ''}
GENERATED: ${new Date().toLocaleDateString(
      'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    )}

${divider}
SECTION 1 — CAMPAIGN IDENTITY
${divider}

Brand Name: ${store.brandName || '—'}
Creator Name: ${store.creatorName || '—'}
Content Category: ${categoryLabels[store.contentCategory] || store.contentCategory || '—'}
Target Platforms: ${safeArray(store.platformTargets).join(', ') || '—'}
Campaign Goals: ${safeArray(store.campaignGoals).join(', ') || '—'}
Content Language: ${store.contentLanguage || 'English'}
Content Mode: ${store.contentMode === 'real-face'
      ? 'Real Face (Direct to Camera)'
      : store.contentMode === 'ai-twin'
      ? 'AI Twin (Faceless)'
      : '—'}

${divider}
SECTION 2 — PERFECT AUDIENCE AVATAR
${divider}

YOUR AVATAR:
${store.avatarRealPerson || '—'}

THEIR INNER WORLD:
→ Currently: ${store.avatarCurrently || '—'}
→ They feel: ${store.avatarFeels || '—'}
→ Frustrated by: ${store.avatarFrustratedBy || '—'}
→ Already tried: ${store.avatarAlreadyTried || '—'}
→ Biggest fear: ${store.avatarBiggestFear || '—'}
→ Secret hope: ${store.avatarSecretHope || '—'}

THEIR VOICE:
"${store.avatarVoice || '—'}"

YOUR CONTENT FILTER:
"I help people who feel ${store.avatarFeelBlank || '___'}
because they want ${store.avatarWantBlank || '___'}
but they're tired of ${store.avatarTiredOfBlank || '___'}"

SCROLL TEST — Before every post ask:
"Would THIS version of me stop scrolling for this?"

${thinDivider}
Keep this section visible at all times.
This is your messaging anchor.
Every piece of content must pass the scroll test.

${divider}
SECTION 3 — PRODUCT & OFFER
${divider}

Product Name: ${store.productName || '—'}
Product Type: ${store.productType || '—'}
Price: ${store.currency || '$'}${store.pricePoint || '—'}

Key Benefits:
${safeArray(store.benefits).filter(Boolean).map(b => `  • ${b}`).join('\n') || '  —'}

Unique Selling Point: ${store.usp || '—'}
Target Audience: ${store.targetAudience || '—'}
Pain Point: ${store.painPoint || '—'}
Desired Outcome: ${store.desiredOutcome || '—'}

${divider}
SECTION 4 — SCENE DIRECTION
${divider}

Scene Type: ${store.sceneType || '—'}
Lighting Mood: ${safeArray(store.lightingMood).join(', ') || '—'}
Outfit Vibe: ${safeArray(store.outfitVibe).join(', ') || '—'}

${divider}
SECTION 5 — GENERATED SCRIPTS
${divider}

Script Format: ${formatLabels[store.scriptFormat] || store.scriptFormat || '—'}
Content Style: ${store.contentStyle || '—'}
Selected CTA: ${store.selectedCTA || '—'}

${thinDivider}
${store.generatedScripts && store.generatedScripts.length > 0
      ? store.generatedScripts.map((s, i) =>
          `SCRIPT ${i + 1}:\nHook: ${s.hook}\n\n${s.body}\n\nCTA: ${s.cta}\n${thinDivider}`
        ).join('\n')
      : 'No scripts generated yet.\nGo to Step 5 and click Generate first.'}

${divider}
SECTION 6 — LIVE SHOW SCRIPT
${divider}

${store.liveScript
      ? store.liveScript
      : 'No Live script generated yet.\nGo to the Live Show Planner and click Generate.'}

${divider}
SECTION 7 — CONTENT CALENDAR
${divider}

Start Date: ${store.startDate || '—'}
Campaign Duration: ${store.campaignDuration || '—'}
Posting Frequency: ${store.postsPerWeek || '—'} posts/week
Timezone: ${store.timezone || 'EST'}

${thinDivider}
POSTING TIPS:
- Peak for US audiences: 6-8 PM EST
- Peak for Nigerian/African audiences: 7-10 PM WAT
- Best days: Tue, Wed, Thu, Sat
- Reply to every comment within 1 hour
- The algorithm rewards consistency

${divider}
SECTION 8 — BRAND PITCH EMAIL TEMPLATE
${divider}

SUBJECT: ${store.creatorName || 'Creator'} x [Brand Name] — UGC Collaboration Opportunity

Hi [Brand Name] team,

My name is ${store.creatorName || '[Your Name]'} and I specialise in creating ${categoryLabels[store.contentCategory] || store.contentCategory || 'digital creator'} content for ${store.targetAudience || 'my audience'}.

I create authentic, scroll-stopping content for ${safeArray(store.platformTargets).join(' and ') || 'social media'} that drives real engagement and conversions.

I'd love to explore a UGC collaboration with your brand — creating videos that speak directly to your ideal customer in a genuine, relatable way.

Would you be open to a quick chat or for me to send over my media kit?

Looking forward to hearing from you.

${store.creatorName || '[Your Name]'}
${safeArray(store.platformTargets).map(p => `@${(store.creatorName || 'creator').toLowerCase().replace(/\s+/g, '')} on ${p}`).join('\n')}

${store.creatorName || '[Your Name]'}

${divider}
SECTION 9 — UGC STARTER KIT
${divider}

YOUR UGC NICHE:
${(() => {
  try {
    const parsed = JSON.parse(store.ugcNicheResult || '{}');
    return parsed.niche || '—';
  } catch {
    return '—';
  }
})()}

YOUR RATES:
─────────────────────────────────────
15-30 sec video:    ${store.ugcExperience === 'beginner' ? '$150' : store.ugcExperience === 'intermediate' ? '$250' : store.ugcExperience === 'experienced' ? '$400' : '$—'}
30-60 sec video:    ${store.ugcExperience === 'beginner' ? '$250' : store.ugcExperience === 'intermediate' ? '$400' : store.ugcExperience === 'experienced' ? '$650' : '$—'}
60-90 sec video:    ${store.ugcExperience === 'beginner' ? '$350' : store.ugcExperience === 'intermediate' ? '$550' : store.ugcExperience === 'experienced' ? '$900' : '$—'}
Photo pack (5):     ${store.ugcExperience === 'beginner' ? '$100' : store.ugcExperience === 'intermediate' ? '$200' : store.ugcExperience === 'experienced' ? '$350' : '$—'}
─────────────────────────────────────
Add-ons:
${safeArray(store.ugcAddOns).map(a => '• ' + a).join('\n') || '• None selected'}

PORTFOLIO CHECKLIST:
Unboxing Review video (30-60 sec)
Before & After video (30-45 sec)
Honest Review video (45-60 sec)
Lifestyle Integration video (20-40 sec)
Results Story video (45-75 sec)
Hero Shot photo
Lifestyle Flat Lay photo
In-Use Shot photo
Result Photo
Story Graphic

WHERE TO FIND BRANDS:
Free: TikTok Creator Marketplace,
Instagram Collabs Manager,
LinkedIn, TikTok Shop, Facebook Groups

Paid: Billo.app, Fiverr, Upwork,
Join Brands, Brands Meet Creators

DAY 1 ACTION PLAN:
Hour 0-1:   Update creator profiles
Hour 1-3:   Film first portfolio video
Hour 3-4:   Create Google Drive portfolio
Hour 4-5:   Send first 3 brand pitches
Day 2-7:    Film 2 more portfolio videos

${divider}
Remember: You do not need 10,000 followers.
You do not need expensive equipment.
You need your phone, good lighting,
and a Velour script.
That is it.
${divider}

${divider}
SECTION 10 — FILMING CHECKLIST
${divider}

BEFORE YOU FILM:
Pick your Velour script (above)
Face a window or set up ring light
Camera at eye level or slightly above
Eyes in the top third of the frame
Clean minimal background
Phone on Do Not Disturb
Read script 3 times before recording
Record minimum 3 takes

AFTER YOU FILM:
Add on-screen captions
Add your CTA text overlay
Post at peak time for your timezone
Reply to every comment within 1 hour
DM anyone who comments with a question

${divider}
SECTION 10 — WEEKLY GROWTH ACTIONS
${divider}

Post 3x minimum using your scripts
Send 3 brand pitch emails
Go Live once using your Live script
Post one result or testimonial
Comment on 10 posts in your niche daily
Check analytics at end of week
Double down on what performed best

${thinDivider}
Remember: Consistent beats perfect.
Every post is data.
Every comment is a relationship.
Every view is a potential customer.

${divider}
VELOUR — WHERE CREATORS BECOME EMPIRES
velour-app.com
${divider}
`.trim();

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `velour-campaign-${
      (store.brandName || 'pack')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }-${new Date().toISOString().split('T')[0]}.txt`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleGenerateLiveScript = async () => {
    const store = useCampaignStore.getState();

    store.setIsGeneratingLive(true);
    store.setLiveScript('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-scripts`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'live',
          creatorName: store.creatorName,
          brandName: store.brandName,
          productName: store.productName,
          pricePoint: store.pricePoint,
          currency: store.currency,
          keyBenefits: Array.isArray(store.benefits) ? store.benefits : [],
          usp: store.usp,
          targetAudience: store.targetAudience,
          painPoint: store.painPoint,
          desiredOutcome: store.desiredOutcome,
          contentLanguage: store.contentLanguage || 'English',
          contentMode: store.contentMode,
          contentStyle: store.contentStyle,
          avatarRealPerson: store.avatarRealPerson,
          avatarCurrently: store.avatarCurrently,
          avatarFeels: store.avatarFeels,
          avatarFrustratedBy: store.avatarFrustratedBy,
          avatarAlreadyTried: store.avatarAlreadyTried,
          avatarBiggestFear: store.avatarBiggestFear,
          avatarSecretHope: store.avatarSecretHope,
          avatarVoice: store.avatarVoice,
          avatarFeelBlank: store.avatarFeelBlank,
          avatarWantBlank: store.avatarWantBlank,
          avatarTiredOfBlank: store.avatarTiredOfBlank,
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      store.setLiveScript(data.scripts);

    } catch (error) {
      console.error('Live generate error:', error);
      store.setLiveScript(
        'Error: ' + (error instanceof Error ? error.message : 'Unknown error') + '. Please try again.'
      );
    } finally {
      store.setIsGeneratingLive(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="gradient-text mb-2">Creator Confidence Studio</h1>
        <p className="text-gold text-[14px] font-semibold italic">
          Everything you need to create, post and go viral
        </p>
      </div>

      <div className="space-y-6">
        <div
          style={{
            background: '#1c1a35',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <h3 className="text-[20px] font-bold text-text-primary mb-1">
            Live Show Planner
          </h3>
          <p className="text-[13px] text-text-dim mb-6">
            Never freeze on a Live again — know exactly what to say from open to close
          </p>

          <button
            onClick={handleGenerateLiveScript}
            disabled={isGeneratingLive}
            style={{
              background: 'linear-gradient(135deg, #1a5c35, #2e8b57)',
              color: '#ffffff',
              borderRadius: '100px',
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: 700,
              width: '100%',
              cursor: isGeneratingLive ? 'not-allowed' : 'pointer',
              marginBottom: '16px',
              opacity: isGeneratingLive ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {isGeneratingLive ? 'Generating...' : 'Generate My Live Script'}
          </button>

          <div
            style={{
              background: '#17152e',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '12px',
              padding: '20px',
              minHeight: '180px',
              display: 'flex',
              alignItems: isGeneratingLive || !liveScript ? 'center' : 'flex-start',
              justifyContent: isGeneratingLive || !liveScript ? 'center' : 'flex-start',
              textAlign: isGeneratingLive || !liveScript ? 'center' : 'left',
              flexDirection: 'column',
            }}
          >
            {isGeneratingLive ? (
              <>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid rgba(232, 201, 106, 0.2)',
                    borderTop: '3px solid #e8c96a',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '12px',
                  }}
                />
                <p style={{ color: '#e8c96a', fontSize: '13px', lineHeight: '1.6' }}>
                  Velour is writing your<br />30-minute Live script...
                </p>
              </>
            ) : !liveScript ? (
              <>
                <div style={{ fontSize: '32px', marginBottom: '8px' }} />
                <p style={{ color: '#9b8fb5', fontSize: '13px', lineHeight: '1.6' }}>
                  Click Generate to create your<br />30-minute Live show script
                </p>
              </>
            ) : (
              <div style={{ width: '100%', textAlign: 'left' }}>
                <div
                  style={{ color: '#f0ebff', fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{
                    __html: liveScript
                      .replace(/PART \d+ — [^\n]+/g, (match) =>
                        `<div style="color: #e8c96a; font-weight: 700; font-size: 13px; border-bottom: 1px solid rgba(201,168,76,0.2); margin-bottom: 8px; padding-bottom: 4px; margin-top: 16px;">${match}</div>`
                      )
                      .replace(/\[READ COMMENTS\]/g, '<span style="color: #4ade80; font-style: italic; font-size: 11px;">[READ COMMENTS]</span>')
                      .replace(/\[pause\]/g, '<span style="color: #9b8fb5; font-style: italic; font-size: 11px;">[pause]</span>')
                      .replace(/\[SHOW PRODUCT\]/g, '<span style="color: #a78bfa; font-style: italic; font-size: 11px;">[SHOW PRODUCT]</span>')
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className="velour-card p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(46,139,87,0.05))',
            borderColor: 'rgba(201,168,76,0.4)',
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #2e8b57)',
                boxShadow: '0 0 40px rgba(201,168,76,0.4)',
              }}
            >
              <Package className="w-10 h-10 text-bg" />
            </div>
          </div>

          <h3 className="text-[24px] font-bold text-text-primary mb-3">Your Campaign Pack is Ready</h3>
          <p className="text-[14px] text-text-body mb-8 max-w-md mx-auto leading-relaxed">
            Your complete campaign pack includes AI twins, viral scripts, scene prompts, and a content calendar
            optimized for maximum reach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div
              className="p-4 rounded-xl text-left"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Sparkles className="w-5 h-5 text-gold mb-2" />
              <h4 className="text-[14px] font-bold text-text-primary mb-1">AI Twin Images</h4>
              <p className="text-[12px] text-text-dim">Ready-to-use digital twin variations</p>
            </div>

            <div
              className="p-4 rounded-xl text-left"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Sparkles className="w-5 h-5 text-gold mb-2" />
              <h4 className="text-[14px] font-bold text-text-primary mb-1">Viral Scripts</h4>
              <p className="text-[12px] text-text-dim">Platform-optimized content scripts</p>
            </div>

            <div
              className="p-4 rounded-xl text-left"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Sparkles className="w-5 h-5 text-gold mb-2" />
              <h4 className="text-[14px] font-bold text-text-primary mb-1">Scene Prompts</h4>
              <p className="text-[12px] text-text-dim">Detailed visual direction for each post</p>
            </div>

            <div
              className="p-4 rounded-xl text-left"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <Sparkles className="w-5 h-5 text-gold mb-2" />
              <h4 className="text-[14px] font-bold text-text-primary mb-1">Content Calendar</h4>
              <p className="text-[12px] text-text-dim">Scheduled posting plan with best times</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-[15px] tracking-wider transition-all"
            style={{
              background: 'linear-gradient(135deg, #1a5c35, #2e8b57, #c9a84c)',
              color: '#f0ebff',
              boxShadow: '0 8px 32px rgba(46,139,87,0.4)',
            }}
          >
            <Download className="w-5 h-5" />
            Download Campaign Pack
          </button>

          {downloadSuccess && (
            <div
              style={{
                color: '#4ade80',
                fontSize: '13px',
                fontWeight: 700,
                textAlign: 'center',
                marginTop: '12px',
              }}
            >
              Campaign Pack Downloaded!
            </div>
          )}
        </div>

      </div>

      <div className="flex justify-center pt-6">
        <p
          className="max-w-md text-center leading-relaxed"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '13px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#9b8fb5',
            letterSpacing: '0.02em',
            lineHeight: 1.8,
          }}
        >
          Velour is built for creators everywhere — Nigeria, UK, USA, Canada, Ghana, Kenya, South Africa, Jamaica,
          Philippines, India and beyond. Your story deserves to be heard. Your empire starts here.
        </p>
      </div>

      <div className="flex gap-4 justify-center pt-4">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      </div>
    </motion.div>
  );
}
