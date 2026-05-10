/**
 * Audience Avatar profile shell: Step 1 profession, Step 2 demographics; later steps placeholders.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { fetchCurrentUserProfile, saveStep1Profession, saveStep2Demographics, saveStep3GoalsFears, updateProfileStep } from '../lib/profile';
import { useCampaignStore } from '../store/campaignStore';
import ChipMultiSelectSection from './ChipMultiSelectSection';
import HomeHeader from './HomeHeader';

const GOLD = '#D4A93C';
const MIDNIGHT = '#1A1F4A';
const MIDNIGHT_TOP = '#222A58';
const MIDNIGHT_BOTTOM = '#151A40';

const OFFER_MAX = 500;

/** Dropdown order: 10 defaults then Other. */
const PROFESSION_OPTIONS = [
  'Coach',
  'Consultant',
  'Course Creator',
  'Educator',
  'Service Provider',
  'Content Creator',
  'Author',
  'Speaker',
  'Affiliate Marketer',
  'Product Seller',
  'Other',
] as const;

const STANDARD_PROFESSIONS = PROFESSION_OPTIONS.slice(0, -1);
const OTHER_OPTION = 'Other' as const;

const DEMO_AGE_OPTIONS = ['18-24', '25-34', '35-44', '45-54', '55+'] as const;

const DEMO_GENDER_OPTIONS = ['Female', 'Male'] as const;

const DEMO_MARITAL_OPTIONS = ['Single', 'In a relationship', 'Married', 'Divorced'] as const;

const DEMO_CHILDREN_OPTIONS = ['No kids', 'Has young kids (under 12)', 'Has teens (13-17)', 'Has adult kids'] as const;

const DEMO_EDUCATION_OPTIONS = ['High school', 'College', 'Graduate degree', 'Other'] as const;

const DEMO_CAREER_STANDARD = [
  'Healthcare',
  'Education',
  'Tech',
  'Finance',
  'Corporate',
  'Creative',
  'Trades',
  'Service',
  'Self-employed',
  'Stay-at-home',
  'Retired',
] as const;

/** Shared "Other" branch label for Step 2 demographics (career + location). */
const DEMO_STEP2_OTHER_LABEL = 'Other' as const;

const DEMO_LOCATION_STANDARD = [
  'US',
  'Canada',
  'UK',
  'Europe',
  'Australia or NZ',
  'Asia',
  'Latin America',
  'Africa',
  'Middle East',
] as const;

const FORM_CARD_SHADOW = 'shadow-[0_12px_48px_rgba(10,10,26,0.45),0_4px_20px_rgba(212,169,60,0.06)]';

const INPUT_FOCUS_CLASSES =
  'focus:border-[#D4A93C]/60 focus:shadow-[inset_0_0_20px_rgba(212,169,60,0.06)] focus:ring-1 focus:ring-[#D4A93C]/40';

const SELECT_FIELD_CLASS = `w-full rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.05] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 ${INPUT_FOCUS_CLASSES}`;

const STEPS = [
  { id: 1, short: 'Your Profession' },
  { id: 2, short: 'Their Demographics' },
  { id: 3, short: 'Their Goals & Fears' },
  { id: 4, short: 'Their Interests' },
  { id: 5, short: 'Their Wants' },
] as const;

const STEP_BODY: Record<number, { title: string; body: string }> = {
  1: {
    title: 'Your Profession',
    body: "Let's start with you. What you do shapes who you can serve and how you talk to them.",
  },
  2: {
    title: 'Their Demographics',
    body: "Now we map your audience. Age, life stage, career, income - the foundation everything else sits on.",
  },
  3: {
    title: 'Their Goals & Fears',
    body: "What are they moving toward? What keeps them up at night? This is where content stops being generic.",
  },
  4: {
    title: 'Their Interests',
    body: "What do they engage with online? What content do they consume? Where do they spend their attention?",
  },
  5: {
    title: 'Their Wants',
    body: 'What do they crave - and just as important, what repels them? This protects your voice.',
  },
};

const RESET_CONFIRM_AUTO_COLLAPSE_MS = 5000;

const GOLD_DIM_RESET = 'rgba(212, 169, 60, 0.48)';
const GOLD_BRIGHT_RESET = 'rgba(212, 169, 60, 0.95)';

interface ProfileStepResetProps {
  confirmationOpen: boolean;
  interactionsLocked: boolean;
  onRequestResetClick: () => void;
  onCancelConfirmation: () => void;
  onConfirmReset: () => void | Promise<void>;
}

