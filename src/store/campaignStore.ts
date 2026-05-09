import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Currency, ContentStyle } from '../types';

export type GenerationHistoryItem = {
  id: string;
  type: string;
  platform: string;
  content: string;
  createdAt: string;
};

export interface CampaignStore {
  // Step 1
  creatorName: string;
  brandName: string;
  contentCategory: string;
  contentLanguage: string;
  platformTargets: string[];
  campaignGoals: string[];

  // Step 1 - Avatar
  avatarRealPerson: string;
  avatarCurrently: string;
  avatarFeels: string;
  avatarFrustratedBy: string;
  avatarAlreadyTried: string;
  avatarBiggestFear: string;
  avatarSecretHope: string;
  avatarVoice: string;
  guidedFeeling: string;
  guidedWish: string;
  guidedBarrier: string;
  avatarFeelBlank: string;
  avatarWantBlank: string;
  avatarTiredOfBlank: string;

  // Step 2 - AI Twin Studio (Vibe & Persona)
  selectedVibe: string;
  selectedPersona: string;

  // Step 3
  productName: string;
  productType: string;
  pricePoint: string;
  currency: Currency;
  benefits: string[];
  usp: string;
  targetAudience: string;
  painPoint: string;
  desiredOutcome: string;

  // Step 4 (now Script Generator)
  scriptFormat: string;
  viralFormula: string;
  scriptAngle: string;
  tone: string[];
  platformOptimisation: string;
  contentStyle: ContentStyle;
  selectedCTA: string;
  customCTAs: string[];
  generatedScripts: Array<{
    version: number;
    hook: string;
    body: string;
    cta: string;
    hookScore: number;
    formula: string;
    wordCount: number;
  }>;

  // Step 6
  postsPerWeek: number;
  campaignDuration: string;
  startDate: string;
  timezone: string;
  calendarPosts: Array<{
    id: string;
    date: string;
    platform: string;
    sceneThumb: string;
    hookSnippet: string;
    time: string;
    status: string;
  }>;

  // Step 7 - Live Show Planner (legacy fields retained for persisted state)
  liveScript: string;
  isGeneratingLive: boolean;
  ugcNicheResult: string;
  ugcNicheAnswers: Record<string, string>;
  ugcBio: string;
  ugcExperience: string;
  ugcNiche: string;
  ugcStyle: string;
  ugcAchievement: string;
  ugcAddOns: string[];
  ugcChecklist: string[];

  // Creator Mode
  creatorMode: string;

  // Supabase auth (never persisted — Supabase stores the session separately)
  session: Session | null;
  authLoading: boolean;
  authError: string | null;

  // Velour setup (Profession, Audience, Voice)
  profession: string;
  professionOther: string;
  audienceDescription: string;
  audiencePain: string;
  audiencePainOther: string;
  audienceWant: string;
  audienceWantOther: string;
  voice: string;
  generationHistory: GenerationHistoryItem[];
  setupComplete: boolean;

  // Velour customer-clarity profile (Tony's framework)
  customerWho: string;
  customerBeforeState: string;
  customerAfterState: string;
  customerSurfaceProblem: string;
  customerRealProblem: string;
  customerLanguageUses: string[];
  customerLanguageAvoids: string[];
  customerAwarenessStage: 'unaware' | 'problem' | 'solution' | 'most' | '';
  customerSummary: string;
  profileCompletedAt: string | null;
  profileLastStep: number;

  // Affiliate Product Fields
  affiliateBrandName: string;
  affiliatePlatform: string;
  affiliateLink: string;
  affiliateCommission: string;

  // Digital Product Fields
  digitalProductContents: string;
  digitalProductAudience: string;
  digitalProductTransformation: string;
  digitalProductDelivery: string;
  digitalProductValueStack: string;

