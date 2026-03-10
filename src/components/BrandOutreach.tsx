import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Copy, Plus, Trash2, ChevronDown, ChevronUp, TrendingUp, Calendar } from 'lucide-react';
import DatePicker from './DatePicker';

const platformOptions = ['Email', 'Instagram DM', 'TikTok', 'Billo', 'Insense', 'Other'];
const statusOptions = ['Not Sent Yet', 'Sent', 'Replied', 'Negotiating', 'Closed', 'Rejected'];

const pitchTemplates = [
  {
    id: 'cold-email',
    label: 'The Cold Email Pitch',
    template: `Subject: UGC Creator in [Niche] - Partnership Opportunity

Hi [Brand Name] Team,

I'm [Your Name], a UGC creator specializing in [Niche] content. I've been following your brand and absolutely love what you're doing with [specific product or campaign].

I create authentic, scroll-stopping content that drives real conversions for brands like yours. My videos focus on [Video Type] and I've helped similar brands in the [Niche] space see genuine engagement and sales.

I'd love to create content for [Brand Name]. I can deliver:
- [Video Type 1] showcasing your [Product]
- High-quality raw files ready for ads
- Content that speaks directly to your target audience

Here's my portfolio: [Portfolio Link]

Would you be open to a quick collaboration? I'd be happy to send over my rate card and discuss what would work best for your goals.

Looking forward to hearing from you!

Best,
[Your Name]
[Your Email]
[Your Portfolio/Instagram Handle]`
  },
  {
    id: 'instagram-dm',
    label: 'The Instagram DM Pitch',
    template: `Hey [Brand Name]!

I'm a UGC creator in the [Niche] space and I've been obsessed with your [Product]. The way you [specific thing you noticed] is exactly what my audience loves.

I create scroll-stopping [Video Type] content that converts. I'd love to create something for you - either as a paid collab or for your upcoming campaigns.

Here's my work: [Portfolio Link]

Would you be interested in chatting about a partnership? I can send over my rate card if that helps!`
  },
  {
    id: 'follow-up',
    label: 'The Follow Up Message',
    template: `Hi [Brand Name],

Just wanted to follow up on my email from [Date] about creating UGC content for your brand.

I know inboxes get busy, so I wanted to make sure this didn't get lost. I'm genuinely excited about the possibility of working together and creating content that drives results for [Product].

If now isn't the right time, no worries at all - I'd love to stay in touch for future opportunities.

Here's my portfolio again: [Portfolio Link]

Let me know if you'd like to chat!

Best,
[Your Name]`
  },
  {
    id: 'tiktok-shop',
    label: 'The TikTok Shop Pitch',
    template: `Subject: TikTok Shop Affiliate Partnership - [Your Niche]

Hi [Brand Name],

I'm [Your Name], a TikTok creator in the [Niche] space with an engaged audience that loves [Product Type].

I noticed your products on TikTok Shop and I think they'd be a perfect fit for my content. I specialize in [Video Type] and my videos consistently drive product discovery and sales.

I'd love to partner with you to create authentic content featuring your [Product]. I can:
- Create engaging TikTok videos optimized for the Shop
- Drive affiliate sales through strategic CTAs
- Provide usage rights if needed for your own marketing

My TikTok: [Your Handle]
Portfolio: [Portfolio Link]

Would you be open to an affiliate partnership or paid collaboration?

Looking forward to working together!

[Your Name]`
  },
  {
    id: 'rate-card',
    label: 'The Rate Card Pitch',
    template: `Hi [Brand Name],

Thanks so much for your interest! I'd love to work together.

Here's my current pricing for UGC content:

**Single Video (30-60s):** $[Rate]
Includes: Raw video file, 2 rounds of revisions, usage rights for organic + paid ads

**3-Video Package:** $[Package Rate]
Includes: 3 videos in different formats (testimonial, tutorial, lifestyle), raw files, usage rights

**Add-ons:**
- Extra revisions: $[Rate]
- Expedited delivery (48hr): $[Rate]
- Extended usage rights (1 year): $[Rate]

Turnaround time: [Timeframe]

My portfolio: [Portfolio Link]

Does this work with your budget? I'm happy to customize a package that fits your needs!

Let me know what you're thinking.

Best,
[Your Name]`
  }
];

