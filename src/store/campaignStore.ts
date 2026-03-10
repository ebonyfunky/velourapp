import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Currency, ContentStyle } from '../types';

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

  // Step 7 - Live Show Planner & UGC Starter Kit
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

  // Creator Identity Fields
  creatorIdentityPersona: string;
  creatorIdentityStyle: string;
  creatorIdentityNiche: string;
  creatorIdentityStory: string;
  creatorIdentityStoryUsedTo: string;
  creatorIdentityStoryUntilI: string;
  creatorIdentityStoryNowIShow: string;
  creatorIdentityCard: {
    statement: string;
    voice: string;
    audience: string;
    themes: string[];
  } | null;

  // Audience Avatar Fields
  audienceAvatar: {
    oneRealPerson: string;
    helpPeopleWho: string;
    theyFeel: string;
    theyWant: string;
    theyTried: string;
    biggestFear: string;
    secretHope: string;
    innerVoice: string;
    audienceStatement: string;
    generated: {
      name: string;
      age: number;
      dailyLife: string;
      emotionalTriggers: string[];
      searchWords: string[];
      contentHooks: string[];
      scrollTestQuestion: string;
    } | null;
  } | null;

  // Content Creator Onboarding (Steps 1-3)
  contentCreatorProfession: string;
  contentCreatorProfessionOther: string;
  contentCreatorFaceType: '' | 'faceless' | 'face-forward';
  contentCreatorAudienceEmotions: string[];
  contentCreatorAudienceWants: string[];
  contentCreatorAudienceTriedOptions: string[];
  contentCreatorAudienceFear: string;
  contentCreatorAudienceAges: string[];
  contentCreatorAudienceLife: string[];
  contentCreatorAudiencePainPoints: string[];
  contentCreatorAudienceStatement: string;
  contentCreatorProjectTypes: string[];
  contentCreatorProjectOther: string;
  contentCreatorContentTypes: string[];
  contentCreatorContentTypesOther: string;
  contentCreatorPostingFrequency: string;
  contentCreatorScriptBatchSize: string;
  contentCreatorGeneratedScripts: Array<{
    id: string;
    dayLabel?: string;
    weekLabel?: string;
    monthLabel?: string;
    type: string;
    hook: string;
    problem?: string;
    solution?: string;
    cta: string;
    fullScript?: string;
  }>;
  contentCreatorNicheHooks: string[];
  contentCreatorCalendarSlots: Array<{
    dayNumber: number;
    contentType: string;
    topic: string;
  }>;

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

  // UGC Gear Guide Expansion States
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
  resetSection: (section: string) => void;
  resetContentCreatorFlow: () => void;
  resetUGCFlow: () => void;
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
  rateCardCreatorTitle: 'UGC Creator',
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
  creatorIdentityPersona: '',
  creatorIdentityStyle: '',
  creatorIdentityNiche: '',
  creatorIdentityStory: '',
  creatorIdentityStoryUsedTo: '',
  creatorIdentityStoryUntilI: '',
  creatorIdentityStoryNowIShow: '',
  creatorIdentityCard: null,
  audienceAvatar: null,
  contentCreatorProfession: '',
  contentCreatorProfessionOther: '',
  contentCreatorFaceType: '',
  contentCreatorAudienceEmotions: [],
  contentCreatorAudienceWants: [],
  contentCreatorAudienceTriedOptions: [],
  contentCreatorAudienceFear: '',
  contentCreatorAudienceAges: [],
  contentCreatorAudienceLife: [],
  contentCreatorAudiencePainPoints: [],
  contentCreatorAudienceStatement: '',
  contentCreatorProjectTypes: [],
  contentCreatorProjectOther: '',
  contentCreatorContentTypes: [],
  contentCreatorContentTypesOther: '',
  contentCreatorPostingFrequency: '',
  contentCreatorScriptBatchSize: '',
  contentCreatorGeneratedScripts: [],
  contentCreatorNicheHooks: [],
  contentCreatorCalendarSlots: [],
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

          reset: () => set(initialState),
          resetMode: () => set({ creatorMode: '' }),

          resetContentCreatorFlow: () =>
            set((s) => ({
              ...s,
              creatorMode: 'content-creator',
              creatorIdentityPersona: '',
              creatorIdentityStyle: '',
              creatorIdentityNiche: '',
              creatorIdentityStory: '',
              creatorIdentityStoryUsedTo: '',
              creatorIdentityStoryUntilI: '',
              creatorIdentityStoryNowIShow: '',
              creatorIdentityCard: null,
              audienceAvatar: null,
              contentCreatorProfession: '',
              contentCreatorProfessionOther: '',
              contentCreatorFaceType: '',
              contentCreatorAudienceEmotions: [],
              contentCreatorAudienceWants: [],
              contentCreatorAudienceTriedOptions: [],
              contentCreatorAudienceFear: '',
              contentCreatorAudienceAges: [],
              contentCreatorAudienceLife: [],
              contentCreatorAudiencePainPoints: [],
              contentCreatorAudienceStatement: '',
              contentCreatorProjectTypes: [],
              contentCreatorProjectOther: '',
              contentCreatorContentTypes: [],
              contentCreatorContentTypesOther: '',
              contentCreatorPostingFrequency: '',
              contentCreatorScriptBatchSize: '',
              contentCreatorGeneratedScripts: [],
              contentCreatorNicheHooks: [],
              contentCreatorCalendarSlots: [],
            })),

          resetUGCFlow: () =>
            set((s) => ({
              ...s,
              ugcCurrentSection: 'ugc-dashboard',
              ugcNicheResult: '',
              ugcNicheAnswers: {},
              ugcSelectedNiche: '',
              ugcPortfolioChecklist: [],
              ugcPitches: [],
            })),

          resetSection: (section: string) => {
            switch (section) {
              case 'step1':
                set({
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
                });
                break;
              case 'step2':
                set({ selectedVibe: '', selectedPersona: '' });
                break;
              case 'step3':
                set({
                  productName: '',
                  productType: '',
                  pricePoint: '',
                  currency: 'USD' as Currency,
                  benefits: ['', ''],
                  usp: '',
                  targetAudience: '',
                  painPoint: '',
                  desiredOutcome: '',
                });
                break;
              case 'step4':
                set({
                  scriptFormat: 'hook-and-sell',
                  viralFormula: '',
                  scriptAngle: '',
                  tone: [],
                  platformOptimisation: 'TikTok',
                  contentStyle: 'western' as ContentStyle,
                  selectedCTA: '',
                  customCTAs: [],
                  generatedScripts: [],
                });
                break;
              case 'step6':
                set({
                  postsPerWeek: 3,
                  campaignDuration: '1 Month',
                  startDate: '',
                  calendarPosts: [],
                });
                break;
              case 'ugc-niche':
                set({
                  ugcSelectedNiche: '',
                  ugcNicheQ1: [],
                  ugcNicheQ2: [],
                  ugcNicheQ3: [],
                  ugcNicheQ4: '',
                  ugcNicheQ5: '',
                  ugcNicheResult: '',
                });
                break;
              case 'ugc-rates':
                set({
                  rateCardCreatorName: '',
                  rateCardCreatorTitle: 'UGC Creator',
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
                });
                break;
              case 'ugc-portfolio':
                set({
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
                });
                break;
              case 'ugc-outreach':
                set({
                  outreachPitches: [],
                  outreachChallengeStartDate: '',
                });
                break;
              case 'ugc-scripts':
                set({
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
                });
                break;
              case 'ugc-plan':
                set({
                  actionPlanCompletedDays: [],
                  actionPlanStartDate: '',
                });
                break;
              default:
                break;
            }
          },
        }),
        {
          name: 'velour-storage',
          skipHydration: false,
          version: 1,
          onRehydrateStorage: () => (state) => {
            if (state) {
              const s = state as Record<string, unknown>;
              if (!Array.isArray(s.contentCreatorAudienceEmotions)) {
                s.contentCreatorAudienceEmotions = typeof s.contentCreatorAudienceEmotion === 'string' && s.contentCreatorAudienceEmotion
                  ? [s.contentCreatorAudienceEmotion]
                  : typeof s.contentCreatorAudienceEmotions === 'string' && s.contentCreatorAudienceEmotions
                    ? [s.contentCreatorAudienceEmotions]
                    : [];
              }
              if (!Array.isArray(s.contentCreatorAudienceWants) && (s.contentCreatorAudienceWant != null || s.contentCreatorAudienceWants == null)) {
                s.contentCreatorAudienceWants = typeof s.contentCreatorAudienceWant === 'string' && s.contentCreatorAudienceWant ? [s.contentCreatorAudienceWant] : [];
              }
              if (!Array.isArray(s.contentCreatorAudienceTriedOptions) && (s.contentCreatorAudienceTried != null || s.contentCreatorAudienceTriedOptions == null)) {
                s.contentCreatorAudienceTriedOptions = typeof s.contentCreatorAudienceTried === 'string' && s.contentCreatorAudienceTried ? [s.contentCreatorAudienceTried] : [];
              }
              if (!Array.isArray(s.contentCreatorAudienceAges) && (s.contentCreatorAudienceAge != null || s.contentCreatorAudienceAges == null)) {
                s.contentCreatorAudienceAges = typeof s.contentCreatorAudienceAge === 'string' && s.contentCreatorAudienceAge ? [s.contentCreatorAudienceAge] : [];
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
              if (!Array.isArray(s.contentCreatorContentTypes)) {
                s.contentCreatorContentTypes = [];
              }
              if (typeof s.contentCreatorContentTypesOther !== 'string') {
                s.contentCreatorContentTypesOther = '';
              }
              if (typeof s.contentCreatorPostingFrequency !== 'string') {
                s.contentCreatorPostingFrequency = '';
              }
              if (typeof s.contentCreatorScriptBatchSize !== 'string') {
                s.contentCreatorScriptBatchSize = '';
              }
              if (!Array.isArray(s.contentCreatorGeneratedScripts)) {
                s.contentCreatorGeneratedScripts = [];
              }
              if (!Array.isArray(s.contentCreatorNicheHooks)) {
                s.contentCreatorNicheHooks = [];
              }
              if (!Array.isArray(s.contentCreatorCalendarSlots)) {
                s.contentCreatorCalendarSlots = [];
              }
              if (typeof s.creatorIdentityStoryUsedTo !== 'string') {
                s.creatorIdentityStoryUsedTo = '';
              }
              if (typeof s.creatorIdentityStoryUntilI !== 'string') {
                s.creatorIdentityStoryUntilI = '';
              }
              if (typeof s.creatorIdentityStoryNowIShow !== 'string') {
                s.creatorIdentityStoryNowIShow = '';
              }
              if (!Array.isArray(s.ugcPortfolioChecklist)) {
                s.ugcPortfolioChecklist = [];
              }
              if (!Array.isArray(s.ugcPitches)) {
                s.ugcPitches = [];
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
