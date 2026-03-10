import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Copy, Plus, Trash2, ChevronDown, ChevronUp, Target, ExternalLink } from 'lucide-react';
import PitchGenerator from './PitchGenerator';
import DatePicker from './DatePicker';

const UGC_PLATFORMS = [
  {
    name: 'Billo',
    description: 'Brands post briefs, you apply and film. One of the most beginner friendly UGC platforms.',
    url: 'https://billo.app'
  },
  {
    name: 'JoinBrands',
    description: 'Apply to paid UGC campaigns across dozens of niches.',
    url: 'https://creator.joinbrands.com'
  },
  {
    name: 'Insense',
    description: 'Premium marketplace. Brands post budgets upfront.',
    url: 'https://insense.pro'
  },
  {
    name: 'Cohley',
    description: 'Enterprise brands looking for quality content.',
    url: 'https://cohley.com'
  },
  {
    name: 'Passionfroot',
    description: 'Build a creator storefront and let brands come to you.',
    url: 'https://passionfroot.me'
  },
  {
    name: 'Sideshift',
    description: 'Find UGC jobs and campaigns in one place. Android users use the website.',
    url: 'https://app.sideshift.app'
  },
  {
    name: 'OnBento',
    description: 'Automated pitching tool that sends your profile to brands for you.',
    url: 'https://onbento.com'
  },
  {
    name: 'Trend.io',
    description: 'Curated UGC campaigns from vetted brands.',
    url: 'https://trend.io'
  },
  {
    name: 'Minisocial',
    description: 'High quality UGC campaigns, competitive pay.',
    url: 'https://minisocial.com'
  },
  {
    name: 'Popular Pays',
    description: 'Creator marketplace with strong brand roster.',
    url: 'https://creators.popularpays.com'
  },
  {
    name: 'Statusphere',
    description: 'Subscription box style brand gifting with paid upgrades.',
    url: 'https://app.statusphere.com'
  },
  {
    name: 'Fiverr',
    description: 'List your UGC services as a gig. Brands find you.',
    url: 'https://fiverr.com'
  },
  {
    name: 'Upwork',
    description: 'Post your UGC services as a freelancer profile. Brands hire directly.',
    url: 'https://upwork.com'
  },
];