const objectionHandlers = [
  {
    objection: '"Your following is too small"',
    response: "I completely understand! The great thing about UGC is that it's not about my following - it's about creating authentic content you can use in your own ads and on your own channels. Brands use UGC creators specifically because the content performs better than influencer posts. You're buying the content, not my audience. That's why my rates reflect content creation, not influencer rates."
  },
  {
    objection: '"We don\'t have budget right now"',
    response: "No problem at all! I totally understand budget cycles. Would it make sense to keep in touch for when budget opens up? I can also offer a smaller starter package - like one video instead of three - to make it easier to test the partnership. Some of my best long-term clients started with a single video and loved the results."
  },
  {
    objection: '"Can you do it for free product?"',
    response: "I appreciate the offer! I do occasionally work on gifted partnerships, but only if it's a product I'm already planning to buy or if there's potential for a long-term paid relationship. For one-off collabs, I focus on paid work since this is my business. That said, I'd love to start a conversation about what a paid partnership could look like if you're open to it!"
  },
  {
    objection: '"We already have a UGC creator"',
    response: "That's awesome that you're already working with creators! Most brands I work with actually use multiple UGC creators because it gives them a variety of perspectives, faces, and content styles to test. Having a roster of creators means you never run out of fresh content. I'd love to be part of your rotation if you're ever looking to expand your creator pool!"
  },
  {
    objection: '"Send us your rate card"',
    response: "Absolutely! I'd be happy to send that over. Just to make sure I send you the most relevant info - what type of content are you looking for? (Example: testimonial, tutorial, unboxing, etc.) And how many videos were you thinking? This way I can customize the pricing to exactly what you need."
  }
];

const brandDiscoveryPlatforms = [
  {
    name: 'TikTok Creator Marketplace',
    description: 'Free. Brands post open campaigns. Go to TikTok Studio  Creator Marketplace  Apply to campaigns in your niche.'
  },
  {
    name: 'TikTok Shop Affiliate',
    description: 'Find products in your niche, create videos, earn commission per sale. No pitch needed to start.'
  },
  {
    name: 'Cold Email Outreach',
    description: 'Find DTC brands on Instagram or TikTok. Go to their website. Find the marketing or partnerships email. Pitch directly.'
  },
  {
    name: 'Billo',
    description: 'UGC platform that connects brands with creators. Apply at billo.app'
  },
  {
    name: 'Insense',
    description: 'Premium UGC marketplace. Brands post briefs, creators apply. insense.pro'
  },
  {
    name: 'Passionfroot',
    description: 'Build a creator storefront and let brands come to you. passionfroot.me'
  },
  {
    name: 'Instagram DM Outreach',
    description: 'Find small to mid-size brands in your niche. DM their business account with your pitch. Response rate is higher than email for smaller brands.'
  }
];