function ProfileStepReset({
  confirmationOpen,
  interactionsLocked,
  onRequestResetClick,
  onCancelConfirmation,
  onConfirmReset,
}: ProfileStepResetProps) {
  return (
    <div className="shrink-0 pt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
      {confirmationOpen ? (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => void onConfirmReset()}
            disabled={interactionsLocked}
            className="rounded-lg border-0 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{
              background: GOLD,
              color: MIDNIGHT,
              cursor: interactionsLocked ? 'default' : 'pointer',
              opacity: interactionsLocked ? 0.45 : 1,
            }}
          >
            CONFIRM RESET
          </button>
          <button
            type="button"
            onClick={onCancelConfirmation}
            disabled={interactionsLocked}
            className="border-0 bg-transparent px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors"
            style={{
              color: GOLD_DIM_RESET,
              cursor: interactionsLocked ? 'default' : 'pointer',
              opacity: interactionsLocked ? 0.35 : 1,
            }}
            onMouseEnter={(e) => {
              if (interactionsLocked) return;
              e.currentTarget.style.color = GOLD_BRIGHT_RESET;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = GOLD_DIM_RESET;
            }}
          >
            CANCEL
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onRequestResetClick}
          disabled={interactionsLocked}
          className="border-0 bg-transparent px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors"
          style={{
            color: GOLD_DIM_RESET,
            cursor: interactionsLocked ? 'default' : 'pointer',
            opacity: interactionsLocked ? 0.35 : 1,
          }}
          onMouseEnter={(e) => {
            if (interactionsLocked) return;
            e.currentTarget.style.color = GOLD_BRIGHT_RESET;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = GOLD_DIM_RESET;
          }}
        >
          RESET
        </button>
      )}
    </div>
  );
}

/** Step 3 predefined chips (replace with final copy from product spec as needed). */
const STEP3_GOALS_PREDEFINED = [
  'Financial stability',
  'More freedom and time',
  'Better health and energy',
  'Stronger relationships',
  'Career or business growth',
  'Confidence and clarity',
  'Recognition and respect',
  'Work-life balance',
  'A clear plan forward',
  'Peace of mind',
] as const;

const STEP3_FEARS_PREDEFINED = [
  'Not being enough',
  'Wasting time or money',
  'Judgment from others',
  'Falling behind peers',
  'Making the wrong decision',
  'Burnout or overwhelm',
  'Losing money or status',
  'Missing the right moment',
  'Public embarrassment',
  'Letting family down',
] as const;

const STEP3_DIALOGUE_PREDEFINED = [
  'I am not ready yet',
  'I do not have time',
  'I need to wait until it is perfect',
  'Everyone else is ahead of me',
  'What if this does not work',
  'I am not qualified to start',
  'I will look foolish trying',
  'I should figure it out alone first',
  'It is too late for me',
  'I will fail and regret it',
] as const;

function isStandardProfession(value: string): boolean {
  return (STANDARD_PROFESSIONS as readonly string[]).includes(value);
}

function hydrateProfessionFields(stored: string | null): { select: string; other: string } {
  const trimmed = stored?.trim() ?? '';
  if (!trimmed) return { select: '', other: '' };
  if (isStandardProfession(trimmed)) return { select: trimmed, other: '' };
  return { select: OTHER_OPTION, other: trimmed };
}

function hydrateDemographicsSelectWithOther(
  stored: string | null,
  standardOptions: readonly string[],
  otherLabel: typeof DEMO_STEP2_OTHER_LABEL
): { select: string; other: string } {
  const trimmed = stored?.trim() ?? '';
  if (!trimmed) return { select: '', other: '' };
  if ((standardOptions as readonly string[]).includes(trimmed)) return { select: trimmed, other: '' };
  if (trimmed === otherLabel) return { select: otherLabel, other: '' };
  return { select: otherLabel, other: trimmed };
}

function saveValueFromSelectWithOther(
  selectValue: string,
  otherText: string,
  otherLabel: typeof DEMO_STEP2_OTHER_LABEL
): string {
  if (selectValue === otherLabel) return otherText.trim();
  if (selectValue) return selectValue;
  return '';
}

/** If stored value equals one option exactly (after trim), return it; else empty. */
function matchDropdownHydration(stored: string | null, options: readonly string[]): string {
  const t = stored?.trim() ?? '';
  if (!t || !(options as readonly string[]).includes(t)) return '';
  return t;
}

/** Hydrate chip section: full selection list from DB; extras = selected items not in predefined pool. */
function hydrateChipSection(
  stored: string[] | null | undefined,
  predefined: readonly string[]
): { selected: string[]; extras: string[] } {
  const selected = (stored ?? []).map((s) => s.trim()).filter(Boolean);
  const pre = new Set(predefined as readonly string[]);
  const extras = selected.filter((s) => !pre.has(s));
  return { selected, extras };
}

