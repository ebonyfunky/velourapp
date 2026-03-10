import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCampaignStore } from '../../store/campaignStore';
import type { Currency } from '../../types';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

const currencies: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'GBP', label: 'British Pound', symbol: 'GBP' },
  { value: 'EUR', label: 'Euro', symbol: 'EUR' },
  { value: 'NGN', label: 'Nigerian Naira', symbol: 'NGN' },
  { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { value: 'ZAR', label: 'South African Rand', symbol: 'R' },
  { value: 'KES', label: 'Kenyan Shilling', symbol: 'KES' },
  { value: 'GHS', label: 'Ghanaian Cedi', symbol: 'GHS' },
  { value: 'INR', label: 'Indian Rupee', symbol: 'INR' },
  { value: 'PHP', label: 'Philippine Peso', symbol: 'PHP' },
  { value: 'OTHER', label: 'Other', symbol: '' },
];

const productTypes = [
  { value: 'high-ticket', label: 'High-Ticket', desc: '$500+, premium offer' },
  { value: 'mid-ticket', label: 'Mid-Ticket', desc: '$50-$500, considered purchase' },
  { value: 'low-ticket', label: 'Low-Ticket', desc: 'Under $50, impulse buy' },
  { value: 'tiktok-shop', label: 'TikTok Shop', desc: 'Physical product for shop' },
  { value: 'free-lead-magnet', label: 'Free Lead Magnet', desc: 'Freebie to build your list' },
];

const affiliateDigitalTypes = [
  { value: 'affiliate', label: 'Affiliate Product', desc: 'You earn commission promoting someone else\'s product' },
  { value: 'ebook', label: 'eBook', desc: 'A digital book your audience downloads instantly' },
  { value: 'template', label: 'Template', desc: 'Canva, Notion, Excel or any done-for-you template' },
  { value: 'guide-workbook', label: 'Guide or Workbook', desc: 'A step-by-step guide, workbook or how-to resource' },
  { value: 'mini-course', label: 'Mini Course', desc: 'A short video course, workshop or training' },
  { value: 'spreadsheet-tracker', label: 'Spreadsheet or Tracker', desc: 'A budget tracker, content planner or business dashboard' },
  { value: 'swipe-file', label: 'Swipe File or Resource Pack', desc: 'Done-for-you prompts, examples or resource collection' },
  { value: 'printable', label: 'Printable', desc: 'A planner, journal, checklist or printable download' },
];

const digitalProductTypes = ['ebook', 'template', 'guide-workbook', 'mini-course', 'spreadsheet-tracker', 'swipe-file', 'printable'];

