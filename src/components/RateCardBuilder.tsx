import { useRef, useState } from 'react';
import { Download, Mail, Globe, ExternalLink, Plus, X, ChevronDown, ChevronUp, Instagram, Video, Youtube, MessageCircle, Upload, Star } from 'lucide-react';
import { useCampaignStore } from '../store/campaignStore';
import DatePicker from './DatePicker';

export default function RateCardBuilder() {
  const {
    rateCardCreatorName,
    rateCardCreatorTitle,
    rateCardEmail,
    rateCardPortfolioLink,
    rateCardProfilePhoto,
    rateCardPortfolioPieces,
    rateCardContentRates,
    rateCardCustomRates,
    rateCardPackages,
    rateCardAddOns,
    rateCardContactMethods,
    rateCardTurnaround,
    rateCardRevisions,
    rateCardValidUntil,
    rateCardConnectHeading,
    setField,
  } = useCampaignStore();

  const [showPortfolioGuide, setShowPortfolioGuide] = useState(false);
  const [showContactTypeSelector, setShowContactTypeSelector] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('#12102a');

  const previewRef = useRef<HTMLDivElement>(null);

  const updateContentRate = (id: string, field: 'rate' | 'enabled', value: string | boolean) => {
    if (!Array.isArray(rateCardContentRates)) return;
    const updated = rateCardContentRates.map((rate) =>
      rate.id === id ? { ...rate, [field]: value } : rate
    );
    setField('rateCardContentRates', updated);
  };

  const removeContentRate = (id: string) => {
    if (!Array.isArray(rateCardContentRates)) return;
    setField('rateCardContentRates', rateCardContentRates.filter((rate) => rate.id !== id));
  };

  const contactTypeOptions = [
    { type: 'email' as const, label: 'Email', icon: Mail, placeholder: 'your@email.com' },
    { type: 'instagram' as const, label: 'Instagram', icon: Instagram, placeholder: '@yourhandle' },
    { type: 'tiktok' as const, label: 'TikTok', icon: Video, placeholder: '@yourhandle' },
    { type: 'youtube' as const, label: 'YouTube', icon: Youtube, placeholder: '@yourchannel' },
    { type: 'website' as const, label: 'Website', icon: Globe, placeholder: 'https://yoursite.com' },
    { type: 'portfolio' as const, label: 'Portfolio Link', icon: ExternalLink, placeholder: 'https://...' },
    { type: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle, placeholder: '+1234567890' },
    { type: 'custom' as const, label: 'Custom', icon: Plus, placeholder: 'Enter contact info' },
  ];

  const addContactMethod = (type: 'email' | 'instagram' | 'tiktok' | 'youtube' | 'website' | 'portfolio' | 'whatsapp' | 'custom') => {
    const newContact = {
      id: `contact-${Date.now()}`,
      type,
      value: '',
      label: type === 'custom' ? '' : undefined,
    };
    setField('rateCardContactMethods', [...rateCardContactMethods, newContact]);
    setShowContactTypeSelector(false);
  };

  const updateContactMethod = (id: string, field: 'value' | 'label', value: string) => {
    if (!Array.isArray(rateCardContactMethods)) return;
    const updated = rateCardContactMethods.map((contact) =>
      contact.id === id ? { ...contact, [field]: value } : contact
    );
    setField('rateCardContactMethods', updated);
  };

  const removeContactMethod = (id: string) => {
    if (!Array.isArray(rateCardContactMethods)) return;
    setField('rateCardContactMethods', rateCardContactMethods.filter((contact) => contact.id !== id));
  };

  const getContactIcon = (type: string) => {
    const option = contactTypeOptions.find(o => o.type === type);
    return option ? option.icon : Mail;
  };

  const getContactLabel = (type: string) => {
    const option = contactTypeOptions.find(o => o.type === type);
    return option ? option.label : type;
  };

  const getInitials = (name: string) => {
    if (!name) return 'UC';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#1c1a35',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${rateCardCreatorName || 'creator'}-rate-card.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const downloadPNG = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        backgroundColor: '#1c1a35',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${rateCardCreatorName || 'creator'}-rate-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  const addCustomRate = () => {
    const newCustomRate = {
      id: `custom-${Date.now()}`,
      name: '',
      rate: '',
    };
    setField('rateCardCustomRates', [...rateCardCustomRates, newCustomRate]);
  };

  const updateCustomRate = (id: string, field: 'name' | 'rate', value: string) => {
    if (!Array.isArray(rateCardCustomRates)) return;
    const updated = rateCardCustomRates.map((rate) =>
      rate.id === id ? { ...rate, [field]: value } : rate
    );
    setField('rateCardCustomRates', updated);
  };

  const removeCustomRate = (id: string) => {
    if (!Array.isArray(rateCardCustomRates)) return;
    setField('rateCardCustomRates', rateCardCustomRates.filter((rate) => rate.id !== id));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setField('rateCardProfilePhoto', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPackage = () => {
    const newPackage = {
      id: `package-${Date.now()}`,
      name: '',
      price: '',
      description: '',
      isMostPopular: false,
    };
    setField('rateCardPackages', [...rateCardPackages, newPackage]);
  };

  const updatePackage = (id: string, field: 'name' | 'price' | 'description' | 'isMostPopular', value: string | boolean) => {
    if (!Array.isArray(rateCardPackages)) return;
    const updated = rateCardPackages.map((pkg) =>
      pkg.id === id ? { ...pkg, [field]: value } : field === 'isMostPopular' && value === true ? { ...pkg, isMostPopular: false } : pkg
    );
    setField('rateCardPackages', updated);
  };

  const removePackage = (id: string) => {
    if (!Array.isArray(rateCardPackages)) return;
    setField('rateCardPackages', rateCardPackages.filter((pkg) => pkg.id !== id));
  };

  const updateAddOn = (id: string, field: 'name' | 'price' | 'enabled', value: string | boolean) => {
    if (!Array.isArray(rateCardAddOns)) return;
    const updated = rateCardAddOns.map((addon) =>
      addon.id === id ? { ...addon, [field]: value } : addon
    );
    setField('rateCardAddOns', updated);
  };

  const addCustomAddOn = () => {
    const newAddOn = {
      id: `addon-${Date.now()}`,
      name: '',
      price: '',
      enabled: true,
    };
    setField('rateCardAddOns', [...rateCardAddOns, newAddOn]);
  };

  const removeAddOn = (id: string) => {
    if (!Array.isArray(rateCardAddOns)) return;
    setField('rateCardAddOns', rateCardAddOns.filter((addon) => addon.id !== id));
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Rate Card Builder
      </h1>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Create a professional rate card for your UGC services
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Form Section */}
        <div
          style={{
            background: '#1c1a35',
            border: '1.5px solid rgba(201,168,76,0.2)',
            borderRadius: '16px',
            padding: '32px',
            height: 'fit-content',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0ebff', marginBottom: '24px' }}>Your Information</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Profile Photo
              </label>
              <p style={{ fontSize: '11px', color: '#c9a84c', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic' }}>
                Upload a clear headshot or brand photo. Square images work best.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {rateCardProfilePhoto ? (
                  <img src={rateCardProfilePhoto} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #c9a84c' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px dashed #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={24} style={{ color: '#c9a84c' }} />
                  </div>
                )}
                <label style={{ cursor: 'pointer' }}>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  <div style={{ padding: '10px 20px', background: 'rgba(201,168,76,0.15)', border: '1px solid #c9a84c', borderRadius: '8px', color: '#e8c96a', fontSize: '13px', fontWeight: 600 }}>
                    {rateCardProfilePhoto ? 'Change Photo' : 'Upload Photo'}
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Creator Name
              </label>
              <input
                type="text"
                value={rateCardCreatorName}
                onChange={(e) => setField('rateCardCreatorName', e.target.value)}
                placeholder="Your full name"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Title/Label
              </label>
              <input
                type="text"
                value={rateCardCreatorTitle}
                onChange={(e) => setField('rateCardCreatorTitle', e.target.value)}
                placeholder="e.g., UGC Creator, Content Creator"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '4px', fontWeight: 600 }}>
                How To Reach You
              </label>
              <p style={{ fontSize: '11px', color: '#c9a84c', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic' }}>
                Only add what you actually use. You do not need social media to be a successful UGC creator — an email address and portfolio link is all a brand needs to hire you.
              </p>

              {Array.isArray(rateCardContactMethods) && rateCardContactMethods.map((contact) => {
                const Icon = getContactIcon(contact.type);
                return (
                  <div key={contact.id} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                      <Icon size={14} style={{ color: '#c9a84c' }} />
                      <span style={{ fontSize: '12px', color: '#9b8fb5', fontWeight: 600 }}>
                        {contact.type === 'custom' ? (contact.label || 'Custom') : getContactLabel(contact.type)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {contact.type === 'custom' && (
                        <input
                          type="text"
                          value={contact.label || ''}
                          onChange={(e) => updateContactMethod(contact.id, 'label', e.target.value)}
                          placeholder="Label (e.g., Discord)"
                          style={{
                            flex: '0 0 140px',
                            padding: '10px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#f0ebff',
                            fontSize: '13px',
                          }}
                        />
                      )}
                      <input
                        type="text"
                        value={contact.value}
                        onChange={(e) => updateContactMethod(contact.id, 'value', e.target.value)}
                        placeholder={contactTypeOptions.find(o => o.type === contact.type)?.placeholder || 'Enter value'}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      />
                      <button
                        onClick={() => removeContactMethod(contact.id)}
                        style={{
                          padding: '10px',
                          background: 'rgba(220, 38, 38, 0.1)',
                          border: '1px solid rgba(220, 38, 38, 0.3)',
                          borderRadius: '8px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowContactTypeSelector(!showContactTypeSelector)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1.5px dashed rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    color: '#c9a84c',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  }}
                >
                  <Plus size={16} />
                  Add Contact Method
                </button>

                {showContactTypeSelector && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    background: '#252340',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    padding: '8px',
                    zIndex: 10,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  }}>
                    {contactTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.type}
                          onClick={() => addContactMethod(option.type)}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#d0c9e0',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <Icon size={16} style={{ color: '#c9a84c' }} />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '4px', fontWeight: 600 }}>
                Portfolio Link
              </label>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '8px', fontStyle: 'italic' }}>
                Google Drive, Canva Portfolio, Dropbox, or any link where your work lives
              </p>
              <input
                type="text"
                value={rateCardPortfolioLink}
                onChange={(e) => setField('rateCardPortfolioLink', e.target.value)}
                placeholder="https://drive.google.com/..."
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
              <p style={{ fontSize: '11px', color: '#c9a84c', marginTop: '8px', lineHeight: '1.5' }}>
                You do not need a social media account to be a UGC creator. Brands hire you to create content they post on their own channels. Your portfolio link is all you need.
              </p>

              {/* Collapsible Portfolio Setup Guide */}
              <div style={{ marginTop: '16px' }}>
                <button
                  onClick={() => setShowPortfolioGuide(!showPortfolioGuide)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    background: 'rgba(201,168,76,0.05)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '8px',
                    color: '#c9a84c',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(201,168,76,0.05)';
                  }}
                >
                  <span>Don't have a portfolio link yet? Here's how to set one up in 5 minutes</span>
                  {showPortfolioGuide ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {showPortfolioGuide && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Option 1: Google Drive */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '10px', padding: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
                        Option 1 — Google Drive (Free & Easy)
                      </h4>
                      <ol style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.8', paddingLeft: '20px', marginBottom: '12px' }}>
                        <li>Go to drive.google.com and sign in with your Google account</li>
                        <li>Click <strong>"+ New"</strong> then <strong>"New Folder"</strong> and name it <em>"My UGC Portfolio"</em></li>
                        <li>Upload your videos and photos into the folder</li>
                        <li>Right click the folder, click <strong>"Share"</strong> then change access to <strong>"Anyone with the link can view"</strong></li>
                        <li>Copy the link and paste it into your Portfolio Link field above</li>
                      </ol>
                      <a
                        href="https://drive.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          background: 'rgba(201,168,76,0.15)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: '6px',
                          color: '#e8c96a',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.25)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                        }}
                      >
                        Open Google Drive →
                      </a>
                    </div>

                    {/* Option 2: Canva */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '10px', padding: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
                        Option 2 — Canva Portfolio (Most Visual & Professional)
                      </h4>
                      <ol style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.8', paddingLeft: '20px', marginBottom: '12px' }}>
                        <li>Go to canva.com and create a free account</li>
                        <li>Search for <strong>"UGC Portfolio"</strong> or <strong>"Media Kit"</strong> in templates</li>
                        <li>Add your videos, photos, rates and contact info to the template</li>
                        <li>Click <strong>"Share"</strong> then <strong>"Publish to web"</strong> to get a shareable link</li>
                        <li>Copy that link and paste it into your Portfolio Link field above</li>
                      </ol>
                      <a
                        href="https://canva.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          background: 'rgba(201,168,76,0.15)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: '6px',
                          color: '#e8c96a',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.25)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                        }}
                      >
                        Open Canva →
                      </a>
                    </div>

                    {/* Option 3: Dropbox */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '10px', padding: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '12px' }}>
                        Option 3 — Dropbox (Great for Large Video Files)
                      </h4>
                      <ol style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.8', paddingLeft: '20px', marginBottom: '12px' }}>
                        <li>Go to dropbox.com and create a free account</li>
                        <li>Click <strong>"Upload Files"</strong> and add your content</li>
                        <li>Right click your folder and select <strong>"Share"</strong></li>
                        <li>Copy the link and paste it into your Portfolio Link field above</li>
                      </ol>
                      <a
                        href="https://dropbox.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          background: 'rgba(201,168,76,0.15)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: '6px',
                          color: '#e8c96a',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.25)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                        }}
                      >
                        Open Dropbox →
                      </a>
                    </div>

                    {/* Motivational Note */}
                    <p style={{ fontSize: '12px', color: '#e8c96a', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.6' }}>
                      Your portfolio does not need to be perfect to start. Three good videos in a Google Drive folder is enough to land your first brand deal.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Portfolio Pieces
              </label>
              <input
                type="number"
                value={rateCardPortfolioPieces}
                onChange={(e) => setField('rateCardPortfolioPieces', e.target.value)}
                placeholder="0"
                min="0"
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

            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginTop: '16px', marginBottom: '8px' }}>
              Content Type Rates
            </h3>
            <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic' }}>
              Only include the services you actually offer. Uncheck the services you don't offer.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Array.isArray(rateCardContentRates) && rateCardContentRates.map((contentRate) => (
                <div key={contentRate.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={contentRate.enabled}
                    onChange={(e) => updateContentRate(contentRate.id, 'enabled', e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '10px',
                      cursor: 'pointer',
                      accentColor: '#c9a84c',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', color: contentRate.enabled ? '#9b8fb5' : '#6b6584', marginBottom: '6px', fontWeight: 600 }}>
                      {contentRate.label}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                      <input
                        type="text"
                        value={contentRate.rate}
                        onChange={(e) => updateContentRate(contentRate.id, 'rate', e.target.value)}
                        placeholder="150"
                        disabled={!contentRate.enabled}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: contentRate.enabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: contentRate.enabled ? '#f0ebff' : '#6b6584',
                          fontSize: '13px',
                          opacity: contentRate.enabled ? 1 : 0.5,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeContentRate(contentRate.id)}
                    style={{
                      padding: '10px',
                      marginTop: '20px',
                      background: 'rgba(220, 38, 38, 0.1)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Rates Section */}
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '12px', fontStyle: 'italic' }}>
                Don't see your content type? Add your own below.
              </p>

              {Array.isArray(rateCardCustomRates) && rateCardCustomRates.map((customRate) => (
                <div key={customRate.id} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <input
                    type="text"
                    value={customRate.name}
                    onChange={(e) => updateCustomRate(customRate.id, 'name', e.target.value)}
                    placeholder="e.g. Live Stream, Reel Package, Story Bundle..."
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '0 0 120px' }}>
                    <span style={{ color: '#e8c96a', fontWeight: 700 }}>$</span>
                    <input
                      type="text"
                      value={customRate.rate}
                      onChange={(e) => updateCustomRate(customRate.id, 'rate', e.target.value)}
                      placeholder="150"
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '13px',
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeCustomRate(customRate.id)}
                    style={{
                      padding: '10px',
                      background: 'rgba(220, 38, 38, 0.1)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      borderRadius: '8px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={addCustomRate}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1.5px dashed rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                }}
              >
                <Plus size={16} />
                Add Custom Rate
              </button>
            </div>

            <div style={{ marginTop: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
                Create a Package Deal
              </h3>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic' }}>
                Bundle your services into attractive packages. Add descriptions as bullet points.
              </p>

              {Array.isArray(rateCardPackages) && rateCardPackages.map((pkg) => (
                <div key={pkg.id} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                      placeholder="Package name (e.g., Starter Package)"
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '13px',
                      }}
                    />
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                      placeholder="$500"
                      style={{
                        flex: '0 0 100px',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#f0ebff',
                        fontSize: '13px',
                      }}
                    />
                    <button
                      onClick={() => removePackage(pkg.id)}
                      style={{
                        padding: '10px',
                        background: 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <textarea
                    value={pkg.description}
                    onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                    placeholder="• 3 short-form videos&#10;• 5 high-res photos&#10;• 2 rounds of revisions&#10;• 30-day usage rights"
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                      minHeight: '80px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      marginBottom: '8px',
                    }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#c9a84c' }}>
                    <input
                      type="checkbox"
                      checked={pkg.isMostPopular}
                      onChange={(e) => updatePackage(pkg.id, 'isMostPopular', e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <Star size={14} />
                    Mark as "Most Popular"
                  </label>
                </div>
              ))}

              <button
                onClick={addPackage}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1.5px dashed rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Plus size={16} />
                Add Package
              </button>
            </div>

            <div style={{ marginTop: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
                Add Ons
              </h3>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic' }}>
                Extra services you offer. Uncheck the services you don't offer.
              </p>

              {Array.isArray(rateCardAddOns) && rateCardAddOns.map((addon) => (
                <div key={addon.id} style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={addon.enabled}
                    onChange={(e) => updateAddOn(addon.id, 'enabled', e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#c9a84c',
                    }}
                  />
                  <input
                    type="text"
                    value={addon.name}
                    onChange={(e) => updateAddOn(addon.id, 'name', e.target.value)}
                    placeholder="Add-on name"
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                  <input
                    type="text"
                    value={addon.price}
                    onChange={(e) => updateAddOn(addon.id, 'price', e.target.value)}
                    placeholder="$50"
                    style={{
                      flex: '0 0 120px',
                      padding: '10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0ebff',
                      fontSize: '13px',
                    }}
                  />
                  {!['paidAdUsage', 'additionalHook', 'additionalCTA', 'rawFootage', 'rushOrder'].includes(addon.id) && (
                    <button
                      onClick={() => removeAddOn(addon.id)}
                      style={{
                        padding: '10px',
                        background: 'rgba(220, 38, 38, 0.1)',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        borderRadius: '8px',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addCustomAddOn}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1.5px dashed rgba(201,168,76,0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Plus size={16} />
                Add Custom Add-On
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Connect With Me Heading
              </label>
              <input
                type="text"
                value={rateCardConnectHeading}
                onChange={(e) => setField('rateCardConnectHeading', e.target.value)}
                placeholder="Connect With Me"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Turnaround Time
              </label>
              <input
                type="text"
                value={rateCardTurnaround}
                onChange={(e) => setField('rateCardTurnaround', e.target.value)}
                placeholder="5-7 business days"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Revision Policy
              </label>
              <input
                type="text"
                value={rateCardRevisions}
                onChange={(e) => setField('rateCardRevisions', e.target.value)}
                placeholder="2 revisions included"
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
              <label style={{ display: 'block', fontSize: '13px', color: '#9b8fb5', marginBottom: '8px', fontWeight: 600 }}>
                Rate Card Valid Until
              </label>
              <DatePicker
                value={rateCardValidUntil ? new Date(rateCardValidUntil) : new Date()}
                onChange={(date) => setField('rateCardValidUntil', date.toISOString().split('T')[0])}
              />
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f0ebff' }}>Live Preview</h3>
          </div>

          {/* Rate Card Preview */}
          <div
            ref={previewRef}
            style={{
              background: selectedTheme === '#12102a' ? 'linear-gradient(135deg, #1c1a35 0%, #17152e 100%)' : selectedTheme,
              borderRadius: '16px',
              padding: '48px',
              minHeight: '800px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              border: '2px solid rgba(201,168,76,0.2)',
            }}
          >
            {/* Header */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '2px solid rgba(201,168,76,0.3)',
              }}
            >
              {rateCardProfilePhoto ? (
                <img
                  src={rateCardProfilePhoto}
                  alt={rateCardCreatorName || 'Creator'}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #c9a84c',
                    objectFit: 'cover',
                    marginBottom: '16px',
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #c9a84c',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#e8c96a',
                    marginBottom: '16px',
                    background: 'rgba(201,168,76,0.1)',
                  }}
                >
                  {getInitials(rateCardCreatorName)}
                </div>
              )}
              <h1
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#f0ebff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}
              >
                {rateCardCreatorName || 'Your Name'}
              </h1>
              <div
                style={{
                  fontSize: '14px',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: 600,
                }}
              >
                {rateCardCreatorTitle}
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '12px',
                  color: '#e8c96a',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                {rateCardConnectHeading || 'Contact Information'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {rateCardEmail && (
                  <div style={{ fontSize: '13px', color: '#d0c9e0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} style={{ color: '#c9a84c' }} />
                    {rateCardEmail}
                  </div>
                )}
                {Array.isArray(rateCardContactMethods) && rateCardContactMethods.filter(c => c.value).map((contact) => {
                  const Icon = getContactIcon(contact.type);
                  return (
                    <div key={contact.id} style={{ fontSize: '13px', color: '#d0c9e0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={14} style={{ color: '#c9a84c' }} />
                      {contact.type === 'custom' && contact.label ? `${contact.label}: ` : ''}{contact.value}
                    </div>
                  );
                })}
                {rateCardPortfolioLink && (
                  <div style={{ fontSize: '13px', color: '#d0c9e0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Globe size={14} style={{ color: '#c9a84c', marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <a href={rateCardPortfolioLink} target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}>Portfolio</a>
                      <span style={{ fontSize: '12px', color: '#9b8fb5', wordBreak: 'break-all' }}>{rateCardPortfolioLink}</span>
                    </div>
                  </div>
                )}
                {rateCardPortfolioPieces && parseInt(rateCardPortfolioPieces) > 0 && (
                  <div style={{ fontSize: '13px', color: '#d0c9e0' }}>
                    <strong style={{ color: '#e8c96a' }}>Portfolio Pieces:</strong> {rateCardPortfolioPieces}
                  </div>
                )}
              </div>
            </div>

            {/* Rate Table */}
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '12px',
                  color: '#e8c96a',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                Services & Rates
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Array.isArray(rateCardContentRates) && rateCardContentRates.filter(r => r.enabled && r.rate).map((contentRate) => (
                  <div
                    key={contentRate.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'rgba(201,168,76,0.05)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#d0c9e0' }}>{contentRate.label}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a' }}>${contentRate.rate}</span>
                  </div>
                ))}

                {Array.isArray(rateCardCustomRates) && rateCardCustomRates.filter(r => r.name && r.rate).map((customRate) => (
                  <div
                    key={customRate.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'rgba(201,168,76,0.05)',
                      border: '1px solid rgba(201,168,76,0.15)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#d0c9e0' }}>{customRate.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a' }}>${customRate.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            {Array.isArray(rateCardPackages) && rateCardPackages.filter(p => p.name && p.price).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '12px',
                    color: '#e8c96a',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  Package Deals
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                  {rateCardPackages.filter(p => p.name && p.price).map((pkg) => (
                    <div
                      key={pkg.id}
                      style={{
                        padding: '16px',
                        background: 'rgba(201,168,76,0.05)',
                        border: pkg.isMostPopular ? '2px solid #c9a84c' : '1px solid rgba(201,168,76,0.15)',
                        borderRadius: '8px',
                        position: 'relative',
                      }}
                    >
                      {pkg.isMostPopular && (
                        <div style={{ position: 'absolute', top: '-10px', right: '12px', background: '#c9a84c', color: '#0a0610', padding: '4px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Most Popular
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#f0ebff' }}>{pkg.name}</span>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#e8c96a' }}>{pkg.price}</span>
                      </div>
                      {pkg.description && (
                        <div style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                          {pkg.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Ons */}
            {Array.isArray(rateCardAddOns) && rateCardAddOns.filter(a => a.enabled && a.name && a.price).length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '12px',
                    color: '#e8c96a',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  Add Ons
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rateCardAddOns.filter(a => a.enabled && a.name && a.price).map((addon) => (
                    <div
                      key={addon.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        background: 'rgba(201,168,76,0.05)',
                        border: '1px solid rgba(201,168,76,0.15)',
                        borderRadius: '6px',
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#d0c9e0' }}>{addon.name}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8c96a' }}>{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h4 style={{ fontSize: '11px', color: '#e8c96a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
                  Turnaround
                </h4>
                <p style={{ fontSize: '13px', color: '#d0c9e0' }}>{rateCardTurnaround}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', color: '#e8c96a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 700 }}>
                  Revisions
                </h4>
                <p style={{ fontSize: '13px', color: '#d0c9e0' }}>{rateCardRevisions}</p>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '16px', textAlign: 'center' }}>
              {rateCardValidUntil && (
                <p style={{ fontSize: '11px', color: '#d0c9e0', marginBottom: '12px', lineHeight: '1.5' }}>
                  Rates are valid until {new Date(rateCardValidUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. Please reach out for updated rates after this date.
                </p>
              )}
              <p style={{ fontSize: '10px', color: '#9b8fb5', fontStyle: 'italic' }}>
                Created with Velour — velour-app.com
              </p>
            </div>
          </div>

          {/* Download Buttons */}
          <div style={{ marginTop: '24px' }}>
            <p style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '16px', lineHeight: '1.6' }}>
              Download your rate card and customise it in Canva, Google Slides or any design app. Add your photo, brand colors and logo to make it uniquely yours.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', color: '#9b8fb5', marginBottom: '8px' }}>Choose your rate card colour</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { color: '#12102a', name: 'Velour Dark' },
                  { color: '#ffffff', name: 'Clean White' },
                  { color: '#f9e4e4', name: 'Soft Rose' },
                  { color: '#e8f0e8', name: 'Sage Green' },
                  { color: '#0d1b2a', name: 'Ocean Blue' },
                  { color: '#f5f0e8', name: 'Warm Cream' },
                  { color: '#000000', name: 'Classic Black' },
                  { color: '#ede7f6', name: 'Lavender' },
                ].map((theme) => (
                  <div
                    key={theme.color}
                    onClick={() => setSelectedTheme(theme.color)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: theme.color,
                      cursor: 'pointer',
                      border: selectedTheme === theme.color ? '3px solid #c9a84c' : '2px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={downloadPDF}
                style={{
                  flex: 1,
                  padding: '14px 24px',
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
                  gap: '8px',
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
                <Download size={16} />
                Download as PDF
              </button>

              <button
                onClick={downloadPNG}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'rgba(201,168,76,0.15)',
                  color: '#e8c96a',
                  border: '1.5px solid #c9a84c',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={16} />
                Download as PNG
              </button>
            </div>

            {/* Canva Templates Section */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
                Free Canva Templates For Your Rate Card
              </h3>
              <p style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '20px', lineHeight: '1.6' }}>
                Click any template below to open it directly in Canva and customise it with your details.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                {[
                  { name: 'UGC Creator Rate Card', description: 'Clean minimal rate card perfect for beginner UGC creators', url: 'https://www.canva.com/templates/?query=ugc+rate+card' },
                  { name: 'Media Kit Template', description: 'Professional media kit layout with photo, rates and services', url: 'https://www.canva.com/templates/?query=media+kit' },
                  { name: 'Creator Media Kit', description: 'Bold and modern layout ideal for lifestyle and beauty creators', url: 'https://www.canva.com/templates/?query=creator+media+kit' },
                  { name: 'Influencer Rate Card', description: 'Elegant design with sections for rates, services and contact', url: 'https://www.canva.com/templates/?query=influencer+rate+card' },
                  { name: 'Minimal Price List', description: 'Simple clean price list great for UGC service rates', url: 'https://www.canva.com/templates/?query=minimal+price+list' },
                  { name: 'Brand Pitch Deck', description: 'Multi-page deck for presenting yourself to brands professionally', url: 'https://www.canva.com/templates/?query=brand+pitch+deck' },
                ].map((template, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ marginBottom: '12px', flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#e8c96a', marginBottom: '6px' }}>
                        {idx === 0 && '🎨 '}{idx === 1 && '📋 '}{idx === 2 && '💼 '}{idx === 3 && '✨ '}{idx === 4 && '🌿 '}{idx === 5 && '🖤 '}
                        {template.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.5' }}>
                        {template.description}
                      </p>
                    </div>
                    <a
                      href={template.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 16px',
                        background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#0a0610',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(201,168,76,0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,168,76,0.3)';
                      }}
                    >
                      Open in Canva <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>

              {/* How To Guide */}
              <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#e8c96a', marginBottom: '20px', textAlign: 'center' }}>
                  How To Customise Your Velour Rate Card in Canva
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    {
                      title: 'Step 1 — Download your rate card from Velour',
                      description: 'Click the "Download as PNG" button above. PNG works best for uploading into Canva.',
                    },
                    {
                      title: 'Step 2 — Open a Canva template',
                      description: 'Click any template above to open it in Canva. Create a free account if you don\'t have one.',
                    },
                    {
                      title: 'Step 3 — Delete the template\'s placeholder content',
                      description: 'Once inside Canva click on the text and images in the template and delete what you don\'t need.',
                    },
                    {
                      title: 'Step 4 — Upload your Velour rate card',
                      description: 'Click "Uploads" on the left sidebar in Canva. Click "Upload files" and select the PNG you downloaded from Velour. Drag it onto your canvas.',
                    },
                    {
                      title: 'Step 5 — Add your personal touches',
                      description: 'Add your photo, change the fonts and colors to match your brand, add your logo if you have one.',
                    },
                    {
                      title: 'Step 6 — Download your finished rate card',
                      description: 'Click "Share" then "Download" in Canva. Choose PDF Print for the best quality. Your professional rate card is ready to send to brands.',
                    },
                  ].map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderLeft: '3px solid #c9a84c',
                        paddingLeft: '16px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                      }}
                    >
                      <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#f0ebff', marginBottom: '4px' }}>
                        {step.title}
                      </h5>
                      <p style={{ fontSize: '12px', color: '#d0c9e0', lineHeight: '1.5', fontStyle: 'italic' }}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '12px', color: '#c9a84c', marginTop: '20px', textAlign: 'center', lineHeight: '1.6', fontStyle: 'italic', fontWeight: 600 }}>
                  Tip: The PNG you download from Velour already has all your rates and information filled in. Canva is just for making it look beautiful and on-brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