const SOCIAL_PLATFORMS = [
  {
    id: 'reddit',
    name: 'Reddit',
    description: 'One of the most underused places to find UGC work. Brands and agencies post paid opportunities daily.',
    strategies: [
      'Join r/UGCcreators and r/UGCforBrands',
      'Search "UGC creator needed" and "paid UGC" - filter by New',
      'Post your own introduction in r/UGCcreators with your niche and portfolio link'
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Facebook Groups are full of brands actively looking for creators right now.',
    strategies: [
      'Search "UGC creators needed" in Facebook Groups',
      'Search "UGC opportunities" and "paid UGC campaigns"',
      'Join groups specifically for UGC creators in your niche'
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'DM brands directly. Small to mid size brands respond more than you think.',
    strategies: [
      'Search hashtags like #[yourniche]brand and #smallbusiness[niche]',
      'Look for brands with 5k-50k followers - they are actively growing and need content',
      'Check their bio for a contact or partnerships email and pitch there first'
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Search your niche plus the word brand or small business. Follow brands that already post UGC style content - they are already buying.',
    strategies: [
      'Go to TikTok Creator Marketplace - free to join, brands post open campaigns',
      'Search [your niche] + brand or [product type] + small business',
      'Check bios for collaboration emails'
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn & Twitter/X',
    description: 'Brands post UGC briefs here too - especially agencies and marketing managers.',
    strategies: [
      'Follow these accounts on Twitter/X for daily UGC job postings: UGC SHOP, UGC Opportunities, Ugcsparkworks, UGC Jobs, UGC Network, Media Engineered, UGC Connect',
      'Search "UGC creator" on LinkedIn and filter by Jobs',
      'Use ZipRecruiter and Indeed - search "UGC content creator" for paid remote opportunities'
    ]
  }
];

const DISCORD_SERVERS = [
  {
    name: 'Vizzy Discord',
    description: 'Active UGC deal posting community. Download Discord first then join.',
    url: 'https://discord.com/invite/39CRFwTFmC'
  },
  {
    name: 'Pured Media Discord',
    description: 'Agency run server with regular paid UGC campaign postings.',
    url: 'https://discord.com/invite/Jq9cVs4Qhc'
  }
];

const COLD_OUTREACH_STRATEGIES = [
  {
    title: 'Find their contact email',
    description: 'Go to the brand\'s website and look for a Contact, Partnerships or Press page. Most brands list a marketing or partnerships email there. That is your target.'
  },
  {
    title: 'Search on LinkedIn',
    description: 'Search the brand name on LinkedIn. Look for job titles like: Influencer Marketing Manager, Social Media Manager, Brand Partnerships, Content Marketing. Connect and send a short message.'
  },
  {
    title: 'Use their social bio',
    description: 'Most small to mid size brands put their contact email directly in their Instagram or TikTok bio. Check there first before spending time searching elsewhere.'
  }
];

const PITCH_TEMPLATES = [
  {
    id: 'cold-email',
    label: 'Cold Email Pitch',
    template: `Subject: UGC Creator - [Your Niche] Content For [Brand Name]

Hi [Brand Name] team,

I am a [niche] UGC creator who makes [content style] content for brands like yours. I have been using [product or product type] for a while now and genuinely love what you are doing.

I would love to create a short video for [Brand Name] - the kind of authentic content that works in feeds, stories and paid ads.

My portfolio is here: [portfolio link]
My rates start from [rate].

Would you be open to a quick chat?

[Your name]
[Contact details]`
  },
  {
    id: 'instagram-dm',
    label: 'Instagram DM Pitch',
    template: `Hi [Brand Name], I am a UGC creator specialising in [niche] content. I love your [specific product] and would love to create authentic video content for your brand. My portfolio: [link]. Would love to chat if you are open to it.`
  },
  {
    id: 'follow-up',
    label: 'Follow Up Email (sent 5-7 days after no response)',
    template: `Subject: Following Up - UGC Content For [Brand Name]

Hi [Brand Name] team,

I wanted to follow up on my message from last week about creating UGC content for [Brand Name].

I know inboxes get busy - just wanted to make sure this did not get lost. My portfolio is here: [portfolio link] if you would like to take a look.

Happy to work around your timeline and current campaigns.

[Your name]`
  },
  {
    id: 'tiktok-shop',
    label: 'TikTok Shop Pitch',
    template: `Hi [Brand Name] team - I am a TikTok Shop affiliate creator in the [niche] space. I have been featuring products similar to yours and would love to add [Brand Name] to my shop showcase. Here is my portfolio of recent content: [link]. Let me know if you would like to discuss rates or a gifting arrangement.`
  },
  {
    id: 'rate-card',
    label: 'Rate Card Pitch',
    template: `Hi [Brand Name],

I create UGC content for [niche] brands and think [Brand Name] would be a great fit for my audience and content style.

I have attached my rate card with full details of what I offer. My portfolio is available here: [portfolio link].

I am currently available for new brand partnerships and can deliver within [X] days of receiving a product brief.

[Your name]`
  },
];

const PITCH_PRINCIPLES = [
  {
    title: 'Be specific',
    description: 'Mention the brand by name and reference something real about their products. Generic pitches get deleted.'
  },
  {
    title: 'Be brief',
    description: 'Your pitch should be readable in under 30 seconds. If it is longer cut it in half.'
  },
  {
    title: 'Lead with value',
    description: 'Open with what you can do for them not with who you are.'
  },
  {
    title: 'Always attach proof',
    description: 'Your portfolio link must be in every single pitch. No exceptions.'
  },
];

const OBJECTION_HANDLERS = [
  {
    objection: 'Your rates are too high',
    response: 'I completely understand budget considerations. My rates reflect the value of content that is ready to use in paid ads without additional production costs. That said I am happy to discuss a starter package - would a single video at [lower rate] work as a first collaboration?'
  },
  {
    objection: 'We only work with influencers who have followers',
    response: 'UGC and influencer content serve different purposes. UGC is bought for its authenticity and ad performance - not for the creator\'s audience size. Brands like [relevant example] use UGC creators specifically because the content converts better in paid ads than influencer content.'
  },
  {
    objection: 'We will get back to you',
    response: 'Of course - I completely understand. I will follow up in a week. In the meantime here is my portfolio link again in case it is helpful for your team\'s review: [link].'
  },
  {
    objection: 'Can you send us some free content first?',
    response: 'I appreciate your interest in working together. I do not create content on a speculative basis but I would love to create something official for [Brand Name]. My starter rate for a single video is [rate] - would that work as a first step?'
  },
  {
    objection: 'We have no budget right now',
    response: 'I understand - budgets can be tight. If gifting works better for now I am open to discussing a product exchange arrangement for a single piece of content. That way you get to see my work before committing to a paid arrangement.'
  },
];

const platformOptions = ['Email', 'Instagram DM', 'TikTok', 'Billo', 'Insense', 'Other'];
const statusOptions = ['Not Sent Yet', 'Sent', 'Replied', 'Negotiating', 'Closed', 'Rejected'];

interface WhereToFindBrandsProps {
  onNavigate: (sectionId: string) => void;
}

export default function WhereToFindBrands({ onNavigate }: WhereToFindBrandsProps) {
  const { outreachPitches, setField } = useCampaignStore();
  const [activeTab, setActiveTab] = useState<'find' | 'generator'>('find');
  const [showObjections, setShowObjections] = useState(false);
  const [showBrandHitList, setShowBrandHitList] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: '', niche: '' });
  const [brandList, setBrandList] = useState<Array<{ id: string; name: string; niche: string }>>([]);
  const [expandedSocial, setExpandedSocial] = useState<string | null>(null);

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
  };

  const addBrand = () => {
    if (!newBrand.name || !newBrand.niche) return;
    const brand = {
      id: Date.now().toString(),
      name: newBrand.name,
      niche: newBrand.niche,
    };
    setBrandList([...brandList, brand]);
    setNewBrand({ name: '', niche: '' });
  };

  const deleteBrand = (id: string) => {
    setBrandList(brandList.filter(b => b.id !== id));
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

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Where To Find Brands & How To Reach Them
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Finding brands is only half the job. Knowing exactly what to say when you find them is the other half. This page covers both.
      </p>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0' }}>
        <button
          onClick={() => setActiveTab('find')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'find' ? '3px solid #c9a84c' : '3px solid transparent',
            color: activeTab === 'find' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '-2px',
            transition: 'all 0.2s',
          }}
        >
          Find Brands
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'generator' ? '3px solid #c9a84c' : '3px solid transparent',
            color: activeTab === 'generator' ? '#c9a84c' : '#9b8fb5',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: '-2px',
            transition: 'all 0.2s',
          }}
        >
          Pitch Generator
        </button>
      </div>

      {activeTab === 'generator' ? (
        <PitchGenerator />
      ) : (
        <div>

      {/* Section 1: Four Ways To Find Brand Deals */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '12px',
            fontFamily: 'Cormorant Garamond, serif',
            borderBottom: '3px solid #c9a84c',
            paddingBottom: '12px',
          }}
        >
          Four Ways To Find Brand Deals
        </h2>
        <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '40px' }}>
          Start with the platforms - they are the fastest way to land your first deal. Then work through the rest.
        </p>

        {/* Group 1: UGC Platforms */}
        <div style={{ marginBottom: '56px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#e8c96a',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            UGC Platforms (Brands Come To You)
          </h3>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '24px' }}>
            Create a profile, apply to campaigns, get paid. No cold pitching needed.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {UGC_PLATFORMS.map((platform, i) => (
              <div
                key={i}
                style={{
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c9a84c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a' }}>
                  {platform.name}
                </div>
                <div style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6, flex: 1 }}>
                  {platform.description}
                </div>
                <button
                  onClick={() => window.open(platform.url, '_blank')}
                  style={{
                    padding: '10px 18px',
                    background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                    color: '#0a0610',
                    border: 'none',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                  }}
                >
                  <ExternalLink size={14} />
                  Visit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: Social Platforms */}
        <div style={{ marginBottom: '56px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#e8c96a',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            Social Platforms (Go Find Them)
          </h3>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '24px' }}>
            Brands are hiding in plain sight on every platform you already use. Here is exactly where to look.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {SOCIAL_PLATFORMS.map((platform) => (
              <div
                key={platform.id}
                style={{
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedSocial(expandedSocial === platform.id ? null : platform.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: '#f0ebff',
                    cursor: 'pointer',
                    padding: '20px 24px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#e8c96a', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {platform.icon && <span>{platform.icon}</span>}
                      <span>{platform.name}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#9b8fb5', fontStyle: 'italic' }}>
                      {platform.description}
                    </div>
                  </div>
                  {expandedSocial === platform.id ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
                </button>

                {expandedSocial === platform.id && (
                  <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
                    <ul style={{ margin: '16px 0 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {platform.strategies.map((strategy, i) => (
                        <li key={i} style={{ fontSize: '14px', color: '#d4cee8', lineHeight: 1.6 }}>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Group 3: Discord Servers */}
        <div style={{ marginBottom: '56px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#e8c96a',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            Discord Servers (Hidden Deals)
          </h3>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '24px' }}>
            Discord servers are where brands and agencies post deals that never make it to the big platforms. Free to join.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {DISCORD_SERVERS.map((server, i) => (
              <div
                key={i}
                style={{
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a' }}>
                  {server.name}
                </div>
                <div style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6, flex: 1, fontStyle: 'italic' }}>
                  {server.description}
                </div>
                <button
                  onClick={() => window.open(server.url, '_blank')}
                  style={{
                    padding: '10px 18px',
                    background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                    color: '#0a0610',
                    border: 'none',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                  }}
                >
                  <ExternalLink size={14} />
                  Join {server.name.split(' ')[0]}                 </button>
              </div>
            ))}
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
            To join a Discord server - download the Discord app first, create a free account, then click the join links above.
          </div>
        </div>

        {/* Group 4: Cold Outreach */}
        <div style={{ marginBottom: '56px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#e8c96a',
              marginBottom: '8px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            Cold Outreach (You Go To Them)
          </h3>
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#9b8fb5', marginBottom: '24px' }}>
            The highest paying deals come from brands you pitch directly. No platform fees. No competition. Just you and the brand.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {COLD_OUTREACH_STRATEGIES.map((strategy, i) => (
              <div
                key={i}
                style={{
                  background: '#1c1a35',
                  border: '1.5px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
                  {strategy.title}
                </div>
                <div style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {strategy.description}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
              border: '2px solid rgba(201,168,76,0.3)',
              borderRadius: '12px',
              padding: '16px 20px',
              fontSize: '14px',
              color: '#e8c96a',
              fontWeight: 600,
            }}
          >
            The pitch templates for cold outreach are in the section below. Always include your portfolio link - every single time.
          </div>
        </div>
      </div>

      {/* Section 3: Your Brand Hit List */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '48px',
        }}
      >
        <button
          onClick={() => setShowBrandHitList(!showBrandHitList)}
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
            marginBottom: showBrandHitList ? '24px' : 0,
          }}
        >
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', marginBottom: '4px', textAlign: 'left' }}>
              Your Brand Hit List
            </h2>
            <p style={{ fontSize: '13px', color: '#9b8fb5', margin: 0, textAlign: 'left' }}>
              Build your target list of brands to pitch
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {brandList.length > 0 && (
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#c9a84c' }}>
                {brandList.length} {brandList.length === 1 ? 'brand' : 'brands'}
              </div>
            )}
            {showBrandHitList ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
          </div>
        </button>

        {showBrandHitList && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '20px' }}>
              <input
                type="text"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                placeholder="Brand name"
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
              <input
                type="text"
                value={newBrand.niche}
                onChange={(e) => setNewBrand({ ...newBrand, niche: e.target.value })}
                placeholder="Niche"
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
              <button
                onClick={addBrand}
                disabled={!newBrand.name || !newBrand.niche}
                style={{
                  padding: '12px 24px',
                  background: newBrand.name && newBrand.niche ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
                  color: newBrand.name && newBrand.niche ? '#0a0610' : '#6c6c8e',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: newBrand.name && newBrand.niche ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Plus size={16} />
                Add Brand
              </button>
            </div>

            {brandList.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px',
                  color: '#9b8fb5',
                  fontSize: '14px',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              >
                No brands added yet. Start building your hit list above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {brandList.map((brand) => (
                  <div
                    key={brand.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
                        {brand.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9b8fb5' }}>{brand.niche}</div>
                    </div>
                    <button
                      onClick={() => deleteBrand(brand.id)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 4: How To Pitch To Brands */}
      <div style={{ marginBottom: '48px' }}>
        <h2
          id="pitch-templates"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#f0ebff',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          Now You Know Where They Are - Here Is Exactly What To Say
        </h2>
        <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
          The pitch that gets a response is not the cleverest one. It is the clearest one. Short, specific and easy to say yes to.
        </p>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0ebff', marginBottom: '16px' }}>
            What makes a pitch work
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {PITCH_PRINCIPLES.map((principle, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
                  {principle.title}
                </div>
                <div style={{ fontSize: '13px', color: '#d4cee8', lineHeight: 1.6 }}>
                  {principle.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#1c1a35',
            border: '1.5px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f0ebff', marginBottom: '20px' }}>
            5 Pitch Templates - Copy and Customize
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PITCH_TEMPLATES.map((item) => (
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
                    Copy
                  </button>
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
      </div>

      {/* Section 5: Objection Handling */}
      <div
        style={{
          background: '#1c1a35',
          border: '1.5px solid rgba(201,168,76,0.2)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '48px',
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
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', marginBottom: '4px', textAlign: 'left' }}>
              What to say when a brand pushes back
            </h2>
            <p style={{ fontSize: '13px', color: '#9b8fb5', margin: 0, fontStyle: 'italic', textAlign: 'left' }}>
              Most creators give up the moment a brand says no or goes quiet. The ones who close deals know that a pushback is rarely a no - it is a negotiation.
            </p>
          </div>
          {showObjections ? <ChevronUp size={24} color="#c9a84c" /> : <ChevronDown size={24} color="#c9a84c" />}
        </button>

        {showObjections && (
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {OBJECTION_HANDLERS.map((item, i) => (
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

      {/* Section 6: Your Pitch Tracker */}
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
          Track every pitch you send
        </h2>
        <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '24px', fontStyle: 'italic' }}>
          A pitch you send and forget is a deal you never close. Log everything.
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
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = isPurple ? '#9b8fb5' : getStatusColor(status);
                      }
                    }}
                    onMouseLeave={(e) => {
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
            LOG BRAND PITCH
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

        <button
          onClick={() => onNavigate('ugc-plan')}
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
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.4)';
          }}
        >
          <Target size={20} />
          I Am Ready To Start Pitching - Go To Action Plan         </button>
      </div>
      </div>
      )}
    </div>
  );
}
