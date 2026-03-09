import { useState, useEffect } from 'react';
import { Check, Square } from 'lucide-react';
import { BriefData } from './BriefUploader';

interface BriefRequirementsChecklistProps {
  brief: BriefData;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  category: 'message' | 'do' | 'dont' | 'deliverable';
}

export default function BriefRequirementsChecklist({ brief }: BriefRequirementsChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    const checklist: ChecklistItem[] = [];

    brief.keyMessages.forEach((msg, i) => {
      checklist.push({
        id: `msg-${i}`,
        label: `Include key message: "${msg}"`,
        checked: false,
        category: 'message'
      });
    });

    brief.dos.forEach((item, i) => {
      checklist.push({
        id: `do-${i}`,
        label: item,
        checked: false,
        category: 'do'
      });
    });

    brief.donts.forEach((item, i) => {
      checklist.push({
        id: `dont-${i}`,
        label: `Avoid: ${item}`,
        checked: false,
        category: 'dont'
      });
    });

    if (brief.deliverables) {
      checklist.push({
        id: 'deliverable',
        label: `Match deliverable format: ${brief.deliverables}`,
        checked: false,
        category: 'deliverable'
      });
    }

    setItems(checklist);
  }, [brief]);

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const allChecked = checkedCount === totalCount && totalCount > 0;

  if (items.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '48px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#f0ebff', marginBottom: '16px', fontFamily: 'Cormorant Garamond, serif' }}>
        ✅ Brief Requirements Check
      </h3>

      <div
        style={{
          background: '#1c1a35',
          border: '2px solid rgba(201,168,76,0.3)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '16px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#c9a84c' }}>
              Progress: {checkedCount} of {totalCount} requirements covered
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: allChecked ? '#22c55e' : '#9b8fb5' }}>
              {Math.round((checkedCount / totalCount) * 100)}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '100px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(checkedCount / totalCount) * 100}%`,
                height: '100%',
                background: allChecked ? '#22c55e' : 'linear-gradient(90deg, #c9a84c, #8B6914)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 16px',
                background: item.checked ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                border: item.checked ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: item.checked ? 'none' : '2px solid rgba(255,255,255,0.3)',
                  background: item.checked ? '#22c55e' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {item.checked && <Check size={14} style={{ color: '#0a0610' }} />}
              </div>
              <span
                style={{
                  fontSize: '14px',
                  color: item.checked ? '#22c55e' : '#d4cee8',
                  textDecoration: item.checked ? 'line-through' : 'none',
                  opacity: item.checked ? 0.8 : 1,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {allChecked && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
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
            All brief requirements covered — you are ready to deliver
          </p>
        </div>
      )}
    </div>
  );
}
