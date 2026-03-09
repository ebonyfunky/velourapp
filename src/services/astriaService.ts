const ASTRIA_API_BASE = 'https://api.astria.ai';
const API_KEY = import.meta.env.VITE_ASTRIA_API_KEY;

export interface AstriaTune {
  id: number;
  title: string;
  status: 'processing' | 'trained' | 'failed';
  trained_at?: string;
}

export interface AstriaPrompt {
  id: number;
  status: 'processing' | 'completed' | 'failed';
  images?: Array<{ url: string }>;
}

const STYLE_PROMPTS = [
  { style: 'Natural', prompt: 'ohwx person, natural lighting, candid photo, relaxed expression, soft smile' },
  { style: 'Glam', prompt: 'ohwx person, glamorous portrait, professional makeup, studio lighting, elegant' },
  { style: 'Athletic', prompt: 'ohwx person, athletic wear, fitness portrait, energetic, sporty' },
  { style: 'Professional', prompt: 'ohwx person, business professional, corporate headshot, confident, suited' },
  { style: 'Street', prompt: 'ohwx person, urban street style, casual fashion, city background, trendy' },
  { style: 'Luxury', prompt: 'ohwx person, luxury fashion, high-end portrait, sophisticated, designer clothing' },
  { style: 'Editorial', prompt: 'ohwx person, editorial fashion photography, artistic, magazine style, creative' },
  { style: 'Casual', prompt: 'ohwx person, casual everyday style, relaxed, friendly, approachable' },
  { style: 'Power', prompt: 'ohwx person, power pose, confident stance, leadership, authoritative' },
  { style: 'Minimal', prompt: 'ohwx person, minimal aesthetic, clean background, simple, modern' },
  { style: 'Bold', prompt: 'ohwx person, bold colors, vibrant, eye-catching, striking portrait' },
  { style: 'Soft', prompt: 'ohwx person, soft lighting, dreamy, gentle, warm tones, delicate' },
];

export async function uploadPhotosAndCreateTune(photos: File[]): Promise<number> {
  const formData = new FormData();

  formData.append('tune[title]', `AI Twin - ${Date.now()}`);
  formData.append('tune[name]', 'ohwx');
  formData.append('tune[branch]', 'realistic');

  photos.forEach((photo) => {
    formData.append('tune[images][]', photo);
  });

  const response = await fetch(`${ASTRIA_API_BASE}/tunes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create tune: ${response.statusText}`);
  }

  const data = await response.json();
  return data.id;
}

export async function pollTuneStatus(tuneId: number): Promise<AstriaTune> {
  const response = await fetch(`${ASTRIA_API_BASE}/tunes/${tuneId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tune status: ${response.statusText}`);
  }

  return await response.json();
}

export async function waitForTuneCompletion(tuneId: number, onProgress?: (status: string) => void): Promise<void> {
  let attempts = 0;
  const maxAttempts = 60;

  while (attempts < maxAttempts) {
    const tune = await pollTuneStatus(tuneId);

    if (onProgress) {
      onProgress(tune.status);
    }

    if (tune.status === 'trained') {
      return;
    }

    if (tune.status === 'failed') {
      throw new Error('Tune training failed');
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
    attempts++;
  }

  throw new Error('Tune training timeout');
}

export async function generateImages(tuneId: number): Promise<Array<{ url: string; style: string }>> {
  const promptPromises = STYLE_PROMPTS.map(async ({ style, prompt }) => {
    const response = await fetch(`${ASTRIA_API_BASE}/tunes/${tuneId}/prompts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: {
          text: prompt,
          num_images: 1,
          negative_prompt: 'blurry, low quality, distorted, deformed',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create prompt: ${response.statusText}`);
    }

    const data = await response.json();
    return { promptId: data.id, style };
  });

  const prompts = await Promise.all(promptPromises);

  const images = await Promise.all(
    prompts.map(async ({ promptId, style }) => {
      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        const response = await fetch(`${ASTRIA_API_BASE}/prompts/${promptId}`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch prompt status: ${response.statusText}`);
        }

        const prompt: AstriaPrompt = await response.json();

        if (prompt.status === 'completed' && prompt.images && prompt.images.length > 0) {
          return { url: prompt.images[0].url, style };
        }

        if (prompt.status === 'failed') {
          throw new Error(`Image generation failed for style: ${style}`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
      }

      throw new Error(`Image generation timeout for style: ${style}`);
    })
  );

  return images;
}
