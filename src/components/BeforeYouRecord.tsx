import { useCampaignStore } from '../store/campaignStore';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CARDS = [
  {
    id: 'background',
    icon: '🏠',
    title: 'Your Background',
    subtitle: 'Your background speaks before you do',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Brands mentally place your video on their website or in a paid ad before they respond to you. If your background makes that impossible they move on. Keep it clean, simple and relevant to the product you are featuring.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Best backgrounds by niche:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Skincare and beauty — bathroom vanity, clean shelf, neutral wall
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Fitness and supplements — gym bag on floor, athletic wear backdrop, outdoors
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Food and drink — kitchen counter, dining table, morning light by a window
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Tech and apps — clean desk setup, minimal background, good desk lighting
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Baby and family — tidy living room, nursery, kitchen
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Home and lifestyle — bedroom with made bed, living room couch, styled shelf
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            What to avoid:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Messy or cluttered rooms — clutter distracts from the product
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Visible laundry, dishes or random objects
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Busy patterned wallpaper
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Other brand logos visible unless it is the product you are featuring
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Dark or poorly lit backgrounds
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          Velour Rule: Ask yourself — could a brand put this video on their website right now? If the answer is no your background needs work.
        </div>
      </>
    ),
  },
  {
    id: 'framing',
    icon: '📐',
    title: 'Camera Angle and Framing',
    subtitle: 'How you frame yourself determines if brands take you seriously',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Most beginner creators film at the wrong angle and do not realise it until they watch the video back. Get your framing right before you film a single second.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Do this:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Film at eye level or very slightly above — never below
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Frame from chest to just above your head — not too tight, not too wide
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Leave a small amount of space above your head for captions
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Always film vertical 9:16 — never horizontal for UGC content
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Avoid:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Looking down at your camera — creates an unflattering angle and feels disconnected
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Extreme close-ups of just your face
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Crooked or tilted angles — they look amateur
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Too much empty space above or around you
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          If you are using a phone prop it against something stable at eye level. A stack of books works perfectly.
        </div>
      </>
    ),
  },
  {
    id: 'sound',
    icon: '🎤',
    title: 'Sound Quality',
    subtitle: 'Bad audio kills a great video every single time',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Brands need audio clean enough to run in a paid ad. If a viewer has to strain to hear you they will scroll. If a brand cannot use your audio in an ad they will not hire you again.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Do this:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Film in the quietest room in your home
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Turn off fans, TVs, air conditioning and anything that creates background hum
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Use AirPods or a clip mic if you have one — they are dramatically better than your phone microphone
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Speak clearly, confidently and at a consistent volume throughout
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Do a 10 second test recording first and play it back before filming your full video
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Avoid:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Rooms with echo — bathrooms and empty rooms echo badly
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Filming near open windows if there is traffic or wind outside
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Kids, pets or TV audible in the background
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Dropping your voice at the end of sentences — keep energy consistent
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          You do not need expensive equipment. A quiet room and AirPods will produce audio that brands can actually use.
        </div>
      </>
    ),
  },
  {
    id: 'lighting',
    icon: '💡',
    title: 'Lighting',
    subtitle: 'Natural light is free and it is all you need',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          This is already covered in the What Brands Actually Look For section — go back and review it if you need a reminder. The one rule: face your light source, never have it behind you.
        </p>

        <button
          onClick={() => {
            const section = document.querySelector('[data-section="brands-look-for"]');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '100px',
            color: '#c9a84c',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Review Lighting Tips →
        </button>
      </>
    ),
  },
  {
    id: 'appearance',
    icon: '👗',
    title: 'How To Look On Camera',
    subtitle: 'You do not need to be glamorous — you need to look intentional',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Brands want real people — not models. But real and put together are not the same thing. Look like you made an effort for this video even if you filmed it in your bedroom.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            What to aim for:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Clean and tidy — whatever your version of that looks like
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Awake and present — not like you just rolled out of bed
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              On-brand for the product — wear what makes sense for what you are promoting
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            By niche:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Skincare and beauty — fresh faced, minimal makeup or full glam depending on the product
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Fitness — athletic wear, hair tied back, look like you work out
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Parenting and family — casual but tidy, comfortable and relatable
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Business apps and tech — neutral, polished, smart casual
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Food and lifestyle — relaxed and natural, whatever feels like you at your best
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          People buy from people they trust and relate to. You do not need to look like an influencer — you need to look like someone who genuinely uses this product.
        </div>
      </>
    ),
  },
  {
    id: 'energy',
    icon: '🙌',
    title: 'Energy and Body Language',
    subtitle: 'Your energy is contagious — make sure it is the right kind',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Viewers decide within 2 seconds whether they like you. Your body language makes that decision for them before you say a word.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Do this:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Smile naturally — not a forced wide smile, just genuine warmth
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Keep your posture open — shoulders back, facing the camera directly
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Use your hands when you talk — it makes you look natural and engaged
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Look directly into the camera lens — not at yourself on the screen
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Vary your pace — speed up for exciting moments, slow down for important points
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Avoid:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Stiff, rigid posture — it reads as nervous and unnatural
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Looking at yourself on screen — viewers can tell immediately
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Monotone delivery — if you sound bored they feel bored
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Rushing through your script — slow down more than you think you need to
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          Record a practice run with no intention of using it. Watch it back with the sound off and just watch your body language. You will immediately see what to fix.
        </div>
      </>
    ),
  },
  {
    id: 'text',
    icon: '📝',
    title: 'On-Screen Text',
    subtitle: 'Text on screen should help viewers — not overwhelm them',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Whether you are filming a text on screen video or just adding captions your text choices affect how professional your content looks to brands.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Do this:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Use big clear captions — small text gets ignored
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              High contrast always — white text on dark backgrounds, dark text on light backgrounds
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Maximum 4-5 words per line — force the viewer to read fast
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Keep all text away from the edges — phones cut off content near the edges
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Use one consistent font throughout your video — do not mix styles
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Avoid:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Too many words on screen at once
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Light text on light backgrounds or dark text on dark backgrounds
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Text that appears and disappears too fast to read
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Fancy or decorative fonts that are hard to read quickly
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          In CapCut use the Auto Captions feature first then clean up any errors. Big, bold, high contrast captions can add up to 40% more watch time.
        </div>
      </>
    ),
  },
  {
    id: 'brandsafe',
    icon: '🛡️',
    title: 'Brand-Safe Behaviour',
    subtitle: 'Know what brands will and will not tolerate before you film',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          Brands are trusting you to represent them. One brand-unsafe moment in a video can cost you the deal, the relationship and your reputation on the platform.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Never do this in a UGC video:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Swear or use profanity even mild profanity
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Mention or compare to competitor products
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Make medical or health claims — never say something cured, treated or healed you
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Exaggerate results beyond what the product can realistically deliver
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Bash other products or brands even indirectly
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Share anything that could be considered medical, legal or financial advice
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Always do this:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Stay honest — if results vary say so naturally
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Share your personal experience as your own experience — not as a universal fact
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Follow the brief exactly — brands brief you for legal and brand reasons
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Stay compliant with platform advertising guidelines
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#ef4444',
            fontStyle: 'italic',
          }}
        >
          One brand-unsafe video can get your content pulled, your deal cancelled and your reputation flagged on platforms. It is not worth it. Stay honest, stay genuine and stay compliant.
        </div>
      </>
    ),
  },
  {
    id: 'vibe',
    icon: '✨',
    title: 'The Overall Vibe Every UGC Video Must Have',
    subtitle: 'This is what separates creators brands hire once from creators they hire on retainer',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          After everything — the background, the lighting, the script, the editing — it all comes down to this. Does the video feel real?
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Your video must feel:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Trustworthy — like a recommendation from someone who genuinely uses the product
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Relatable — like something a real person in the viewer's life would say
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Calm and confident — assured without being salesy
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Conversational — like you are talking to one person not performing for an audience
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', marginBottom: '10px' }}>
            Your video must never feel:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Scripted — even though it is scripted it must never sound scripted
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Salesy — the moment a viewer feels sold to they disengage
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Influencer-fake — overly polished, performative or inauthentic
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              Chaotic — rushed, unstructured or hard to follow
            </li>
          </ul>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          The best UGC videos feel like you accidentally caught someone recommending something they love. That is the standard. Every video you create should feel like that.
        </div>
      </>
    ),
  },
  {
    id: 'broll',
    icon: '🎥',
    title: 'B-Roll — The Shot Nobody Sees That Makes Every Brand Stop And Watch',
    subtitle: 'The creators brands keep rehiring all have one thing in common — they shoot B-roll',
    content: (
      <>
        <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
          There are two types of footage in every great UGC video. The first is you — talking, reacting, recommending. The second is everything else — the shots that bring your words to life visually. That second type is B-roll. And most beginner creators skip it entirely. That is exactly why their videos feel flat and why brands do not call them back.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            The simplest way to understand it:
          </div>
          <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: 0, fontStyle: 'italic' }}>
            Imagine listening to someone describe a holiday while staring at a blank wall versus watching the photos as they talk. Same words. Completely different experience. B-roll is the photos.
          </p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            What B-roll looks like in a real UGC video:
          </div>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '10px' }}>Clean visual chips:</p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              🧴 The product being applied or used — hands only, no face needed
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              📦 The unboxing moment — tissue paper, packaging, the first reveal
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              🔍 An extreme close-up of the texture, the label, the finish
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              📱 Scrolling through an app, a website or a results page
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              ☕ A lifestyle moment — morning routine, desk, gym, kitchen
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              ✋ Holding the product naturally from different angles and distances
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              😊 Your genuine reaction — the moment something works, feels good or surprises you
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              🌿 The product sitting in its natural home — shelf, bathroom counter, gym bag
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '10px' }}>
            Four reasons B-roll is what separates good creators from great ones:
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
              👁️ It holds attention longer than a talking head ever will
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: 0, fontStyle: 'italic' }}>
              Every visual change gives the brain a reason to stay. Brands measure this. More visual variety equals longer watch time equals more sales. Creators who deliver that get booked again.
            </p>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
              ✂️ It is your best editing tool
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: 0, fontStyle: 'italic' }}>
              Stumbled over a word? Cut to a product close-up. Needed a breath between sentences? Cover it with a lifestyle shot. B-roll does not just make your video look better — it makes the editing process forgiving.
            </p>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
              🎬 It signals professional experience immediately
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: 0, fontStyle: 'italic' }}>
              A brand watching your portfolio can tell within three seconds whether you understand B-roll. The ones who do look like they have been doing this for years. The ones who do not look like they just pressed record and hoped for the best.
            </p>
          </div>

          <div style={{ marginBottom: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
              🌍 It puts the product inside a real life
            </div>
            <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginBottom: 0, fontStyle: 'italic' }}>
              Anyone can hold up a product and talk about it. What brands actually need is to see their product existing naturally in someone's world. B-roll is how you show that without saying a single extra word.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#e8c96a', marginBottom: '6px' }}>
            How to capture B-roll without making it complicated:
          </div>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '10px', fontStyle: 'italic' }}>
            Film your main clips first. Then before you put the product down spend 5-10 minutes on these shots:
          </p>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              Three angles of the product — front, side, close-up
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              The product being used or applied — film your hands not your face
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              One wide lifestyle shot with the product in its environment
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              One genuine reaction shot — the moment it works or feels good
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '6px', lineHeight: '1.5' }}>
              The packaging — the unboxing moment, the label, any extras inside
            </li>
            <li style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: 0, lineHeight: '1.5' }}>
              One before context shot — what the situation looked like before the product entered it
            </li>
          </ol>
          <p style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.6', marginTop: '10px', marginBottom: 0, fontStyle: 'italic' }}>
            Six shot types. Ten minutes maximum. Enough B-roll to cover your entire video and make it look twice as professional in the edit.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
            marginBottom: '16px',
          }}
        >
          The Velour B-Roll Standard: For every 4 seconds of you talking aim for at least 2 seconds of B-roll. A video that never cuts away from your face is a video that loses viewers — and loses brand deals.
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            color: '#c9a84c',
            fontStyle: 'italic',
          }}
        >
          The question that changes how you film forever: Before you put the product away after filming ask yourself one thing: what did I say in this script that I could have shown instead? Then film those moments. That habit alone will put you in the top tier of UGC creators most brands never get to work with.
        </div>
      </>
    ),
  },
];