export default function Step3({ onNext, onBack }: Step3Props) {
  const {
    productName,
    pricePoint,
    currency,
    productType,
    benefits,
    usp,
    targetAudience,
    painPoint,
    desiredOutcome,
    affiliateBrandName,
    affiliatePlatform,
    affiliateLink,
    affiliateCommission,
    digitalProductContents,
    digitalProductAudience,
    digitalProductTransformation,
    digitalProductDelivery,
    digitalProductValueStack,
    setField
  } = useCampaignStore();

  useEffect(() => {
    if (benefits.length === 0) {
      setField('benefits', ['', '']);
    }
  }, []);

  useEffect(() => {
    if (pricePoint) {
      const price = parseFloat(pricePoint);
      if (!isNaN(price)) {
        let newType = '';
        if (price === 0) {
          newType = 'free-lead-magnet';
        } else if (price > 500) {
          newType = 'high-ticket';
        } else if (price >= 50) {
          newType = 'mid-ticket';
        } else {
          newType = 'low-ticket';
        }
        if (newType !== productType) {
          setField('productType', newType);
        }
      }
    }
  }, [pricePoint]);

  const addBenefit = () => {
    if (benefits.length < 5) {
      setField('benefits', [...benefits, '']);
    }
  };

  const removeBenefit = (index: number) => {
    if (benefits.length > 2) {
      setField('benefits', benefits.filter((_, i) => i !== index));
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setField('benefits', newBenefits);
  };

  const handleContinue = () => {
    onNext();
  };

  const canProceed =
    productName.trim() !== '' &&
    pricePoint !== '' &&
    productType !== '' &&
    benefits.some(b => b.trim() !== '') &&
    usp.trim() !== '' &&
    targetAudience.trim() !== '' &&
    painPoint.trim() !== '' &&
    desiredOutcome.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="gradient-text mb-2">Product & Offer</h1>
        <p className="text-gold text-[14px] font-semibold italic">
          This powers everything - your scripts, your scenes, your strategy
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="input-label">PRODUCT / SERVICE NAME</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setField('productName', e.target.value)}
            className="input-field"
            placeholder="What are you selling?"
          />
        </div>

        <div>
          <label className="input-label">PRICE POINT</label>
          <div
            className="relative flex items-center"
            style={{
              background: '#17152e',
              border: '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '12px',
              height: '52px',
              overflow: 'hidden',
            }}
          >
            <select
              value={currency}
              onChange={(e) => setField('currency', e.target.value as Currency)}
              style={{
                background: 'transparent',
                border: 'none',
                borderRight: '1px solid rgba(201,168,76,0.2)',
                padding: '0 12px',
                color: '#c9a84c',
                fontFamily: 'Syne, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                height: '100%',
                outline: 'none',
                appearance: 'none',
                paddingRight: '32px',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23c9a84c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
              }}
            >
              {currencies.map((curr) => (
                <option key={curr.value} value={curr.value}>
                  {curr.symbol ? `${curr.symbol} ${curr.label}` : curr.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={pricePoint}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setField('pricePoint', value);
                }
              }}
              placeholder="0.00"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '0 18px',
                color: '#f0ebff',
                fontFamily: 'Syne, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
                height: '100%',
              }}
            />
          </div>
          <p className="text-xs text-text-dim mt-2 italic">
            This helps us tailor your scripts and positioning strategy
          </p>
        </div>

        <div>
          <label className="input-label">PRODUCT TYPE</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {productTypes.map((type) => {
              const isSelected = productType === type.value;
              return (
                <motion.div
                  key={type.value}
                  onClick={() => setField('productType', type.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: isSelected ? 'rgba(201,168,76,0.06)' : '#1c1a35',
                    border: isSelected ? '1.5px solid #c9a84c' : '1.5px solid rgba(201,168,76,0.15)',
                    borderRadius: '16px',
                    padding: '20px 16px',
                    cursor: 'pointer',
                    minHeight: '130px',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '20%',
                      right: '20%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                      opacity: 0.4,
                    }}
                  />
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#c9a84c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#12102a',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                    </div>
                  )}
                  <div className="text-center space-y-2">
                    <div
                      style={{
                        color: isSelected ? '#c9a84c' : '#f0ebff',
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'Syne, sans-serif',
                      }}
                    >
                      {type.label}
                    </div>
                    <div
                      style={{
                        color: '#9b8fb5',
                        fontSize: '11px',
                        fontWeight: 500,
                        lineHeight: '1.4',
                      }}
                    >
                      {type.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', letterSpacing: '0.08em', marginTop: '16px', marginBottom: '10px' }}>
            AFFILIATE & DIGITAL
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {affiliateDigitalTypes.map((type) => {
              const isSelected = productType === type.value;
              return (
                <motion.div
                  key={type.value}
                  onClick={() => setField('productType', type.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: isSelected ? 'rgba(201,168,76,0.08)' : '#17152e',
                    border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    minHeight: '130px',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#c9a84c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#12102a',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                    </div>
                  )}
                  <div className="text-center space-y-2">
                    <div
                      style={{
                        color: isSelected ? '#c9a84c' : '#f0ebff',
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'Syne, sans-serif',
                      }}
                    >
                      {type.label}
                    </div>
                    <div
                      style={{
                        color: '#9b8fb5',
                        fontSize: '11px',
                        fontWeight: 500,
                        lineHeight: '1.4',
                      }}
                    >
                      {type.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {productType === 'affiliate' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            style={{
              background: '#1c1a35',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div>
              <label className="input-label">BRAND YOU ARE PROMOTING</label>
              <input
                type="text"
                value={affiliateBrandName}
                onChange={(e) => setField('affiliateBrandName', e.target.value)}
                className="input-field"
                placeholder="e.g. Athletic Greens, PTP Elite, Kangen Water, Huel"
              />
            </div>

            <div>
              <label className="input-label">AFFILIATE PLATFORM</label>
              <p className="text-xs text-text-dim mb-2 italic">Where is your link hosted?</p>
              <div className="flex flex-wrap gap-2">
                {['Amazon Associates', 'ClickBank', 'ShareASale', 'Impact', 'TikTok Shop Affiliate', 'Stan Store', 'Beacons', 'Direct Brand Program', 'Other'].map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setField('affiliatePlatform', platform)}
                    style={{
                      background: affiliatePlatform === platform ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                      border: affiliatePlatform === platform ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                      color: affiliatePlatform === platform ? '#e8c96a' : '#9b8fb5',
                      borderRadius: '100px',
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">YOUR AFFILIATE LINK OR CODE</label>
              <input
                type="text"
                value={affiliateLink}
                onChange={(e) => setField('affiliateLink', e.target.value)}
                className="input-field"
                placeholder="e.g. mylink.com/ref/olu or use code OLU10 at checkout"
              />
            </div>

            <div>
              <label className="input-label">COMMISSION RATE (OPTIONAL)</label>
              <input
                type="text"
                value={affiliateCommission}
                onChange={(e) => setField('affiliateCommission', e.target.value)}
                className="input-field"
                placeholder="e.g. 30% per sale or $47 flat per referral"
              />
            </div>

            <div
              style={{
                background: 'rgba(201,168,76,0.06)',
                borderLeft: '3px solid #c9a84c',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                fontSize: '11px',
                color: '#9b8fb5',
                fontStyle: 'italic',
              }}
            >
              Never lead with the link. Lead with the transformation - the link is just how they access it. Velour scripts are written this way automatically.
            </div>
          </motion.div>
        )}

        {digitalProductTypes.includes(productType) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            style={{
              background: '#1c1a35',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div>
              <label className="input-label">WHAT IS INSIDE?</label>
              <p className="text-xs text-text-dim mb-2 italic">List the main sections, chapters or components</p>
              <textarea
                value={digitalProductContents}
                onChange={(e) => setField('digitalProductContents', e.target.value)}
                className="input-field"
                rows={4}
                placeholder="e.g.
Chapter 1: Finding your niche
Chapter 2: Setting up your store
Chapter 3: Your first sale in 7 days
Bonus: 10 Canva templates included"
              />
            </div>

            <div>
              <label className="input-label">WHO IS THIS FOR?</label>
              <p className="text-xs text-text-dim mb-2 italic">The more specific the better</p>
              <textarea
                value={digitalProductAudience}
                onChange={(e) => setField('digitalProductAudience', e.target.value)}
                className="input-field"
                rows={2}
                placeholder="e.g. Beginner affiliate marketers who want to create their first digital product in a weekend without any tech skills"
              />
            </div>

            <div>
              <label className="input-label">WHAT WILL THEY BE ABLE TO DO AFTER?</label>
              <p className="text-xs text-text-dim mb-2 italic">The transformation - what changes for them</p>
              <textarea
                value={digitalProductTransformation}
                onChange={(e) => setField('digitalProductTransformation', e.target.value)}
                className="input-field"
                rows={2}
                placeholder="e.g. Launch their first digital product, make their first sale and have a repeatable system"
              />
            </div>

            <div>
              <label className="input-label">HOW DO THEY GET IT?</label>
              <p className="text-xs text-text-dim mb-2 italic">Delivery format</p>
              <div className="flex flex-wrap gap-2">
                {['PDF Download', 'Canva Template Link', 'Notion Template', 'Google Docs / Sheets', 'Video + PDF Bundle', 'Stan Store', 'Beacons', 'Gumroad', 'Payhip', 'TikTok Shop Digital', 'Email Delivery'].map((delivery) => (
                  <button
                    key={delivery}
                    type="button"
                    onClick={() => setField('digitalProductDelivery', delivery)}
                    style={{
                      background: digitalProductDelivery === delivery ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                      border: digitalProductDelivery === delivery ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                      color: digitalProductDelivery === delivery ? '#e8c96a' : '#9b8fb5',
                      borderRadius: '100px',
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {delivery}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label">YOUR VALUE STACK</label>
              <p className="text-xs text-text-dim mb-2 italic">List everything they get with individual values - this is what makes the price feel like a steal</p>
              <textarea
                value={digitalProductValueStack}
                onChange={(e) => setField('digitalProductValueStack', e.target.value)}
                className="input-field"
                rows={4}
                placeholder="e.g.
- 47-page eBook ($47 value)
- 10 Canva templates ($97 value)
- Checklist PDF ($17 value)
- Bonus: Private community access
Total value: $161 - your price: $27"
              />
            </div>

            <div
              style={{
                background: 'rgba(201,168,76,0.06)',
                borderLeft: '3px solid #c9a84c',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                fontSize: '11px',
                color: '#9b8fb5',
                fontStyle: 'italic',
                marginTop: '16px',
              }}
            >
              Always show the total value BEFORE you reveal the price. Velour scripts use price anchoring automatically - your audience will see $161 worth of value before they ever hear $27.
            </div>
          </motion.div>
        )}

        <div>
          <label className="input-label">KEY BENEFITS</label>
          <p className="text-xs text-text-dim mb-3 italic">What are the top results your customer gets?</p>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  className="input-field flex-1"
                  placeholder={`Benefit ${index + 1}`}
                />
                {benefits.length > 2 && (
                  <button
                    onClick={() => removeBenefit(index)}
                    style={{
                      background: 'transparent',
                      border: '1.5px solid rgba(180,50,50,0.3)',
                      borderRadius: '10px',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b43232',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(180,50,50,0.6)';
                      e.currentTarget.style.background = 'rgba(180,50,50,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(180,50,50,0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {benefits.length < 5 && (
              <button
                onClick={addBenefit}
                style={{
                  background: 'transparent',
                  border: '1.5px dashed rgba(201,168,76,0.3)',
                  borderRadius: '10px',
                  color: '#c9a84c',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'Syne, sans-serif',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                + Add Benefit
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="input-label">UNIQUE SELLING POINT</label>
          <p className="text-xs text-text-dim mb-3 italic">
            What makes this completely different from everything else out there?
          </p>
          <textarea
            value={usp}
            onChange={(e) => setField('usp', e.target.value)}
            className="input-field"
            rows={3}
            placeholder="e.g. The only program that teaches 5 income streams in one place with done-for-you templates"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div>
          <label className="input-label">TARGET AUDIENCE</label>
          <p className="text-xs text-text-dim mb-3 italic">Who is this perfect for?</p>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setField('targetAudience', e.target.value)}
            className="input-field"
            placeholder="e.g. Stay-at-home parents who want to earn income online without a 9-5"
          />
        </div>

        <div>
          <label className="input-label">BIGGEST PAIN POINT</label>
          <p className="text-xs text-text-dim mb-3 italic">
            What problem, frustration or desire drives them to need this?
          </p>
          <textarea
            value={painPoint}
            onChange={(e) => setField('painPoint', e.target.value)}
            className="input-field"
            rows={3}
            placeholder="e.g. They want financial freedom but don't know where to start or what actually works"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div>
          <label className="input-label">DESIRED OUTCOME / TRANSFORMATION</label>
          <p className="text-xs text-text-dim mb-3 italic">What result or change do they get?</p>
          <input
            type="text"
            value={desiredOutcome}
            onChange={(e) => setField('desiredOutcome', e.target.value)}
            className="input-field"
            placeholder="e.g. A full online income generating multiple revenue streams from their phone"
          />
        </div>

        <div
          style={{
            background: 'rgba(201,168,76,0.05)',
            borderLeft: '3px solid #c9a84c',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12px',
            fontStyle: 'italic',
            color: '#c9a84c',
            marginTop: '24px',
          }}
        >
          Everything you enter here powers your scripts, scenes and campaign strategy in the next steps.
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button onClick={handleContinue} disabled={!canProceed} className="btn-primary flex-1">
          Continue to Scene Builder
        </button>
      </div>
    </motion.div>
  );
}