  // UGC Hub Fields
  ugcPortfolioCount: number;
  ugcPitchesSent: number;
  ugcBrandName: string;
  ugcProductName: string;
  ugcProductCategory: string;
  ugcProductBenefit: string;
  ugcTargetCustomer: string;
  ugcDesiredAction: string;
  ugcScriptFormat: string;
  ugcScriptLength: string;
  ugcCTA: string;
  ugcGeneratedScripts: string;
  ugcCurrentSection: string;
  ugcRatePerVideo: string;
  ugcPortfolioChecklist: string[];
  ugcPitches: Array<{ id: string; brandName: string; date: string; platform: string; status: string }>;
  ugcSelectedNiche: string;
  ugcNicheQ1: string[];
  ugcNicheQ2: string[];
  ugcNicheQ3: string[];
  ugcNicheQ4: string;
  ugcNicheQ5: string;

  // Rate Card Fields
  rateCardCreatorName: string;
  rateCardCreatorTitle: string;
  rateCardEmail: string;
  rateCardPortfolioLink: string;
  rateCardProfilePhoto: string;
  rateCardPortfolioPieces: string;
  rateCardContentRates: Array<{
    id: string;
    label: string;
    rate: string;
    enabled: boolean;
  }>;
  rateCardCustomRates: Array<{
    id: string;
    name: string;
    rate: string;
  }>;
  rateCardPackages: Array<{
    id: string;
    name: string;
    price: string;
    description: string;
    isMostPopular: boolean;
  }>;
  rateCardAddOns: Array<{
    id: string;
    name: string;
    price: string;
    enabled: boolean;
  }>;
  rateCardContactMethods: Array<{
    id: string;
    type: 'email' | 'instagram' | 'tiktok' | 'youtube' | 'website' | 'portfolio' | 'whatsapp' | 'custom';
    value: string;
    label?: string;
  }>;
  rateCardTurnaround: string;
  rateCardRevisions: string;
  rateCardValidUntil: string;
  rateCardConnectHeading: string;

  // Portfolio Builder Fields
  portfolioVideos: Array<{
    id: string;
    type: string;
    completed: boolean;
    link: string;
  }>;
  portfolioLinks: Array<{
    id: string;
    platform: string;
    link: string;
    videoType: string;
  }>;
  portfolioNiche: string;
  portfolioAvailability: string;

  // Brand Outreach Fields
  outreachPitches: Array<{
    id: string;
    brandName: string;
    platform: string;
    datePitched: string;
    status: string;
    notes: string;
  }>;
  outreachChallengeStartDate: string;

  // Sustainable Income Fields
  incomeRatePerVideo: string;
  incomeVideosPerDeal: string;
  incomeDealsPerMonth: string;

  // Mindset Fields
  dailyCheckboxes: {
    creatorAction: boolean;
    sentPitch: boolean;
    brandEngagement: boolean;
    contentCreated: boolean;
    checkedNumbers: boolean;
  };
  lastCheckboxReset: string;
  wins: Array<{
    id: string;
    text: string;
    date: string;
  }>;
  milestones: {
    firstPitch: boolean;
    firstReply: boolean;
    firstDeal: boolean;
    firstDelivery: boolean;
    firstPayment: boolean;
    firstRateRaise: boolean;
    firstRetainer: boolean;
    first500Month: boolean;
    first1kMonth: boolean;
    first3kMonth: boolean;
  };

  // Script Studio Fields
  scriptStudioBrandName: string;
  scriptStudioProductName: string;
  scriptStudioKeyBenefit: string;
  scriptStudioTargetAudience: string;
  scriptStudioTone: string;
  scriptStudioVideoLength: string;
  scriptStudioFormat: string;
  scriptStudioGeneratedScript: {
    hook: string;
    body: string;
    ctas: {
      soft: string;
      medium: string;
      strong: string;
    };
    sceneDirection: string;
    estimatedReadTime: string;
  } | null;
  scriptStudioSavedScripts: Array<{
    id: string;
    brandName: string;
    productName: string;
    format: string;
    hook: string;
    body: string;
    ctas: {
      soft: string;
      medium: string;
      strong: string;
    };
    sceneDirection: string;
    estimatedReadTime: string;
    savedAt: string;
  }>;
  scriptStudioIsGenerating: boolean;

