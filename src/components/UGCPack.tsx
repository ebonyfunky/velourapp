import { useCampaignStore } from '../store/campaignStore';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface UGCPackProps {
  onNavigate: (section: string) => void;
}

export default function UGCPack({ onNavigate }: UGCPackProps) {
  const {
    ugcSelectedNiche,
    portfolioNiche,
    contentCategory,
    rateCardCreatorName,
    rateCardEmail,
    rateCardPlatformRates,
    rateCardPackages,
    rateCardAddOns,
    portfolioPhotos,
    portfolioVideoLinks,
    portfolioLink,
    portfolioScripts,
    portfolioStatement,
    contentStyle,
    setField,
  } = useCampaignStore();

  const niche = ugcSelectedNiche || portfolioNiche || contentCategory || '';
  const photosCount = (portfolioPhotos ?? []).filter(p => p && p.url).length;
  const videosCount = (portfolioVideoLinks ?? []).filter(v => v && v.link).length;
  const hasRates = (rateCardPlatformRates ?? []).some(r => r && r.videoRate);
  const scripts = portfolioScripts ?? [];
  const latestScript = scripts.length > 0 ? scripts[scripts.length - 1] : null;

  const autoPitch = niche && portfolioLink
    ? `I am a ${niche} UGC creator specialising in authentic scroll-stopping content. I create ${contentStyle || 'engaging'} videos that feel natural and drive real results for brands. My portfolio is available here: ${portfolioLink}. I would love to create content for your brand and can turn around a first video within 7 days of receiving the product.`
    : '';

  const packSections = [
    {
      id: 'niche',
      title: 'Your Creator Identity',
      data: niche,
      emptyText: 'Not defined yet',
      linkText: ' Define Your Niche',
      link: 'ugc-niche',
    },
    {
      id: 'rates',
      title: 'Your Rates',
      data: hasRates
        ? (rateCardPlatformRates ?? [])
            .filter(r => r && r.videoRate)
            .map(r => `${r.platform}: $${r.videoRate}`)
            .join(' | ')
        : '',
      emptyText: 'Not completed yet',
      linkText: ' Complete Your Rate Card',
      link: 'ugc-rates',
    },
    {
      id: 'portfolio',
      title: 'Your Portfolio',
      data: photosCount > 0 || videosCount > 0 ? `${photosCount} photos | ${videosCount} videos${portfolioLink ? ' | Portfolio link: ' + portfolioLink : ''}` : '',
      emptyText: 'No portfolio content yet',
      linkText: ' Add Your Portfolio',
      link: 'ugc-portfolio-photos',
    },
    {
      id: 'script',
      title: 'Your Best Script',
      data: latestScript ? (latestScript.hooks?.[0] || 'Script saved') : '',
      emptyText: 'No scripts saved yet',
      linkText: ' Generate a Script',
      link: 'ugc-portfolio-videos',
      beforeNavigate: () => setField('portfolioVideosTabState', 'script-builder'),
    },
    {
      id: 'pitch',
      title: 'Your Pitch',
      data: autoPitch,
      emptyText: 'Save your portfolio link first',
      linkText: ' Save Portfolio Link',
      link: 'ugc-portfolio',
    },
    {
      id: 'statement',
      title: 'Your Portfolio Statement',
      data: portfolioStatement,
      emptyText: 'Not generated yet',
      linkText: ' Go To Organise Your Portfolio',
      link: 'ugc-portfolio',
    },
  ];

  const completedCount = packSections.filter(s => s.data).length;
  const readinessPercentage = Math.round((completedCount / 6) * 100);

  const getReadinessMessage = () => {
    if (completedCount <= 2) {
      return "Your pack is not ready yet - complete the sections above before downloading";
    } else if (completedCount <= 4) {
      return "Almost ready - a few more sections will make your pack much stronger";
    } else if (completedCount === 5) {
      return "Strong pack - you can download now or complete all 6 for maximum impact";
    } else {
      return "Your pack is fully loaded - download it and start sending to brands today";
    }
  };

  const downloadPack = () => {
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    const lines: string[] = [];

    lines.push(`VELOUR UGC PACK - ${rateCardCreatorName || 'Your Name'} - ${date}`);
    lines.push('velour-app.com');
    lines.push('');
    lines.push('-----------------------------');
    lines.push('YOUR CREATOR IDENTITY');
    lines.push('-----------------------------');
    if (niche) {
      lines.push(niche);
    }
    if (contentStyle) {
      lines.push(`Content Style: ${contentStyle}`);
    }
    lines.push('');
    lines.push('');

    lines.push('-----------------------------');
    lines.push('YOUR RATES');
    lines.push('-----------------------------');
    if (hasRates) {
      (rateCardPlatformRates ?? []).forEach(r => {
        if (r && r.videoRate) {
          lines.push(`${r.platform}: $${r.videoRate}`);
        }
      });
      if ((rateCardPackages ?? []).length > 0) {
        lines.push('');
        lines.push('Packages:');
        (rateCardPackages ?? []).forEach(pkg => {
          if (pkg.name) {
            lines.push(`${pkg.name}: $${pkg.price}`);
          }
        });
      }
      if ((rateCardAddOns ?? []).length > 0) {
        lines.push('');
        lines.push('Add-ons:');
        (rateCardAddOns ?? []).forEach(addon => {
          if (addon.name) {
            lines.push(`${addon.name}: $${addon.price}`);
          }
        });
      }
    } else {
      lines.push('Rate card not yet completed.');
    }
    lines.push('');
    lines.push('');

    lines.push('-----------------------------');
    lines.push('YOUR PORTFOLIO');
    lines.push('-----------------------------');
    lines.push(`Photos: ${photosCount} pieces`);
    lines.push(`Videos: ${videosCount} pieces`);
    if (portfolioLink) {
      lines.push(`Portfolio Link: ${portfolioLink}`);
    }
    if (portfolioStatement) {
      lines.push('');
      lines.push('Portfolio Statement:');
      lines.push(portfolioStatement);
    }
    lines.push('');
    lines.push('');

    if (latestScript) {
      lines.push('-----------------------------');
      lines.push('YOUR BEST SCRIPT');
      lines.push('-----------------------------');
      if (latestScript.videoType) {
        lines.push(`Video Type: ${latestScript.videoType}`);
      }
      if (latestScript.contentStyle) {
        lines.push(`Content Style: ${latestScript.contentStyle}`);
      }
      lines.push('');
      lines.push(latestScript.script || '');
      lines.push('');
      lines.push('');
    }

    lines.push('-----------------------------');
    lines.push('YOUR PITCH TEMPLATE');
    lines.push('-----------------------------');
    lines.push('Subject: UGC Creator - [Niche] Content For [Brand Name]');
    lines.push('');
    lines.push('Hi [Brand Name] team,');
    lines.push('');
    lines.push(autoPitch || `I am a UGC creator specialising in authentic content. I would love to create content for your brand.`);
    lines.push('');
    lines.push('Would you be open to a quick conversation?');
    lines.push('');
    if (portfolioStatement) {
      lines.push(portfolioStatement);
      lines.push('');
    }
    lines.push('velour-app.com - Created with Velour');
    lines.push('');
    lines.push('-----------------------------');

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VelourUGCPack_${date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingBottom: '120px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
        Your UGC Pack
      </h1>
      <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '32px', fontStyle: 'italic' }}>
        Everything a brand needs to hire you - compiled and ready to send
      </p>

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
          Here is what your pack contains right now
        </h2>
        <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '24px', fontStyle: 'italic' }}>
          This pulls live from every page you have completed. The more complete your Velour journey the stronger your pack.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {packSections.map((section) => (
            <div
              key={section.id}
              style={{
                background: section.data ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${section.data ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '4px' }}>
                {section.title}
              </div>
              {section.data ? (
                <div style={{ fontSize: '13px', color: '#d0c9e0', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {(section.data ?? '').length > 100 ? String(section.data).substring(0, 100) + '...' : section.data}
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '13px', color: '#9b8fb5', fontStyle: 'italic' }}>
                    {section.emptyText}
                  </div>
                  <button
                    onClick={() => {
                      if (section.beforeNavigate) section.beforeNavigate();
                      onNavigate(section.link);
                    }}
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid rgba(201,168,76,0.4)',
                      borderRadius: '100px',
                      color: '#c9a84c',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: 'fit-content',
                    }}
                  >
                    {section.linkText}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
            border: '2px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a' }}>
              Pack Readiness
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f0ebff' }}>
              {completedCount}/6
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '100px',
              overflow: 'hidden',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: `${readinessPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #c9a84c, #8B6914)',
                borderRadius: '100px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <div style={{ fontSize: '13px', color: '#d0c9e0' }}>
            {getReadinessMessage()}
          </div>
        </div>

        <button
          onClick={downloadPack}
          disabled={completedCount < 3}
          style={{
            width: '100%',
            padding: '16px 28px',
            background: completedCount < 3 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #c9a84c, #8B6914)',
            border: 'none',
            borderRadius: '100px',
            color: completedCount < 3 ? '#9b8fb5' : '#0a0610',
            fontSize: '15px',
            fontWeight: 700,
            cursor: completedCount < 3 ? 'not-allowed' : 'pointer',
            boxShadow: completedCount < 3 ? 'none' : '0 4px 16px rgba(201,168,76,0.4)',
            marginBottom: '12px',
            opacity: completedCount < 3 ? 0.5 : 1,
          }}
        >
          Download My UGC Pack
        </button>

        <p style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic', textAlign: 'center' }}>
          This file contains everything a brand needs to say yes to working with you. Attach your rate card PDF alongside this when pitching directly.
        </p>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
        }}
      >
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
          Pack downloaded - here is exactly what to do now
        </h2>

        <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
              1. Apply to platforms today
            </h3>
            <p style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
              Submit your portfolio link to Billo, JoinBrands and Insense. Takes 30 minutes. Do it now.
            </p>
            <button
              onClick={() => onNavigate('ugc-outreach-brands')}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                border: 'none',
                borderRadius: '100px',
                color: '#0a0610',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Where To Find Brands             </button>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
              2. Send 5 cold pitches today
            </h3>
            <p style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
              Find 5 brands you love and send your pitch template. The first pitch is always the hardest. Send it anyway.
            </p>
            <button
              onClick={() => onNavigate('ugc-outreach')}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                border: 'none',
                borderRadius: '100px',
                color: '#0a0610',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Go To Brand Outreach             </button>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
              3. Track every response
            </h3>
            <p style={{ fontSize: '13px', color: '#d0c9e0', marginBottom: '16px', lineHeight: '1.6', fontStyle: 'italic' }}>
              The moment a brand replies log it immediately. Deals fall through the cracks when creators stop tracking.
            </p>
            <button
              onClick={() => onNavigate('ugc-deal')}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                border: 'none',
                borderRadius: '100px',
                color: '#0a0610',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Income Command Centre             </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '280px',
          right: 0,
          background: 'linear-gradient(to top, #0a0610 80%, transparent)',
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100,
        }}
      >
        <button
          onClick={() => onNavigate('ugc-plan')}
          style={{
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            color: '#f0ebff',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div style={{ fontSize: '13px', color: '#9b8fb5', fontWeight: 600 }}>
          Step 8 of 13 - UGC Pack
        </div>

        <button
          onClick={() => onNavigate('ugc-outreach-brands')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
            border: 'none',
            borderRadius: '100px',
            color: '#0a0610',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