interface FormDropdownProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  options: readonly string[];
  onChange: (next: string) => void;
}

function FormDropdown({ id, label, placeholder, value, options, onChange }: FormDropdownProps) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium tracking-wide" htmlFor={id} style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={SELECT_FIELD_CLASS}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1A1F4A] text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

const OTHER_TEXT_INPUT_CLASS = `w-full rounded-xl border border-[rgba(212,169,60,0.22)] bg-white/[0.05] px-4 py-3 text-base text-white outline-none transition placeholder:text-white/35 ${INPUT_FOCUS_CLASSES}`;

interface FormDropdownWithOtherProps {
  selectId: string;
  otherInputId: string;
  label: string;
  placeholder: string;
  otherFieldLabel: string;
  otherInputPlaceholder: string;
  standardOptions: readonly string[];
  otherOptionLabel: typeof DEMO_STEP2_OTHER_LABEL;
  selectValue: string;
  otherValue: string;
  onSelectChange: (v: string) => void;
  onOtherChange: (v: string) => void;
}

function FormDropdownWithOther({
  selectId,
  otherInputId,
  label,
  placeholder,
  otherFieldLabel,
  otherInputPlaceholder,
  standardOptions,
  otherOptionLabel,
  selectValue,
  otherValue,
  onSelectChange,
  onOtherChange,
}: FormDropdownWithOtherProps) {
  const combinedOptions = [...standardOptions, otherOptionLabel];
  return (
    <div>
      <label
        className="mb-2 block text-[13px] font-medium tracking-wide"
        htmlFor={selectId}
        style={{ color: GOLD, fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </label>
      <select
        id={selectId}
        value={selectValue}
        onChange={(e) => {
          const v = e.target.value;
          onSelectChange(v);
          if (v !== otherOptionLabel) onOtherChange('');
        }}
        className={SELECT_FIELD_CLASS}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {combinedOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1A1F4A] text-white">
            {opt}
          </option>
        ))}
      </select>
      {selectValue === otherOptionLabel ? (
        <div className="mt-4">
          <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor={otherInputId}>
            {otherFieldLabel}
          </label>
          <input
            id={otherInputId}
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            autoComplete="off"
            className={OTHER_TEXT_INPUT_CLASS}
            placeholder={otherInputPlaceholder}
          />
        </div>
      ) : null}
    </div>
  );
}

export interface ProfileFlowProps {
  onExitToGate?: () => void;
}

