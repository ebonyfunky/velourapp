export type CampaignMode = 'vlog' | 'ugc';
export type AspectRatio = '9:16' | '16:9' | '1:1';
export type ContentStyle = 'western' | 'african' | 'faith' | 'universal';
export type Currency = 'USD' | 'GBP' | 'EUR' | 'NGN' | 'CAD' | 'AUD' | 'ZAR' | 'KES' | 'GHS' | 'INR' | 'PHP' | 'OTHER';

export interface WizardState {
  campaignName: string;
  brandName: string;
  campaignMode: CampaignMode | null;
  campaignObjective: string;
  contentCategory: string;
  characterReference: File | null;
  environment: File | null;
  productReference: File | null;
  exactFaceSkinTone: boolean;
  environmentEnabled: boolean;
  aspectRatio: AspectRatio;
  cameraStyle: string;
  hairstyle: string;
  makeup: string;
  outfit: string;
  nails: string;
  skinTone: string;
  marketingGoal: string;
  scriptEnabled: boolean;
  script: string;
  contentStyle: ContentStyle;
  currency: Currency;
  pricePoint: string;
  timezone: string;
  termsAccepted: boolean;
}

export const initialWizardState: WizardState = {
  campaignName: '',
  brandName: '',
  campaignMode: null,
  campaignObjective: '',
  contentCategory: '',
  characterReference: null,
  environment: null,
  productReference: null,
  exactFaceSkinTone: false,
  environmentEnabled: true,
  aspectRatio: '9:16',
  cameraStyle: '',
  hairstyle: '',
  makeup: '',
  outfit: '',
  nails: '',
  skinTone: '#C58F65',
  marketingGoal: '',
  scriptEnabled: false,
  script: '',
  contentStyle: 'western',
  currency: 'USD',
  pricePoint: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  termsAccepted: false,
};
