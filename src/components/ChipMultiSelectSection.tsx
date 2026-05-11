/**
 * Reusable chip multi-select with predefined pool plus custom chips (Velour Audience Avatar).
 */
import { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

const GOLD = '#D4A93C';
const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_BOTTOM = '#151A40';

const CHIP_MIN = 3;
const CHIP_MAX = 5;

const SECTION_BOX_SHADOW =
  'shadow-[0_12px_48px_rgba(10,10,26,0.45),0_4px_20px_rgba(212,169,60,0.06)]';

const CHIP_FOCUS_CLASS =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,169,60,0.45)]';

const CHIP_BASE_CLASS =
  `rounded-full border px-3.5 py-2 text-left text-[14px] leading-snug transition-[border-color,background-color,box-shadow,color,opacity] duration-150 ${CHIP_FOCUS_CLASS}`;

const CHIP_HOVER_IDLE =
  'enabled:hover:border-[rgba(212,169,60,0.38)] enabled:hover:bg-[rgba(212,169,60,0.08)] enabled:hover:shadow-[0_0_16px_rgba(212,169,60,0.14)]';

const ADD_INPUT_CLASS =
  'min-w-0 flex-1 rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.05] px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[#D4A93C]/60 focus:shadow-[inset_0_0_20px_rgba(212,169,60,0.06)] focus:ring-1 focus:ring-[#D4A93C]/40';

/** Old combined labels (case-insensitive match) trimmed from hydrated extras */
const CHIP_EXTRAS_LEGACY_DEPRECATED = [
  'Career / Business',
  'Tech / AI',
  'Faith / Spirituality',
  'Self-Help / Education Courses',
  'Personal Growth / Mindset',
  'Health / Fitness',
  'Money / Investing',
  'Family / Parenting',
  'Relationships / Dating',
  'Style / Beauty',
  'Travel / Lifestyle',
  'Home / Design',
  'Food / Cooking',
  'Books & Reading',
] as const;

function normalizeChipCompare(s: string): string {
  return s.trim().toLowerCase();
}

function stringArraysEqualShallow(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export type ChipMultiSelectSectionProps = {
  heading: string;
  cue: string;
  predefined: readonly string[];
  selected: string[];
  onSelectedChange: (next: string[]) => void;
  extraChips: string[];
  onExtraChipsChange: (next: string[]) => void;
};

export default function ChipMultiSelectSection({
  heading,
  cue,
  predefined,
  selected,
  onSelectedChange,
  extraChips,
  onExtraChipsChange,
}: ChipMultiSelectSectionProps) {
  const baseId = useId();
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const predefinedNormSet = new Set((predefined as readonly string[]).map((p) => normalizeChipCompare(p)));
    const legacyNormSet = new Set(CHIP_EXTRAS_LEGACY_DEPRECATED.map((l) => normalizeChipCompare(l)));

    const seenExtraNorm = new Set<string>();
    const cleanedExtras: string[] = [];
    for (const e of extraChips) {
      const ne = normalizeChipCompare(e);
      if (predefinedNormSet.has(ne)) continue;
      if (legacyNormSet.has(ne)) continue;
      if (seenExtraNorm.has(ne)) continue;
      seenExtraNorm.add(ne);
      cleanedExtras.push(e);
    }

    const cleanedSelected = selected.filter((v) => {
      const nv = normalizeChipCompare(v);
      if (legacyNormSet.has(nv)) return false;
      if (predefinedNormSet.has(nv)) return true;
      return cleanedExtras.some((x) => normalizeChipCompare(x) === nv);
    });

    if (!stringArraysEqualShallow(cleanedExtras, extraChips)) {
      onExtraChipsChange(cleanedExtras);
    }
    if (!stringArraysEqualShallow(cleanedSelected, selected)) {
      onSelectedChange(cleanedSelected);
    }
  }, []);

  const chipOrder = useMemo(() => {
    const extrasOrdered = extraChips.filter((e) => !(predefined as readonly string[]).includes(e));
    return [...predefined, ...extrasOrdered];
  }, [predefined, extraChips]);

  const toggle = useCallback(
    (label: string) => {
      if (selected.includes(label)) {
        onSelectedChange(selected.filter((x) => x !== label));
        return;
      }
      if (selected.length >= CHIP_MAX) return;
      onSelectedChange([...selected, label]);
    },
    [selected, onSelectedChange]
  );

  const addCustom = useCallback(() => {
    const t = draft.trim();
    if (!t) return;
    const inPredefined = (predefined as readonly string[]).includes(t);
    if (!inPredefined && !extraChips.includes(t)) {
      onExtraChipsChange([...extraChips, t]);
    }
    if (selected.includes(t)) {
      setDraft('');
      return;
    }
    if (selected.length >= CHIP_MAX) {
      setDraft('');
      return;
    }
    onSelectedChange([...selected, t]);
    setDraft('');
  }, [draft, predefined, extraChips, selected, onSelectedChange, onExtraChipsChange]);

  const n = selected.length;

  return (
    <div
      className={`rounded-2xl border border-[rgba(212,169,60,0.18)] p-5 ${SECTION_BOX_SHADOW}`}
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 52%, ${MIDNIGHT_BOTTOM} 100%)`,
      }}
    >
      <section className="flex flex-col gap-3" aria-labelledby={`${baseId}-h`}>
        <div>
          <h3
            id={`${baseId}-h`}
            className="text-[17px] font-semibold tracking-wide"
            style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
          >
            {heading}
          </h3>
          <p className="mt-1 text-[13px] text-white/45" style={{ fontFamily: 'Inter, sans-serif' }}>
            {cue}
          </p>
          <p className="mt-1 text-[12px] text-white/35" style={{ fontFamily: 'Inter, sans-serif' }}>
            Select {CHIP_MIN} to {CHIP_MAX} chips. {n} selected.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {chipOrder.map((label) => {
            const isOn = selected.includes(label);
            const atMax = !isOn && selected.length >= CHIP_MAX;
            return (
              <button
                key={label}
                type="button"
                disabled={atMax}
                onClick={() => toggle(label)}
                className={`${CHIP_BASE_CLASS} ${isOn ? '' : CHIP_HOVER_IDLE}`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  borderColor: isOn ? 'rgba(212,169,60,0.55)' : 'rgba(255,255,255,0.12)',
                  background: isOn ? 'rgba(212,169,60,0.12)' : 'rgba(255,255,255,0.04)',
                  color: isOn ? 'rgba(250,248,255,0.95)' : 'rgba(240,235,255,0.82)',
                  cursor: atMax ? 'default' : 'pointer',
                  opacity: atMax ? 0.45 : 1,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div>
          <p
            className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/40"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Add your own
          </p>
          <div className="flex flex-wrap items-stretch gap-2">
            <input
              id={`${baseId}-add`}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustom();
                }
              }}
              className={ADD_INPUT_CLASS}
              placeholder="Type and press Enter or Add"
              autoComplete="off"
              aria-label="Add a custom chip"
            />
            <button
              type="button"
              onClick={addCustom}
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[rgba(212,169,60,0.35)] bg-[rgba(212,169,60,0.12)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-white/90 transition hover:border-[rgba(212,169,60,0.5)] hover:bg-[rgba(212,169,60,0.2)] hover:shadow-[0_0_14px_rgba(212,169,60,0.12)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Plus className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              Add
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
