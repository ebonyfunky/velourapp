/**
 * Reusable chip multi-select with predefined pool plus custom chips (Velour Audience Avatar).
 */
import { useCallback, useId, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

const GOLD = '#D4A93C';

const CHIP_MIN = 3;
const CHIP_MAX = 5;

const CHIP_BASE_CLASS =
  'rounded-full border px-3.5 py-2 text-left text-[14px] leading-snug transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,169,60,0.45)]';

const ADD_INPUT_CLASS =
  'min-w-0 flex-1 rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.06] px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/35 focus:border-[rgba(212,169,60,0.65)] focus:ring-1 focus:ring-[rgba(212,169,60,0.35)]';

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
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggle(label)}
              className={CHIP_BASE_CLASS}
              style={{
                fontFamily: 'Inter, sans-serif',
                borderColor: isOn ? 'rgba(212,169,60,0.55)' : 'rgba(255,255,255,0.12)',
                background: isOn ? 'rgba(212,169,60,0.12)' : 'rgba(255,255,255,0.04)',
                color: isOn ? 'rgba(250,248,255,0.95)' : 'rgba(240,235,255,0.82)',
                cursor: !isOn && selected.length >= CHIP_MAX ? 'default' : 'pointer',
                opacity: !isOn && selected.length >= CHIP_MAX ? 0.45 : 1,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
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
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[rgba(212,169,60,0.35)] bg-[rgba(212,169,60,0.12)] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-white/90 transition hover:bg-[rgba(212,169,60,0.18)]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Plus className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            Add
          </button>
        </div>
      </div>
    </section>
  );
}