export default function ProfileFlow({ onExitToGate }: ProfileFlowProps) {
  const setCreatorProfession = useCampaignStore((s) => s.setCreatorProfession);
  const setCreatorOfferDescription = useCampaignStore((s) => s.setCreatorOfferDescription);
  const setAudienceAgeRange = useCampaignStore((s) => s.setAudienceAgeRange);
  const setAudienceGender = useCampaignStore((s) => s.setAudienceGender);
  const setAudienceMaritalStatus = useCampaignStore((s) => s.setAudienceMaritalStatus);
  const setAudienceChildren = useCampaignStore((s) => s.setAudienceChildren);
  const setAudienceEducation = useCampaignStore((s) => s.setAudienceEducation);
  const setAudienceCareerField = useCampaignStore((s) => s.setAudienceCareerField);
  const setAudienceLocation = useCampaignStore((s) => s.setAudienceLocation);
  const setAudienceGoals = useCampaignStore((s) => s.setAudienceGoals);
  const setAudienceFears = useCampaignStore((s) => s.setAudienceFears);
  const setAudienceInternalDialogue = useCampaignStore((s) => s.setAudienceInternalDialogue);

  const [hydrated, setHydrated] = useState(false);
  const [hydrateError, setHydrateError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [professionSelect, setProfessionSelect] = useState('');
  const [otherProfession, setOtherProfession] = useState('');
  const [offerDescription, setOfferDescription] = useState('');

  const [step1SaveError, setStep1SaveError] = useState<string | null>(null);
  const [step1Saving, setStep1Saving] = useState(false);

  const [demoAgeRange, setDemoAgeRange] = useState('');
  const [demoGender, setDemoGender] = useState('');
  const [demoMarital, setDemoMarital] = useState('');
  const [demoChildren, setDemoChildren] = useState('');
  const [demoEducation, setDemoEducation] = useState('');
  const [demoCareerSelect, setDemoCareerSelect] = useState('');
  const [otherCareerField, setOtherCareerField] = useState('');
  const [demoLocationSelect, setDemoLocationSelect] = useState('');
  const [otherLocationField, setOtherLocationField] = useState('');
  const [step2SaveError, setStep2SaveError] = useState<string | null>(null);
  const [step2Saving, setStep2Saving] = useState(false);

  const [goalsSelected, setGoalsSelected] = useState<string[]>([]);
  const [goalsExtraChips, setGoalsExtraChips] = useState<string[]>([]);
  const [fearsSelected, setFearsSelected] = useState<string[]>([]);
  const [fearsExtraChips, setFearsExtraChips] = useState<string[]>([]);
  const [dialogueSelected, setDialogueSelected] = useState<string[]>([]);
  const [dialogueExtraChips, setDialogueExtraChips] = useState<string[]>([]);
  const [step3SaveError, setStep3SaveError] = useState<string | null>(null);
  const [step3Saving, setStep3Saving] = useState(false);

  const [resetConfirmationOpen, setResetConfirmationOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const p = await fetchCurrentUserProfile();
        if (cancelled) return;
        const raw = p?.profile_last_step;
        const n = typeof raw === 'number' && raw >= 1 && raw <= 5 ? raw : 1;
        setCurrentStep(n);
        if (p) {
          const { select, other } = hydrateProfessionFields(p.creator_profession);
          setProfessionSelect(select);
          setOtherProfession(other);
          setOfferDescription(p.creator_offer_description ?? '');
          setDemoAgeRange(matchDropdownHydration(p.audience_age_range, DEMO_AGE_OPTIONS));
          setDemoGender(matchDropdownHydration(p.audience_gender, DEMO_GENDER_OPTIONS));
          setDemoMarital(matchDropdownHydration(p.audience_marital_status, DEMO_MARITAL_OPTIONS));
          setDemoChildren(matchDropdownHydration(p.audience_children, DEMO_CHILDREN_OPTIONS));
          setDemoEducation(matchDropdownHydration(p.audience_education, DEMO_EDUCATION_OPTIONS));
          const careerH = hydrateDemographicsSelectWithOther(p.audience_career_field, DEMO_CAREER_STANDARD, DEMO_STEP2_OTHER_LABEL);
          setDemoCareerSelect(careerH.select);
          setOtherCareerField(careerH.other);
          const locH = hydrateDemographicsSelectWithOther(p.audience_location, DEMO_LOCATION_STANDARD, DEMO_STEP2_OTHER_LABEL);
          setDemoLocationSelect(locH.select);
          setOtherLocationField(locH.other);
          const g = hydrateChipSection(p.audience_goals, STEP3_GOALS_PREDEFINED);
          setGoalsSelected(g.selected);
          setGoalsExtraChips(g.extras);
          const f = hydrateChipSection(p.audience_fears, STEP3_FEARS_PREDEFINED);
          setFearsSelected(f.selected);
          setFearsExtraChips(f.extras);
          const d = hydrateChipSection(p.audience_internal_dialogue, STEP3_DIALOGUE_PREDEFINED);
          setDialogueSelected(d.selected);
          setDialogueExtraChips(d.extras);
        }
      } catch (e) {
        if (!cancelled) setHydrateError(e instanceof Error ? e.message : 'Could not load profile.');
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setResetConfirmationOpen(false);
  }, [currentStep]);

  useEffect(() => {
    if (!resetConfirmationOpen) return;
    const tid = window.setTimeout(() => {
      setResetConfirmationOpen(false);
    }, RESET_CONFIRM_AUTO_COLLAPSE_MS);
    return () => window.clearTimeout(tid);
  }, [resetConfirmationOpen]);

  const professionToSave = useMemo(() => {
    if (professionSelect === OTHER_OPTION) return otherProfession.trim();
    if (professionSelect) return professionSelect;
    return '';
  }, [professionSelect, otherProfession]);

  const step1FormValid = useMemo(() => {
    if (!professionSelect) return false;
    if (professionSelect === OTHER_OPTION && otherProfession.trim().length < 1) return false;
    if (offerDescription.trim().length < 1) return false;
    return true;
  }, [professionSelect, otherProfession, offerDescription]);

  const careerFieldToSave = useMemo(
    () => saveValueFromSelectWithOther(demoCareerSelect, otherCareerField, DEMO_STEP2_OTHER_LABEL),
    [demoCareerSelect, otherCareerField]
  );

  const locationToSave = useMemo(
    () => saveValueFromSelectWithOther(demoLocationSelect, otherLocationField, DEMO_STEP2_OTHER_LABEL),
    [demoLocationSelect, otherLocationField]
  );

  const step2FormValid = useMemo(() => {
    if (!demoAgeRange || !demoGender || !demoMarital || !demoChildren || !demoEducation) return false;
    if (!demoCareerSelect || !demoLocationSelect) return false;
    if (demoCareerSelect === DEMO_STEP2_OTHER_LABEL && otherCareerField.trim().length < 1) return false;
    if (demoLocationSelect === DEMO_STEP2_OTHER_LABEL && otherLocationField.trim().length < 1) return false;
    if (!careerFieldToSave || !locationToSave) return false;
    return true;
  }, [
    demoAgeRange,
    demoGender,
    demoMarital,
    demoChildren,
    demoEducation,
    demoCareerSelect,
    otherCareerField,
    demoLocationSelect,
    otherLocationField,
    careerFieldToSave,
    locationToSave,
  ]);

  const step3FormValid = useMemo(() => {
    const band = (arr: string[]) => arr.length >= 3 && arr.length <= 5;
    return band(goalsSelected) && band(fearsSelected) && band(dialogueSelected);
  }, [goalsSelected, fearsSelected, dialogueSelected]);

  const persistStep = useCallback(async (step: number) => {
    try {
      await updateProfileStep(step);
    } catch (err) {
      console.error('updateProfileStep failed:', err);
    }
  }, []);

  const goNext = useCallback(() => {
    if (currentStep >= 5) return;
    const next = currentStep + 1;
    setCurrentStep(next);
    void persistStep(next);
  }, [currentStep, persistStep]);

  const goBack = useCallback(() => {
    if (currentStep <= 1) {
      onExitToGate?.();
      return;
    }
    const prev = currentStep - 1;
    setCurrentStep(prev);
    void persistStep(prev);
  }, [currentStep, onExitToGate, persistStep]);

  const handleStep1Continue = useCallback(async () => {
    if (!step1FormValid || step1Saving) return;
    const prof = professionToSave;
    const offer = offerDescription.slice(0, OFFER_MAX).trim();
    if (!prof || offer.length < 1) return;

    setStep1SaveError(null);
    setStep1Saving(true);
    try {
      setCreatorProfession(prof);
      setCreatorOfferDescription(offer);
      await saveStep1Profession(prof, offer);
      await updateProfileStep(2);
      setCurrentStep(2);
    } catch {
      setStep1SaveError("Couldn't save. Please try again.");
    } finally {
      setStep1Saving(false);
    }
  }, [
    step1FormValid,
    step1Saving,
    professionToSave,
    offerDescription,
    setCreatorProfession,
    setCreatorOfferDescription,
  ]);

  const handleStep2Continue = useCallback(async () => {
    if (!step2FormValid || step2Saving) return;
    const careerField = careerFieldToSave;
    const location = locationToSave;
    if (!careerField || !location) return;
    setStep2SaveError(null);
    setStep2Saving(true);
    const values = {
      ageRange: demoAgeRange,
      gender: demoGender,
      maritalStatus: demoMarital,
      children: demoChildren,
      education: demoEducation,
      careerField,
      location,
    };
    try {
      setAudienceAgeRange(values.ageRange);
      setAudienceGender(values.gender);
      setAudienceMaritalStatus(values.maritalStatus);
      setAudienceChildren(values.children);
      setAudienceEducation(values.education);
      setAudienceCareerField(values.careerField);
      setAudienceLocation(values.location);
      await saveStep2Demographics(values);
      await updateProfileStep(3);
      setCurrentStep(3);
    } catch {
      setStep2SaveError("Couldn't save. Please try again.");
    } finally {
      setStep2Saving(false);
    }
  }, [
    step2FormValid,
    step2Saving,
    careerFieldToSave,
    locationToSave,
    demoAgeRange,
    demoGender,
    demoMarital,
    demoChildren,
    demoEducation,
    demoCareerSelect,
    otherCareerField,
    demoLocationSelect,
    otherLocationField,
    setAudienceAgeRange,
    setAudienceGender,
    setAudienceMaritalStatus,
    setAudienceChildren,
    setAudienceEducation,
    setAudienceCareerField,
    setAudienceLocation,
  ]);

  const handleStep3Continue = useCallback(async () => {
    if (!step3FormValid || step3Saving) return;
    const goals = goalsSelected;
    const fears = fearsSelected;
    const internalDialogue = dialogueSelected;
    setStep3SaveError(null);
    setStep3Saving(true);
    try {
      setAudienceGoals(goals);
      setAudienceFears(fears);
      setAudienceInternalDialogue(internalDialogue);
      await saveStep3GoalsFears({ goals, fears, internalDialogue });
      await updateProfileStep(4);
      setCurrentStep(4);
    } catch {
      setStep3SaveError("Couldn't save. Please try again.");
    } finally {
      setStep3Saving(false);
    }
  }, [
    step3FormValid,
    step3Saving,
    goalsSelected,
    fearsSelected,
    dialogueSelected,
    setAudienceGoals,
    setAudienceFears,
    setAudienceInternalDialogue,
  ]);

  const continueDisabled =
    currentStep >= 5 ||
    (currentStep === 1 && (!step1FormValid || step1Saving)) ||
    (currentStep === 2 && (!step2FormValid || step2Saving)) ||
    (currentStep === 3 && (!step3FormValid || step3Saving));

  const handleContinueClick = useCallback(() => {
    if (currentStep === 1) {
      void handleStep1Continue();
      return;
    }
    if (currentStep === 2) {
      void handleStep2Continue();
      return;
    }
    if (currentStep === 3) {
      void handleStep3Continue();
      return;
    }
    goNext();
  }, [currentStep, handleStep1Continue, handleStep2Continue, handleStep3Continue, goNext]);

  const stepSaveInFlight = step1Saving || step2Saving || step3Saving;

  const handleConfirmStepReset = useCallback(async () => {
    setResetConfirmationOpen(false);

    const step = currentStep;
    if (step === 4 || step === 5) return;

    const emptyDemographics = {
      ageRange: '',
      gender: '',
      maritalStatus: '',
      children: '',
      education: '',
      careerField: '',
      location: '',
    };

    if (step === 1) {
      setStep1SaveError(null);
      setProfessionSelect('');
      setOtherProfession('');
      setOfferDescription('');
      setCreatorProfession('');
      setCreatorOfferDescription('');
      try {
        await saveStep1Profession('', '');
      } catch {
        setStep1SaveError("Couldn't reset. Try again.");
      }
      return;
    }

    if (step === 2) {
      setStep2SaveError(null);
      setDemoAgeRange('');
      setDemoGender('');
      setDemoMarital('');
      setDemoChildren('');
      setDemoEducation('');
      setDemoCareerSelect('');
      setOtherCareerField('');
      setDemoLocationSelect('');
      setOtherLocationField('');
      setAudienceAgeRange('');
      setAudienceGender('');
      setAudienceMaritalStatus('');
      setAudienceChildren('');
      setAudienceEducation('');
      setAudienceCareerField('');
      setAudienceLocation('');
      try {
        await saveStep2Demographics(emptyDemographics);
      } catch {
        setStep2SaveError("Couldn't reset. Try again.");
      }
      return;
    }

    if (step === 3) {
      setStep3SaveError(null);
      setGoalsSelected([]);
      setGoalsExtraChips([]);
      setFearsSelected([]);
      setFearsExtraChips([]);
      setDialogueSelected([]);
      setDialogueExtraChips([]);
      setAudienceGoals([]);
      setAudienceFears([]);
      setAudienceInternalDialogue([]);
      try {
        await saveStep3GoalsFears({ goals: [], fears: [], internalDialogue: [] });
      } catch {
        setStep3SaveError("Couldn't reset. Try again.");
      }
    }
  }, [
    currentStep,
    setCreatorProfession,
    setCreatorOfferDescription,
    setAudienceAgeRange,
    setAudienceGender,
    setAudienceMaritalStatus,
    setAudienceChildren,
    setAudienceEducation,
    setAudienceCareerField,
    setAudienceLocation,
    setAudienceGoals,
    setAudienceFears,
    setAudienceInternalDialogue,
  ]);

  if (!hydrated) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <p className="text-sm text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
          Loading profile...
        </p>
      </div>
    );
  }

  if (hydrateError) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{
          background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
        }}
      >
        <p className="max-w-md text-center text-sm text-white/75" style={{ fontFamily: 'Inter, sans-serif' }}>
          {hydrateError}
        </p>
      </div>
    );
  }

  const copy = STEP_BODY[currentStep];
  const offerLen = offerDescription.length;

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 48%, ${MIDNIGHT_BOTTOM} 100%)`,
      }}
    >
      <HomeHeader />

      <div className="flex flex-1 flex-col pt-[72px] md:pt-20">
        <div className="border-b border-[rgba(212,169,60,0.12)] px-4 py-3 text-center md:hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span className="text-[13px] tracking-wide text-white/55">
            Step {currentStep} of 5
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <aside
            className="hidden w-[280px] shrink-0 flex-col border-[rgba(212,169,60,0.12)] py-8 pl-6 pr-4 md:flex md:border-r"
            style={{ paddingTop: '28px' }}
          >
            <p
              className="mb-6 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(212,169,60,0.45)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Steps
            </p>
            <nav className="flex flex-col gap-1">
              {STEPS.map((s) => {
                const done = currentStep > s.id;
                const active = currentStep === s.id;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                    style={{
                      background: active ? 'rgba(212,169,60,0.08)' : 'transparent',
                    }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        background: done ? GOLD : 'transparent',
                        border: done ? 'none' : '1px solid rgba(212,169,60,0.35)',
                        color: done ? MIDNIGHT : active ? GOLD : 'rgba(212,169,60,0.45)',
                      }}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> : s.id}
                    </div>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: active ? 700 : 600,
                        color: active ? GOLD : 'rgba(255,255,255,0.96)',
                      }}
                    >
                      {s.short}
                    </span>
                  </div>
                );
              })}
            </nav>
          </aside>

          <main className="flex min-h-0 flex-1 flex-col px-5 pb-32 pt-8 md:px-10 md:pb-36 md:pt-10">
            <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <h1
                  className="text-[clamp(26px,4vw,34px)] font-normal tracking-[-0.02em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}
                >
                  {copy.title}
                </h1>

                {currentStep >= 4 ? (
                  <span
                    className="inline-block self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      borderColor: 'rgba(212,169,60,0.35)',
                      color: 'rgba(212,169,60,0.85)',
                    }}
                  >
                    Coming in A4
                  </span>
                ) : null}
              </div>
              <ProfileStepReset
                confirmationOpen={resetConfirmationOpen}
                interactionsLocked={stepSaveInFlight}
                onRequestResetClick={() => setResetConfirmationOpen(true)}
                onCancelConfirmation={() => setResetConfirmationOpen(false)}
                onConfirmReset={handleConfirmStepReset}
              />
            </div>

            <p className="max-w-2xl text-[15px] leading-relaxed text-white/75" style={{ fontFamily: 'Inter, sans-serif' }}>
              {copy.body}
            </p>

            <div
              className={`mt-10 min-h-[120px] flex-1 rounded-2xl border border-[rgba(212,169,60,0.18)] p-6 ${FORM_CARD_SHADOW}`}
              style={{
                fontFamily: 'Inter, sans-serif',
                background: `linear-gradient(180deg, ${MIDNIGHT_TOP} 0%, ${MIDNIGHT} 52%, ${MIDNIGHT_BOTTOM} 100%)`,
              }}
            >
              {currentStep === 1 ? (
                <div className="flex max-w-xl flex-col gap-8">
                  <div>
                    <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="profession-select">
                      What do you do?
                    </label>
                    <select
                      id="profession-select"
                      value={professionSelect}
                      onChange={(e) => {
                        setProfessionSelect(e.target.value);
                        if (e.target.value !== OTHER_OPTION) setOtherProfession('');
                      }}
                      className={SELECT_FIELD_CLASS}
                    >
                      <option value="" disabled>
                        Select your profession
                      </option>
                      {PROFESSION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1A1F4A] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {professionSelect === OTHER_OPTION ? (
                      <div className="mt-4">
                        <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="profession-other">
                          Describe your profession
                        </label>
                        <input
                          id="profession-other"
                          type="text"
                          value={otherProfession}
                          onChange={(e) => setOtherProfession(e.target.value)}
                          autoComplete="off"
                          className={OTHER_TEXT_INPUT_CLASS}
                          placeholder="Describe your profession"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-medium tracking-wide text-white/60" htmlFor="offer-desc">
                      What do you sell or offer?
                    </label>
                    <p className="mb-2 text-[13px] text-white/45">Describe what your audience gets from you. One or two sentences is enough.</p>
                    <div className="relative">
                      <textarea
                        id="offer-desc"
                        rows={3}
                        maxLength={OFFER_MAX}
                        value={offerDescription}
                        onChange={(e) => setOfferDescription(e.target.value.slice(0, OFFER_MAX))}
                        className={`${SELECT_FIELD_CLASS} resize-y pb-9 leading-relaxed`}
                        placeholder="Tell us what you offer"
                      />
                      <div className="pointer-events-none absolute bottom-3 right-3 text-[11px] text-white/35">
                        {offerLen} / {OFFER_MAX}
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentStep === 2 ? (
                <div className="flex max-w-xl flex-col gap-8">
                  <FormDropdown
                    id="demo-age"
                    label="What age range is your audience?"
                    placeholder="Select age range"
                    value={demoAgeRange}
                    onChange={setDemoAgeRange}
                    options={DEMO_AGE_OPTIONS}
                  />
                  <FormDropdown
                    id="demo-gender"
                    label="What gender is your audience?"
                    placeholder="Select gender"
                    value={demoGender}
                    onChange={setDemoGender}
                    options={DEMO_GENDER_OPTIONS}
                  />
                  <FormDropdown
                    id="demo-marital"
                    label="What's their relationship status?"
                    placeholder="Select relationship status"
                    value={demoMarital}
                    onChange={setDemoMarital}
                    options={DEMO_MARITAL_OPTIONS}
                  />
                  <FormDropdown
                    id="demo-children"
                    label="Do they have kids?"
                    placeholder="Select"
                    value={demoChildren}
                    onChange={setDemoChildren}
                    options={DEMO_CHILDREN_OPTIONS}
                  />
                  <FormDropdown
                    id="demo-education"
                    label="What's their education level?"
                    placeholder="Select education level"
                    value={demoEducation}
                    onChange={setDemoEducation}
                    options={DEMO_EDUCATION_OPTIONS}
                  />
                  <FormDropdownWithOther
                    selectId="demo-career-select"
                    otherInputId="demo-career-other"
                    label="What field do they work in?"
                    placeholder="Select career field"
                    otherFieldLabel="Describe their field"
                    otherInputPlaceholder="Describe their field"
                    standardOptions={DEMO_CAREER_STANDARD}
                    otherOptionLabel={DEMO_STEP2_OTHER_LABEL}
                    selectValue={demoCareerSelect}
                    otherValue={otherCareerField}
                    onSelectChange={setDemoCareerSelect}
                    onOtherChange={setOtherCareerField}
                  />
                  <FormDropdownWithOther
                    selectId="demo-location-select"
                    otherInputId="demo-location-other"
                    label="Where are they based?"
                    placeholder="Select location"
                    otherFieldLabel="Describe their location"
                    otherInputPlaceholder="Describe their location"
                    standardOptions={DEMO_LOCATION_STANDARD}
                    otherOptionLabel={DEMO_STEP2_OTHER_LABEL}
                    selectValue={demoLocationSelect}
                    otherValue={otherLocationField}
                    onSelectChange={setDemoLocationSelect}
                    onOtherChange={setOtherLocationField}
                  />
                </div>
              ) : currentStep === 3 ? (
                <div className="flex max-w-2xl flex-col gap-10">
                  <ChipMultiSelectSection
                    heading="What are they working toward?"
                    cue="The outcomes they want."
                    predefined={STEP3_GOALS_PREDEFINED}
                    selected={goalsSelected}
                    onSelectedChange={setGoalsSelected}
                    extraChips={goalsExtraChips}
                    onExtraChipsChange={setGoalsExtraChips}
                  />
                  <ChipMultiSelectSection
                    heading="What are they afraid of?"
                    cue="The worries underneath the surface."
                    predefined={STEP3_FEARS_PREDEFINED}
                    selected={fearsSelected}
                    onSelectedChange={setFearsSelected}
                    extraChips={fearsExtraChips}
                    onExtraChipsChange={setFearsExtraChips}
                  />
                  <ChipMultiSelectSection
                    heading="What do they tell themselves?"
                    cue="The voice in their head."
                    predefined={STEP3_DIALOGUE_PREDEFINED}
                    selected={dialogueSelected}
                    onSelectedChange={setDialogueSelected}
                    extraChips={dialogueExtraChips}
                    onExtraChipsChange={setDialogueExtraChips}
                  />
                </div>
              ) : (
                <p className="text-sm text-white/50">Form arrives in A4. For now, use Continue to explore the shell.</p>
              )}
            </div>
          </main>
        </div>
      </div>

      <footer
        className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-stretch border-t border-[rgba(212,169,60,0.12)] px-5 py-4 md:px-10"
        style={{ background: 'rgba(26,31,74,0.96)' }}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            className="rounded-lg border-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: GOLD,
              color: MIDNIGHT,
              cursor: 'pointer',
              opacity: 1,
              boxShadow: '0 8px 28px rgba(212,169,60,0.35)',
            }}
          >
            {'<- Back'}
          </button>
          <button
            type="button"
            onClick={handleContinueClick}
            className="rounded-lg border-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: GOLD,
              color: MIDNIGHT,
              cursor: continueDisabled ? 'default' : 'pointer',
              opacity: continueDisabled ? 0.45 : 1,
              boxShadow: continueDisabled ? 'none' : '0 8px 28px rgba(212,169,60,0.35)',
            }}
            disabled={continueDisabled}
          >
            {'Continue ->'}
          </button>
        </div>
        {(currentStep === 1 && step1SaveError) ||
        (currentStep === 2 && step2SaveError) ||
        (currentStep === 3 && step3SaveError) ? (
          <p className="mt-3 text-center text-[13px] text-red-300/90" style={{ fontFamily: 'Inter, sans-serif' }}>
            {currentStep === 1 ? step1SaveError : currentStep === 2 ? step2SaveError : step3SaveError}
          </p>
        ) : null}
      </footer>
    </div>
  );
}