export default function BrandOutreach() {
  const { outreachPitches, outreachChallengeStartDate, setField } = useCampaignStore();

  const [showObjections, setShowObjections] = useState(false);
  const [newPitch, setNewPitch] = useState({
    brandName: '',
    platform: 'Email',
    datePitched: new Date().toISOString().split('T')[0],
    status: 'Not Sent Yet',
    notes: ''
  });

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
  };

  const addPitch = () => {
    if (!newPitch.brandName) return;

    const pitch = {
      id: Date.now().toString(),
      brandName: newPitch.brandName,
      platform: newPitch.platform,
      datePitched: newPitch.datePitched,
      status: newPitch.status,
      notes: newPitch.notes
    };

    setField('outreachPitches', [...outreachPitches, pitch]);
    setField('ugcPitchesSent', outreachPitches.length + 1);

    setNewPitch({
      brandName: '',
      platform: 'Email',
      datePitched: new Date().toISOString().split('T')[0],
      status: 'Not Sent Yet',
      notes: ''
    });
  };

  const updatePitchStatus = (id: string, status: string) => {
    const updated = outreachPitches.map(pitch =>
      pitch.id === id ? { ...pitch, status } : pitch
    );
    setField('outreachPitches', updated);
  };

  const deletePitch = (id: string) => {
    const updated = outreachPitches.filter(pitch => pitch.id !== id);
    setField('outreachPitches', updated);
    setField('ugcPitchesSent', updated.length);
  };

  const startChallenge = () => {
    setField('outreachChallengeStartDate', new Date().toISOString());
  };

  const getDaysIntoChallenge = () => {
    if (!outreachChallengeStartDate) return 0;
    const start = new Date(outreachChallengeStartDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(diff + 1, 30);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Sent Yet': return '#9b8fb5';
      case 'Sent': return '#c9a84c';
      case 'Replied': return '#4a9eff';
      case 'Negotiating': return '#ff8c42';
      case 'Closed': return '#38d39f';
      case 'Rejected': return '#ff6b6b';
      default: return '#9b8fb5';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Not Sent Yet': return '#f0ebff';
      case 'Sent': return '#0a0610';
      case 'Replied': return '#0a0610';
      case 'Negotiating': return '#0a0610';
      case 'Closed': return '#0a0610';
      case 'Rejected': return '#ffffff';
      default: return '#0a0610';
    }
  };

  const pitchesGoal = 10;
  const pitchesProgress = (outreachPitches.length / pitchesGoal) * 100;
  const daysIntoChallenge = getDaysIntoChallenge();

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Brand Outreach
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Your complete command center for finding brands and closing deals
      </p>

      {/* Section 1: Outreach Score Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,105,20,0.15))',
          border: '2px solid #c9a84c',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.08 }}>
          <TrendingUp size={140} strokeWidth={1} style={{ color: '#c9a84c' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#f0ebff',
              marginBottom: '8px',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            85% of UGC creators never send a single pitch. The ones who do - win.
          </div>

          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#e8c96a' }}>
                Your Goal: {pitchesGoal} pitches this month
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#c9a84c' }}>
                {outreachPitches.length} / {pitchesGoal}
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '16px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.min(pitchesProgress, 100)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Where To Find Brands */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '16px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Where To Find Your First Brand Deal
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          These are the exact platforms where brands are actively looking for UGC creators right now
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {brandDiscoveryPlatforms.map((platform, i) => (
            <div
              key={i}
              style={{
                background: '#1c1a35',
                border: '1.5px solid rgba(201,168,76,0.2)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#c9a84c';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {platform.emoji && <div style={{ fontSize: '40px', marginBottom: '16px' }}>{platform.emoji}</div>}
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
                {platform.name}
              </div>
              <div style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.6 }}>
                {platform.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Pitch Templates */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Pitch Templates That Actually Get Replies
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Copy these proven templates and customize them with your details
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pitchTemplates.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a' }}>{item.label}</div>
                <button
                  onClick={() => copyTemplate(item.template)}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                    color: '#0a0610',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Copy size={16} />
                  Copy Template                 </button>
              </div>
              <pre
                style={{
                  fontSize: '13px',
                  color: '#d4cee8',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '16px',
                  borderRadius: '8px',
                  margin: 0,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {item.template}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Pitch Tracker */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Your Pitch Tracker
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
          Log every brand you pitch to stay organized and follow up at the right time
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Brand Name
              </label>
              <input
                type="text"
                value={newPitch.brandName}
                onChange={(e) => setNewPitch({ ...newPitch, brandName: e.target.value })}
                placeholder="e.g., Glossier"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Platform
              </label>
              <select
                value={newPitch.platform}
                onChange={(e) => setNewPitch({ ...newPitch, platform: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              >
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Date
              </label>
              <DatePicker
                value={newPitch.datePitched ? new Date(newPitch.datePitched) : new Date()}
                onChange={(date) => setNewPitch({ ...newPitch, datePitched: date.toISOString().split('T')[0] })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Notes
            </label>
            <textarea
              value={newPitch.notes}
              onChange={(e) => setNewPitch({ ...newPitch, notes: e.target.value })}
              placeholder="Any notes about this brand..."
              rows={2}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f0ebff',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#9b8fb5', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Status
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px', marginBottom: '16px' }}>
              {statusOptions.map((status) => {
                const isSelected = newPitch.status === status;
                const isPurple = status === 'Not Sent Yet';
                return (
                  <button
                    key={status}
                    onClick={() => setNewPitch({ ...newPitch, status })}
                    style={{
                      padding: '10px 18px',
                      background: isSelected ? getStatusColor(status) : 'rgba(255,255,255,0.03)',
                      border: isSelected ? (isPurple ? '1.5px solid #9b8fb5' : '1.5px solid ' + getStatusColor(status)) : '1px solid ' + (isPurple ? '#9b8fb5' : 'rgba(255,255,255,0.1)'),
                      color: isSelected ? getStatusTextColor(status) : (isPurple ? '#9b8fb5' : '#c8bfe5'),
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = isPurple ? '#9b8fb5' : getStatusColor(status);
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = isPurple ? '#9b8fb5' : 'rgba(255,255,255,0.1)';
                      }
                    }}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={addPitch}
            disabled={!newPitch.brandName}
            style={{
              padding: '14px 24px',
              background: newPitch.brandName ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
              color: newPitch.brandName ? '#0a0610' : '#6c6c8e',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: newPitch.brandName ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              width: '100%',
            }}
          >
            <Plus size={18} />
            LOG PITCH
          </button>
        </div>

        {outreachPitches.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px',
              color: '#9b8fb5',
              fontSize: '14px',
              border: '2px dashed rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
          >
            No pitches tracked yet. Add your first pitch above to start building momentum.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#c9a84c',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Brand
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#c9a84c',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Platform
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#c9a84c',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#c9a84c',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#c9a84c',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 700,
                    }}
                  >
                    Notes
                  </th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {outreachPitches.map((pitch) => (
                  <tr key={pitch.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 12px', fontSize: '14px', color: '#f0ebff', fontWeight: 600 }}>
                      {pitch.brandName}
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '14px', color: '#d4cee8' }}>
                      {pitch.platform}
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#9b8fb5' }}>
                      {new Date(pitch.datePitched).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={pitch.status}
                          onChange={(e) => updatePitchStatus(pitch.id, e.target.value)}
                          style={{
                            padding: '8px 14px',
                            background: getStatusColor(pitch.status),
                            color: getStatusTextColor(pitch.status),
                            border: pitch.status === 'Not Sent Yet' ? '1.5px solid #9b8fb5' : 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            appearance: 'none',
                            paddingRight: '32px',
                          }}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: getStatusTextColor(pitch.status) }} />
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#9b8fb5' }}>
                      {pitch.notes || '-'}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => deletePitch(pitch.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ff6b6b',
                          padding: '4px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 5: Objection Handling Guide */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <button
          onClick={() => setShowObjections(!showObjections)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: '#f0ebff',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif' }}>
            What To Say When Brands Push Back
          </h2>
          {showObjections ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
        </button>

        {showObjections && (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {objectionHandlers.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#ff6b6b',
                    marginBottom: '12px',
                  }}
                >
                  {item.objection}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#d4cee8',
                    lineHeight: 1.7,
                    padding: '12px',
                    background: 'rgba(201,168,76,0.08)',
                    borderRadius: '8px',
                    borderLeft: '3px solid #c9a84c',
                  }}
                >
                  {item.response}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 6: 30-Day Outreach Challenge */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
          border: '2px solid #c9a84c',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.08 }}>
          <Calendar size={140} strokeWidth={1} style={{ color: '#c9a84c' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#f0ebff',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            The 30-Day Brand Deal Challenge
          </h2>
          <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px' }}>
            Follow this simple plan and land your first paid UGC deal in 30 days
          </p>

          {outreachChallengeStartDate && (
            <div
              style={{
                background: 'rgba(201,168,76,0.2)',
                border: '1px solid #c9a84c',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>
                You're on Day {daysIntoChallenge} of 30
              </div>
              <div style={{ fontSize: '13px', color: '#b8b0cc' }}>
                Keep going! Consistency is everything.
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { week: 'Week 1', action: 'Build and complete your portfolio' },
              { week: 'Week 2', action: 'Send 3 pitches per day' },
              { week: 'Week 3', action: 'Follow up on all Week 2 pitches, send 3 new ones daily' },
              { week: 'Week 4', action: 'Negotiate, close and deliver your first deal' }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(10,6,16,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#c9a84c',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '8px',
                  }}
                >
                  {item.week}
                </div>
                <div style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.6 }}>
                  {item.action}
                </div>
              </div>
            ))}
          </div>

          {!outreachChallengeStartDate ? (
            <button
              onClick={startChallenge}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                color: '#0a0610',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
              }}
            >
              Start The Challenge             </button>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '16px',
                background: 'rgba(56,211,159,0.15)',
                border: '1px solid rgba(56,211,159,0.3)',
                borderRadius: '12px',
                color: '#38d39f',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Challenge in progress! You're {30 - daysIntoChallenge} days away from your first deal.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
