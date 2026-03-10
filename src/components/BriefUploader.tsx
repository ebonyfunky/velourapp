import { useState, useRef } from 'react';
import { Upload, FileText, Image, CreditCard as Edit3, X, Check } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';

type UploadMode = 'document' | 'screenshot' | 'manual';

interface BriefData {
  brandName: string;
  productToFeature: string;
  keyMessages: string[];
  deliverables: string;
  dos: string[];
  donts: string[];
  deadline: string;
  usageRights: string;
  rawContent: string;
}

interface BriefUploaderProps {
  onBriefExtracted: (brief: BriefData) => void;
  onBriefCleared: () => void;
}

export default function BriefUploader({ onBriefExtracted, onBriefCleared }: BriefUploaderProps) {
  const [uploadMode, setUploadMode] = useState<UploadMode>('document');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [manualText, setManualText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedBrief, setExtractedBrief] = useState<BriefData | null>(null);
  const [isEditingField, setIsEditingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    if (uploadMode === 'screenshot') {
      const validImages = newFiles.filter(f => f.type.startsWith('image/'));
      if (uploadedFiles.length + validImages.length > 5) {
        alert('Maximum 5 screenshots allowed');
        return;
      }
      setUploadedFiles([...uploadedFiles, ...validImages.slice(0, 5 - uploadedFiles.length)]);
    } else {
      const validDocs = newFiles.filter(f =>
        f.type === 'application/pdf' ||
        f.type === 'application/msword' ||
        f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      if (validDocs.length > 0) {
        setUploadedFiles([validDocs[0]]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const extractBriefFromContent = async () => {
    setIsProcessing(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        setIsProcessing(false);
        return;
      }

      const anthropic = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true
      });

      let content: any[] = [];

      if (uploadMode === 'manual') {
        if (!manualText.trim()) {
          alert('Please paste the brief content');
          setIsProcessing(false);
          return;
        }
        content = [{
          type: 'text',
          text: `Extract the brand brief requirements from this content:\n\n${manualText}`
        }];
      } else if (uploadMode === 'screenshot') {
        if (uploadedFiles.length === 0) {
          alert('Please upload at least one screenshot');
          setIsProcessing(false);
          return;
        }

        const imagePromises = uploadedFiles.map(file => fileToBase64(file));
        const base64Images = await Promise.all(imagePromises);

        content = [
          {
            type: 'text',
            text: 'Extract the brand brief requirements from these screenshots:'
          },
          ...base64Images.map(base64 => ({
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: uploadedFiles[0].type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64
            }
          }))
        ];
      } else {
        if (uploadedFiles.length === 0) {
          alert('Please upload a document');
          setIsProcessing(false);
          return;
        }

        alert('PDF document extraction coming soon. For now, please use the "Paste It Manually" option to paste the brief text.');
        setIsProcessing(false);
        return;
      }

      const systemPrompt = `You are Velour's brief extraction assistant. Extract brand brief requirements from the provided content and return them in a structured JSON format.

Extract the following fields:
- brandName: The name of the brand (string)
- productToFeature: The specific product or service to promote (string)
- keyMessages: Array of key messages the brand wants included (array of strings)
- deliverables: What needs to be delivered (e.g., "1x 30 second video, 3x product photos") (string)
- dos: Array of things the brand wants in the content (array of strings)
- donts: Array of things the brand does NOT want (array of strings)
- deadline: If mentioned, the deadline date (string, empty if not mentioned)
- usageRights: If mentioned, usage rights or licensing terms (string, empty if not mentioned)

Return ONLY a valid JSON object with these exact field names. If a field cannot be determined from the content, use an empty string for strings or empty array for arrays.

Example output:
{
  "brandName": "EcoBottle",
  "productToFeature": "Sustainable Water Bottle",
  "keyMessages": ["Eco-friendly", "Keeps drinks cold for 24 hours", "Lifetime warranty"],
  "deliverables": "1x 30 second TikTok video, 1x 60 second Instagram Reel",
  "dos": ["Show the bottle in use", "Mention the lifetime warranty", "Use natural lighting"],
  "donts": ["Don't compare to competitors", "Avoid mentioning price"],
  "deadline": "March 25, 2026",
  "usageRights": "Organic use for 6 months, paid ads for 3 months"
}`;

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content
        }],
        system: systemPrompt
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not extract JSON from response');
      }

      const extractedData = JSON.parse(jsonMatch[0]);

      const brief: BriefData = {
        brandName: extractedData.brandName || '',
        productToFeature: extractedData.productToFeature || '',
        keyMessages: Array.isArray(extractedData.keyMessages) ? extractedData.keyMessages : [],
        deliverables: extractedData.deliverables || '',
        dos: Array.isArray(extractedData.dos) ? extractedData.dos : [],
        donts: Array.isArray(extractedData.donts) ? extractedData.donts : [],
        deadline: extractedData.deadline || '',
        usageRights: extractedData.usageRights || '',
        rawContent: uploadMode === 'manual' ? manualText : 'Uploaded file(s)'
      };

      setExtractedBrief(brief);
      onBriefExtracted(brief);
    } catch (error) {
      console.error('Error extracting brief:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearBrief = () => {
    setExtractedBrief(null);
    setUploadedFiles([]);
    setManualText('');
    onBriefCleared();
  };

  const updateBriefField = (field: keyof BriefData, value: string | string[]) => {
    if (!extractedBrief) return;
    const updated = { ...extractedBrief, [field]: value };
    setExtractedBrief(updated);
    onBriefExtracted(updated);
  };

  const addArrayItem = (field: 'keyMessages' | 'dos' | 'donts') => {
    if (!extractedBrief) return;
    const newItem = prompt(`Add new ${field === 'keyMessages' ? 'key message' : field === 'dos' ? 'do' : 'don\'t'}:`);
    if (newItem && newItem.trim()) {
      updateBriefField(field, [...extractedBrief[field], newItem.trim()]);
    }
  };

  const removeArrayItem = (field: 'keyMessages' | 'dos' | 'donts', index: number) => {
    if (!extractedBrief) return;
    updateBriefField(field, extractedBrief[field].filter((_, i) => i !== index));
  };

  if (extractedBrief) {
    return (
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px', fontFamily: 'Cormorant Garamond, serif' }}>
              Brand Brief Loaded
            </h2>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c' }}>
              Review and edit any field before generating your script
            </p>
          </div>
          <button
            onClick={clearBrief}
            style={{
              padding: '8px 16px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '100px',
              color: '#ef4444',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <X size={14} />
            Clear Brief
          </button>
        </div>

        <div
          style={{
            background: '#1c1a35',
            border: '2px solid #c9a84c',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                Brand Name
              </label>
              <input
                type="text"
                value={extractedBrief.brandName}
                onChange={(e) => updateBriefField('brandName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                Product to Feature
              </label>
              <input
                type="text"
                value={extractedBrief.productToFeature}
                onChange={(e) => updateBriefField('productToFeature', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', textTransform: 'uppercase' }}>
                  Key Messages
                </label>
                <button
                  onClick={() => addArrayItem('keyMessages')}
                  style={{
                    padding: '4px 12px',
                    background: 'rgba(201,168,76,0.2)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '100px',
                    color: '#c9a84c',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  + Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {extractedBrief.keyMessages.map((msg, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(201,168,76,0.15)',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '100px',
                      color: '#e8c96a',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {msg}
                    <X
                      size={14}
                      onClick={() => removeArrayItem('keyMessages', i)}
                      style={{ cursor: 'pointer', opacity: 0.7 }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                Deliverables Required
              </label>
              <input
                type="text"
                value={extractedBrief.deliverables}
                onChange={(e) => updateBriefField('deliverables', e.target.value)}
                placeholder="e.g., 1x 30 second video, 3x product photos"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase' }}>
                  Dos - What Brand Wants
                </label>
                <button
                  onClick={() => addArrayItem('dos')}
                  style={{
                    padding: '4px 12px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '100px',
                    color: '#22c55e',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  + Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {extractedBrief.dos.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: '100px',
                      color: '#22c55e',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {item}
                    <X
                      size={14}
                      onClick={() => removeArrayItem('dos', i)}
                      style={{ cursor: 'pointer', opacity: 0.7 }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>
                  Don'ts - What Brand Does NOT Want
                </label>
                <button
                  onClick={() => addArrayItem('donts')}
                  style={{
                    padding: '4px 12px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '100px',
                    color: '#ef4444',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  + Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {extractedBrief.donts.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: '100px',
                      color: '#ef4444',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {item}
                    <X
                      size={14}
                      onClick={() => removeArrayItem('donts', i)}
                      style={{ cursor: 'pointer', opacity: 0.7 }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Deadline
                </label>
                <input
                  type="text"
                  value={extractedBrief.deadline}
                  onChange={(e) => updateBriefField('deadline', e.target.value)}
                  placeholder="If mentioned"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#f0ebff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Usage Rights
                </label>
                <input
                  type="text"
                  value={extractedBrief.usageRights}
                  onChange={(e) => updateBriefField('usageRights', e.target.value)}
                  placeholder="If mentioned"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#f0ebff',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
            border: '2px solid #22c55e',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Check size={24} style={{ color: '#22c55e', flexShrink: 0 }} />
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
            Brief loaded - Velour will use these requirements when generating your script below
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#f0ebff', marginBottom: '8px', fontFamily: 'Cormorant Garamond, serif' }}>
        Upload Your Brand Brief First
      </h2>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#c9a84c', marginBottom: '32px' }}>
        Got a brief from the brand? Upload it here and Velour will read the requirements and bake them directly into your script so you deliver exactly what the brand asked for - first time every time.
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setUploadMode('document')}
          style={{
            padding: '12px 24px',
            background: uploadMode === 'document' ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
            border: uploadMode === 'document' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            color: uploadMode === 'document' ? '#0a0610' : '#d4cee8',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: uploadMode === 'document' ? '0 4px 12px rgba(201,168,76,0.4)' : 'none',
          }}
        >
          Upload a Document
        </button>
        <button
          onClick={() => setUploadMode('screenshot')}
          style={{
            padding: '12px 24px',
            background: uploadMode === 'screenshot' ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
            border: uploadMode === 'screenshot' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            color: uploadMode === 'screenshot' ? '#0a0610' : '#d4cee8',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: uploadMode === 'screenshot' ? '0 4px 12px rgba(201,168,76,0.4)' : 'none',
          }}
        >
          Upload a Screenshot
        </button>
        <button
          onClick={() => setUploadMode('manual')}
          style={{
            padding: '12px 24px',
            background: uploadMode === 'manual' ? 'linear-gradient(135deg, #c9a84c, #8B6914)' : 'rgba(255,255,255,0.05)',
            border: uploadMode === 'manual' ? 'none' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            color: uploadMode === 'manual' ? '#0a0610' : '#d4cee8',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: uploadMode === 'manual' ? '0 4px 12px rgba(201,168,76,0.4)' : 'none',
          }}
        >
          Paste It Manually
        </button>
      </div>

      {uploadMode === 'manual' ? (
        <div>
          <textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="Paste the brand brief, email or campaign requirements here..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              border: '2px dashed #c9a84c',
              borderRadius: '12px',
              color: '#f0ebff',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '16px',
            }}
          />
          <button
            onClick={extractBriefFromContent}
            disabled={isProcessing || !manualText.trim()}
            style={{
              padding: '14px 28px',
              background: isProcessing || !manualText.trim() ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isProcessing || !manualText.trim() ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              opacity: !manualText.trim() ? 0.5 : 1,
            }}
          >
            {isProcessing ? 'Analyzing Brief...' : 'Extract Requirements'}
          </button>
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={uploadMode === 'screenshot' ? 'image/*' : '.pdf,.doc,.docx'}
            multiple={uploadMode === 'screenshot'}
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: '2px dashed #c9a84c',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(201,168,76,0.03)',
              marginBottom: '16px',
            }}
          >
            {uploadMode === 'screenshot' ? (
              <Image size={48} style={{ color: '#c9a84c', margin: '0 auto 16px' }} />
            ) : (
              <FileText size={48} style={{ color: '#c9a84c', margin: '0 auto 16px' }} />
            )}
            <p style={{ fontSize: '16px', color: '#f0ebff', marginBottom: '8px', fontWeight: 600 }}>
              Drag your {uploadMode === 'screenshot' ? 'screenshot' : 'brief'} here or tap to upload
            </p>
            <p style={{ fontSize: '13px', color: '#9b8fb5' }}>
              {uploadMode === 'screenshot' ? 'JPG or PNG - Up to 5 images' : 'PDF or Word doc'}
            </p>
          </div>

          {uploadedFiles.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#c9a84c', marginBottom: '12px', textTransform: 'uppercase' }}>
                Uploaded Files:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {uploadedFiles.map((file, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#f0ebff' }}>{file.name}</span>
                    <X
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      style={{ color: '#ef4444', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={extractBriefFromContent}
            disabled={isProcessing || uploadedFiles.length === 0}
            style={{
              padding: '14px 28px',
              background: isProcessing || uploadedFiles.length === 0 ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #8B6914)',
              color: '#0a0610',
              border: 'none',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isProcessing || uploadedFiles.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
              opacity: uploadedFiles.length === 0 ? 0.5 : 1,
            }}
          >
            {isProcessing ? 'Analyzing Brief...' : 'Extract Requirements'}
          </button>
        </div>
      )}
    </div>
  );
}

export { type BriefData };