export default function BeforeYouRecord() {
  const { beforeRecordCardsExpanded, setField } = useCampaignStore();

  const toggleCard = (cardId: string) => {
    setField('beforeRecordCardsExpanded', {
      ...beforeRecordCardsExpanded,
      [cardId]: !beforeRecordCardsExpanded[cardId],
    });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
        🎬 Before You Press Record — Set Yourself Up For A Brand-Ready Video
      </h2>
      <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '24px', fontStyle: 'italic' }}>
        The difference between a video brands ignore and one they pay for is often decided before you say a single word. Get these right every time.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {CARDS.map((card) => {
          const isExpanded = beforeRecordCardsExpanded[card.id] || false;

          return (
            <div
              key={card.id}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: isExpanded ? '3px solid #c9a84c' : '3px solid transparent',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => toggleCard(card.id)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '24px' }}>{card.icon}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0ebff', marginBottom: '2px' }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic' }}>
                      {card.subtitle}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown size={20} style={{ color: '#c9a84c', flexShrink: 0 }} />
                ) : (
                  <ChevronRight size={20} style={{ color: '#9b8fb5', flexShrink: 0 }} />
                )}
              </button>

              {isExpanded && (
                <div
                  style={{
                    padding: '0 20px 20px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ paddingTop: '16px' }}>{card.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