  // Action Plan Fields
  actionPlanCompletedDays: number[];
  actionPlanStartDate: string;

  // Portfolio Script Builder Fields
  portfolioScriptCategory: string;
  portfolioScriptProduct: string;
  portfolioScriptVideoType: string;
  portfolioScriptStyle: string;
  portfolioScriptVideoLength: string;
  portfolioScripts: Array<{
    id: string;
    category: string;
    product: string;
    videoType: string;
    style: string;
    videoLength: string;
    isFaceForward: boolean;
    hooks: string[];
    script: string;
    ctas: { soft: string; medium: string; strong: string };
    checklist: string[];
    confidenceNote: string;
    date: string;
    completed: boolean;
  }>;

  // Creator Introduction Fields
  introCreatorName: string;
  introContentNiche: string;
  introContentStyle: string;
  introWhatMakesDifferent: string;
  introVideoUploaded: boolean;
  introVideoLink: string;
  introVideoPlatform: string;
  introVideoFileName: string;

  // Pitch Video Fields
  pitchVideoUploaded: boolean;
  pitchVideoLink: string;
  pitchVideoPlatform: string;
  pitchVideoFileName: string;

  // Banner Dismissed States
  portfolioPhotosBannerDismissed: boolean;

  // Portfolio Media Fields
  portfolioPhotos: Array<{
    id: string;
    url: string;
    photoType: string;
    productName: string;
  }>;
  portfolioVideoLinks: Array<{
    id: string;
    link: string;
    platform: string;
    videoType: string;
    productName: string;
    notes: string;
    isFaceForward: boolean;
    fileName?: string;
  }>;
  portfolioActiveTab: 'photos' | 'videos';
  portfolioVideosTabState: 'script-builder' | 'my-videos';
  portfolioVideosDefaultTab: 'script-builder' | 'my-videos' | null;
  portfolioLink: string;
  portfolioBioCompleted: boolean;
  portfolioRateCardCompleted: boolean;
  portfolioStatement: string;
  toastMessage: string | null;
  toastVisible: boolean;

  // CapCut Editing Checklist
  capcutChecklistCompleted: string[];

  // Before You Record Cards
  beforeRecordCardsExpanded: Record<string, boolean>;

  // Income Command Centre
  deals: Array<{
    id: string;
    brandName: string;
    niche: string;
    platform: string;
    dealType: string;
    numberOfVideos: number;
    dealValue: number;
    usageRights: string;
    deadline: string;
    paymentStatus: string;
    notes: string;
    dateCreated: string;
    invoiceDate: string;
    chaseStatus: string;
  }>;
  monthlyIncomeGoal: number;
  nextMonthIncomeGoal: number;
  sixMonthIncomeGoal: number;

  // Global Search
  recentSearches: string[];

  // Gear guide card expansion (unused in current shell; kept for migration)
  gearCardExpanded: {
    email: boolean;
    phone: boolean;
    lighting: boolean;
    tripod: boolean;
    microphone: boolean;
    teleprompter: boolean;
    capcut: boolean;
  };

  // Actions
  setField: (field: string, value: any) => void;
  setLiveScript: (script: string) => void;
  setIsGeneratingLive: (val: boolean) => void;
  updateStep1: (data: Partial<Pick<CampaignStore, 'creatorName' | 'brandName' | 'contentCategory' | 'contentLanguage' | 'platformTargets' | 'campaignGoals'>>) => void;
  updateStep2: (data: Partial<Pick<CampaignStore, 'selectedVibe' | 'selectedPersona'>>) => void;
  updateStep3: (data: Partial<Pick<CampaignStore, 'productName' | 'productType' | 'pricePoint' | 'currency' | 'benefits' | 'usp' | 'targetAudience' | 'painPoint' | 'desiredOutcome'>>) => void;
  updateStep4: (data: Partial<Pick<CampaignStore, 'scriptFormat' | 'viralFormula' | 'scriptAngle' | 'tone' | 'platformOptimisation' | 'contentStyle' | 'selectedCTA' | 'customCTAs' | 'generatedScripts'>>) => void;
  setSelectedCTA: (cta: string) => void;
  setCustomCTAs: (ctas: string[]) => void;
  updateStep5: (data: Partial<Pick<CampaignStore, 'postsPerWeek' | 'campaignDuration' | 'startDate' | 'timezone' | 'calendarPosts'>>) => void;
  reset: () => void;
  resetMode: () => void;
  setProfession: (value: string) => void;
  setProfessionOther: (value: string) => void;
  setAudienceDescription: (value: string) => void;
  setAudiencePain: (value: string) => void;
  setAudiencePainOther: (value: string) => void;
  setAudienceWant: (value: string) => void;
  setAudienceWantOther: (value: string) => void;
  setVoice: (value: string) => void;
  markSetupComplete: () => void;
  addToGenerationHistory: (item: GenerationHistoryItem) => void;
  resetSetup: () => void;
  resetStep1: () => void;
  resetStep2: () => void;
  resetStep3: () => void;
  // Velour customer-clarity actions
  setCustomerWho: (value: string) => void;
  setCustomerBeforeState: (value: string) => void;
  setCustomerAfterState: (value: string) => void;
  setCustomerSurfaceProblem: (value: string) => void;
  setCustomerRealProblem: (value: string) => void;
  setCustomerLanguageUses: (value: string[]) => void;
  setCustomerLanguageAvoids: (value: string[]) => void;
  setCustomerAwarenessStage: (value: 'unaware' | 'problem' | 'solution' | 'most' | '') => void;
  setCustomerSummary: (value: string) => void;
  setProfileLastStep: (step: number) => void;
  markProfileComplete: () => void;
  resetProfile: () => void;
  setSession: (session: Session | null) => void;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

const initialState = {
  creatorName: '',
  brandName: '',
  contentCategory: '',
  contentLanguage: '',
  platformTargets: [],
  campaignGoals: [],
  avatarRealPerson: '',
  avatarCurrently: '',
  avatarFeels: '',
  avatarFrustratedBy: '',
  avatarAlreadyTried: '',
  avatarBiggestFear: '',
  avatarSecretHope: '',
  avatarVoice: '',
  guidedFeeling: '',
  guidedWish: '',
  guidedBarrier: '',
  avatarFeelBlank: '',
  avatarWantBlank: '',
  avatarTiredOfBlank: '',
  selectedVibe: '',
  selectedPersona: '',
  productName: '',
  productType: '',
  pricePoint: '',
  currency: 'USD' as Currency,
  benefits: ['', ''],
  usp: '',
  targetAudience: '',
  painPoint: '',
  desiredOutcome: '',
  scriptFormat: 'hook-and-sell',
  viralFormula: '',
  scriptAngle: '',
  tone: [],
  platformOptimisation: 'TikTok',
  contentStyle: 'western' as ContentStyle,
  selectedCTA: '',
  customCTAs: [],
  generatedScripts: [],
  postsPerWeek: 3,
  campaignDuration: '1 Month',
  startDate: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  calendarPosts: [],
  liveScript: '',
  isGeneratingLive: false,
  ugcNicheResult: '',
  ugcNicheAnswers: {},
  ugcBio: '',
  ugcExperience: '',
  ugcNiche: '',
  ugcStyle: '',
  ugcAchievement: '',
  ugcAddOns: [],
  ugcChecklist: [],
  creatorMode: '',
  session: null as Session | null,
  authLoading: true,
  authError: null as string | null,
  affiliateBrandName: '',
  affiliatePlatform: '',
  affiliateLink: '',
  affiliateCommission: '',
  digitalProductContents: '',
  digitalProductAudience: '',
  digitalProductTransformation: '',
  digitalProductDelivery: '',
  digitalProductValueStack: '',
  ugcPortfolioCount: 0,
  ugcPitchesSent: 0,
  ugcBrandName: '',
  ugcProductName: '',
  ugcProductCategory: '',
  ugcProductBenefit: '',
  ugcTargetCustomer: '',
  ugcDesiredAction: '',
  ugcScriptFormat: 'product-review',
  ugcScriptLength: '30-60 seconds',
  ugcCTA: '',
  ugcGeneratedScripts: '',
  ugcCurrentSection: 'ugc-dashboard',
  ugcRatePerVideo: '',
  ugcPortfolioChecklist: [],
  ugcPitches: [],
  ugcSelectedNiche: '',
  ugcNicheQ1: [],
  ugcNicheQ2: [],
  ugcNicheQ3: [],
  ugcNicheQ4: '',
  ugcNicheQ5: '',
  rateCardCreatorName: '',
  rateCardCreatorTitle: 'Content Creator',
  rateCardEmail: '',
  rateCardPortfolioLink: '',
  rateCardProfilePhoto: '',
  rateCardPortfolioPieces: '0',
  rateCardContentRates: [
    { id: 'shortFormVideo', label: 'Short Form Video (under 60 sec)', rate: '', enabled: true },
    { id: 'longFormVideo', label: 'Long Form Video (60+ sec)', rate: '', enabled: true },
    { id: 'photoPackage', label: 'Photo Package (3-5 images)', rate: '', enabled: true },
    { id: 'unboxingReview', label: 'Unboxing & Review Video', rate: '', enabled: true },
    { id: 'testimonial', label: 'Testimonial Video', rate: '', enabled: true },
    { id: 'tutorialHowTo', label: 'Tutorial & How-To Video', rate: '', enabled: true },
    { id: 'bundlePackage', label: 'Bundle Package (Video + Photos)', rate: '', enabled: true },
  ],
  rateCardCustomRates: [],
  rateCardPackages: [],
  rateCardAddOns: [
    { id: 'paidAdUsage', name: 'Paid Ad Usage Rights', price: '20% per 30 days', enabled: true },
    { id: 'additionalHook', name: 'Additional Hook', price: '$50', enabled: true },
    { id: 'additionalCTA', name: 'Additional CTA Variation', price: '$50', enabled: true },
    { id: 'rawFootage', name: 'Raw Footage', price: '50% of video cost', enabled: true },
    { id: 'rushOrder', name: 'Rush Order (under 7 days)', price: '20% fee', enabled: true },
  ],
  rateCardContactMethods: [],
  rateCardTurnaround: '5-7 business days',
  rateCardRevisions: '2 revisions included',
  rateCardValidUntil: '',
  rateCardConnectHeading: 'Connect With Me',
  portfolioVideos: [
    { id: '1', type: 'Unboxing Video', completed: false, link: '' },
    { id: '2', type: 'Testimonial Video', completed: false, link: '' },
    { id: '3', type: 'Tutorial & How-To', completed: false, link: '' },
    { id: '4', type: 'Before & After Transformation', completed: false, link: '' },
    { id: '5', type: 'Get Ready With Me', completed: false, link: '' },
    { id: '6', type: 'Honest Product Review', completed: false, link: '' },
    { id: '7', type: 'Lifestyle Showcase', completed: false, link: '' },
    { id: '8', type: 'Voiceover Ad (faceless)', completed: false, link: '' },
    { id: '9', type: 'Text on Screen Ad (faceless)', completed: false, link: '' },
    { id: '10', type: 'Mini Commercial', completed: false, link: '' },
  ],
  portfolioLinks: [],
  portfolioNiche: '',
  portfolioAvailability: 'Available for paid collaborations',
  outreachPitches: [],
  outreachChallengeStartDate: '',
  incomeRatePerVideo: '',
  incomeVideosPerDeal: '1',
  incomeDealsPerMonth: '',
  dailyCheckboxes: {
    creatorAction: false,
    sentPitch: false,
    brandEngagement: false,
    contentCreated: false,
    checkedNumbers: false,
  },
  lastCheckboxReset: new Date().toDateString(),
  wins: [],
  milestones: {
    firstPitch: false,
    firstReply: false,
    firstDeal: false,
    firstDelivery: false,
    firstPayment: false,
    firstRateRaise: false,
    firstRetainer: false,
    first500Month: false,
    first1kMonth: false,
    first3kMonth: false,
  },
  scriptStudioBrandName: '',
  scriptStudioProductName: '',
  scriptStudioKeyBenefit: '',
  scriptStudioTargetAudience: '',
  scriptStudioTone: 'Authentic & Raw',
  scriptStudioVideoLength: '30 seconds',
  scriptStudioFormat: '',
  scriptStudioGeneratedScript: null,
  scriptStudioSavedScripts: [],
  scriptStudioIsGenerating: false,
  actionPlanCompletedDays: [],
  actionPlanStartDate: '',
  portfolioScriptCategory: '',
  portfolioScriptProduct: '',
  portfolioScriptVideoType: '',
  portfolioScriptStyle: '',
  introCreatorName: '',
  introContentNiche: '',
  introContentStyle: '',
  introWhatMakesDifferent: '',
  introVideoUploaded: false,
  introVideoLink: '',
  introVideoPlatform: '',
  introVideoFileName: '',
  pitchVideoUploaded: false,
  pitchVideoLink: '',
  pitchVideoPlatform: '',
  pitchVideoFileName: '',
  portfolioPhotosBannerDismissed: false,
  portfolioScriptVideoLength: '30 seconds',
  portfolioScripts: [],
  portfolioPhotos: [],
  portfolioVideoLinks: [],
  portfolioActiveTab: 'photos',
  portfolioVideosTabState: 'script-builder',
  portfolioVideosDefaultTab: null,
  portfolioLink: '',
  portfolioBioCompleted: false,
  portfolioRateCardCompleted: false,
  portfolioStatement: '',
  toastMessage: null,
  toastVisible: false,
  capcutChecklistCompleted: [],
  beforeRecordCardsExpanded: {},
  deals: [],
  monthlyIncomeGoal: 0,
  nextMonthIncomeGoal: 0,
  sixMonthIncomeGoal: 0,
  recentSearches: [],
  gearCardExpanded: {
    email: false,
    phone: false,
    lighting: false,
    tripod: false,
    microphone: false,
    teleprompter: false,
    capcut: false,
  },
  profession: '',
  professionOther: '',
  audienceDescription: '',
  audiencePain: '',
  audiencePainOther: '',
  audienceWant: '',
  audienceWantOther: '',
  voice: '',
  generationHistory: [],
  setupComplete: false,
  customerWho: '',
  customerBeforeState: '',
  customerAfterState: '',
  customerSurfaceProblem: '',
  customerRealProblem: '',
  customerLanguageUses: [],
  customerLanguageAvoids: [],
  customerAwarenessStage: '' as 'unaware' | 'problem' | 'solution' | 'most' | '',
  customerSummary: '',
  profileCompletedAt: null as string | null,
  profileLastStep: 0,
};

export const useCampaignStore = (() => {
  try {
    return create<CampaignStore>()(
      persist(
        (set) => ({
          ...initialState,

          setField: (field, value) => set({ [field]: value }),
          updateStep1: (data) => set((state) => ({ ...state, ...data })),
          updateStep2: (data) => set((state) => ({ ...state, ...data })),
          updateStep3: (data) => set((state) => ({ ...state, ...data })),
          updateStep4: (data) => set((state) => ({ ...state, ...data })),
          updateStep5: (data) => set((state) => ({ ...state, ...data })),
          setSelectedCTA: (cta) => set({ selectedCTA: cta }),
          setCustomCTAs: (ctas) => set({ customCTAs: ctas }),
          setLiveScript: (script) => set({ liveScript: script }),
          setIsGeneratingLive: (val) => set({ isGeneratingLive: val }),

          reset: () =>
            set((state) => ({
              ...initialState,
              session: state.session,
              authLoading: false,
              authError: null,
            })),
          resetMode: () => set({ creatorMode: '' }),

          setProfession: (value) => set({ profession: value }),
          setProfessionOther: (value) => set({ professionOther: value }),
          setAudienceDescription: (value) => set({ audienceDescription: value }),
          setAudiencePain: (value) => set({ audiencePain: value }),
          setAudiencePainOther: (value) => set({ audiencePainOther: value }),
          setAudienceWant: (value) => set({ audienceWant: value }),
          setAudienceWantOther: (value) => set({ audienceWantOther: value }),
          setVoice: (value) => set({ voice: value }),
          markSetupComplete: () => set({ setupComplete: true }),
          addToGenerationHistory: (item) =>
            set((state) => ({
              generationHistory: [item, ...state.generationHistory].slice(0, 20),
            })),
          resetSetup: () =>
            set((state) => ({
              ...state,
              profession: '',
              professionOther: '',
              audienceDescription: '',
              audiencePain: '',
              audiencePainOther: '',
              audienceWant: '',
              audienceWantOther: '',
              voice: '',
              setupComplete: false,
            })),
          resetStep1: () =>
            set((state) => ({
              ...state,
              profession: '',
              professionOther: '',
            })),
          resetStep2: () =>
            set((state) => ({
              ...state,
              audienceDescription: '',
              audiencePain: '',
              audiencePainOther: '',
              audienceWant: '',
              audienceWantOther: '',
            })),
          resetStep3: () =>
            set((state) => ({
              ...state,
              voice: '',
            })),
          setCustomerWho: (value) => set({ customerWho: value }),
          setCustomerBeforeState: (value) => set({ customerBeforeState: value }),
          setCustomerAfterState: (value) => set({ customerAfterState: value }),
          setCustomerSurfaceProblem: (value) => set({ customerSurfaceProblem: value }),
          setCustomerRealProblem: (value) => set({ customerRealProblem: value }),
          setCustomerLanguageUses: (value) => set({ customerLanguageUses: value }),
          setCustomerLanguageAvoids: (value) => set({ customerLanguageAvoids: value }),
          setCustomerAwarenessStage: (value) => set({ customerAwarenessStage: value }),
          setCustomerSummary: (value) => set({ customerSummary: value }),
          setProfileLastStep: (step) => set({ profileLastStep: step }),
          markProfileComplete: () =>
            set({
              profileCompletedAt: new Date().toISOString(),
              profileLastStep: 5,
            }),
          resetProfile: () =>
            set({
              customerWho: '',
              customerBeforeState: '',
              customerAfterState: '',
              customerSurfaceProblem: '',
              customerRealProblem: '',
              customerLanguageUses: [],
              customerLanguageAvoids: [],
              customerAwarenessStage: '',
              customerSummary: '',
              profileCompletedAt: null,
              profileLastStep: 0,
            }),
          setSession: (session) => set({ session }),
          setAuthLoading: (authLoading) => set({ authLoading }),
          setAuthError: (authError) => set({ authError }),
          signOut: async () => {
            set({ authError: null });
            await supabase.auth.signOut();
            set({ session: null });
          },
        }),
        {
          name: 'velour-storage',
          partialize: (state) => {
            const { session: _s, authLoading: _a, authError: _e, ...rest } = state;
            return rest;
          },
          skipHydration: false,
          version: 1,
          onRehydrateStorage: () => (state) => {
            if (state) {
              const s = state as Record<string, unknown>;
              if (typeof s.profession !== 'string') s.profession = '';
              if (typeof s.professionOther !== 'string') s.professionOther = '';
              if (typeof s.audienceDescription !== 'string') s.audienceDescription = '';
              if (typeof s.audiencePain !== 'string') s.audiencePain = '';
              if (typeof s.audiencePainOther !== 'string') s.audiencePainOther = '';
              if (typeof s.audienceWant !== 'string') s.audienceWant = '';
              if (typeof s.audienceWantOther !== 'string') s.audienceWantOther = '';
              if (typeof s.voice !== 'string') s.voice = '';
              if (!Array.isArray(s.generationHistory)) {
                s.generationHistory = [];
              }
              if (typeof s.setupComplete !== 'boolean') {
                state.setupComplete = false;
              }
              if (typeof state.platformTargets === 'string') {
                state.platformTargets = state.platformTargets ? [state.platformTargets] : [];
              }
              if (typeof state.campaignGoals === 'string') {
                state.campaignGoals = state.campaignGoals ? [state.campaignGoals] : [];
              }
              if (typeof state.benefits === 'string') {
                state.benefits = state.benefits ? [state.benefits] : ['', ''];
              }
              if (typeof state.tone === 'string') {
                state.tone = state.tone ? [state.tone] : [];
              }
              if (typeof state.customCTAs === 'string') {
                state.customCTAs = state.customCTAs ? [state.customCTAs] : [];
              }
              if (state.scriptFormat === 'short-form' || state.scriptFormat === 'Short-Form' || state.scriptFormat === 'hook-sell') {
                state.scriptFormat = 'hook-and-sell';
              }
              if (!Array.isArray(state.rateCardContentRates)) {
                state.rateCardContentRates = [
                  { id: 'shortFormVideo', label: 'Short Form Video (under 60 sec)', rate: '', enabled: true },
                  { id: 'longFormVideo', label: 'Long Form Video (60+ sec)', rate: '', enabled: true },
                  { id: 'photoPackage', label: 'Photo Package (3-5 images)', rate: '', enabled: true },
                  { id: 'unboxingReview', label: 'Unboxing & Review Video', rate: '', enabled: true },
                  { id: 'testimonial', label: 'Testimonial Video', rate: '', enabled: true },
                  { id: 'tutorialHowTo', label: 'Tutorial & How-To Video', rate: '', enabled: true },
                  { id: 'bundlePackage', label: 'Bundle Package (Video + Photos)', rate: '', enabled: true },
                ];
              }
              if (!Array.isArray(state.rateCardCustomRates)) {
                state.rateCardCustomRates = [];
              }
              if (!Array.isArray(state.rateCardContactMethods)) {
                state.rateCardContactMethods = [];
              }
              if (!Array.isArray(state.rateCardPackages)) {
                state.rateCardPackages = [];
              }
              if (!Array.isArray(state.rateCardAddOns)) {
                state.rateCardAddOns = [
                  { id: 'paidAdUsage', name: 'Paid Ad Usage Rights', price: '20% per 30 days', enabled: true },
                  { id: 'additionalHook', name: 'Additional Hook', price: '$50', enabled: true },
                  { id: 'additionalCTA', name: 'Additional CTA Variation', price: '$50', enabled: true },
                  { id: 'rawFootage', name: 'Raw Footage', price: '50% of video cost', enabled: true },
                  { id: 'rushOrder', name: 'Rush Order (under 7 days)', price: '20% fee', enabled: true },
                ];
              }
              if (!state.rateCardValidUntil) {
                state.rateCardValidUntil = '';
              }
              if (!state.rateCardConnectHeading) {
                state.rateCardConnectHeading = 'Connect With Me';
              }
            }
          },
        }
      )
    );
  } catch (error) {
    console.error('Error initializing campaign store:', error);
    throw error;
  }
})();
