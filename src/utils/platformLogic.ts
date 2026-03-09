export interface FormatBanner {
  text: string;
  background: string;
  borderColor: string;
}

export function getFormatBanner(platforms: string[]): FormatBanner | null {
  const storiesPlatforms = ['Instagram Stories', 'Facebook Stories', 'Snapchat'];
  const shortFormPlatforms = ['TikTok', 'YouTube Shorts', 'Instagram Reels', 'Facebook Reels'];
  const longFormPlatforms = ['YouTube Videos'];
  const feedPlatforms = ['LinkedIn Posts', 'Threads', 'Twitter / X', 'Facebook Feed Posts', 'Instagram Feed Posts'];

  const hasStories = platforms.some(p => storiesPlatforms.includes(p));
  const hasShortForm = platforms.some(p => shortFormPlatforms.includes(p));
  const hasLongForm = platforms.some(p => longFormPlatforms.includes(p));
  const hasFeed = platforms.some(p => feedPlatforms.includes(p));

  if (hasStories) {
    return {
      text: '📐 Stories Format — 9:16 vertical aspect ratio optimised',
      background: 'rgba(201,168,76,0.08)',
      borderColor: '#c9a84c',
    };
  }

  if (hasShortForm) {
    return {
      text: '📐 Short-Form Video — 9:16 vertical, max 60–90 seconds',
      background: 'rgba(46,139,87,0.08)',
      borderColor: '#2e8b57',
    };
  }

  if (hasLongForm) {
    return {
      text: '📐 Long-Form Video — 16:9 landscape recommended',
      background: 'rgba(124,58,237,0.08)',
      borderColor: '#7c3aed',
    };
  }

  if (hasFeed) {
    return {
      text: '📐 Feed Content — Square or portrait format, text-first',
      background: 'rgba(201,168,76,0.08)',
      borderColor: '#c9a84c',
    };
  }

  return null;
}

export const platformCTAs: Record<string, string[]> = {
  'TikTok': [
    'Follow for more',
    'Comment [word] and I\'ll send you the link',
    'Duet this if you agree',
    'Link in bio',
    'Save this for later',
  ],
  'Instagram Reels': [
    'Follow for more',
    'Tap the link in bio',
    'Save this post',
    'DM me [keyword]',
    'Share this to your story',
  ],
  'Instagram Stories': [
    'Swipe up',
    'Tap the link in bio',
    'Save this post',
    'DM me [keyword]',
    'Share this to your story',
  ],
  'Instagram Feed Posts': [
    'Save this',
    'Share with someone who needs this',
    'Comment below',
    'Link in bio',
    'Tag a friend',
  ],
  'Facebook Reels': [
    'Share this post',
    'Comment YES if this resonates',
    'Click the link',
    'Tag someone who needs to see this',
    'Follow the page for more',
  ],
  'Facebook Stories': [
    'Share this post',
    'Comment YES if this resonates',
    'Click the link',
    'Tag someone who needs to see this',
    'Follow the page for more',
  ],
  'Facebook Feed Posts': [
    'Share this post',
    'Comment YES if this resonates',
    'Click the link',
    'Tag someone who needs to see this',
    'Follow the page for more',
  ],
  'YouTube Shorts': [
    'Subscribe',
    'Watch the full video',
    'Comment your thoughts',
    'Like if this helped',
    'Check the description for the link',
  ],
  'YouTube Videos': [
    'Subscribe',
    'Watch the full video',
    'Comment your thoughts',
    'Like if this helped',
    'Check the description for the link',
  ],
  'LinkedIn Posts': [
    'Follow for more',
    'Repost if you agree',
    'Comment your experience',
    'Connect with me',
    'DM me for more info',
  ],
  'Twitter / X': [
    'Retweet this',
    'Follow for daily tips',
    'Reply with your thoughts',
    'Bookmark this thread',
  ],
  'Pinterest': [
    'Save this pin',
    'Follow the board',
    'Click through for the full guide',
  ],
  'Snapchat': [
    'Swipe up',
    'Add me on Snap',
    'Send this to a friend',
  ],
  'Threads': [
    'Follow for more takes like this',
    'Reply with your opinion',
    'Repost if you agree',
    'What do you think? Drop it below',
  ],
};

export function getPlatformCTAs(platforms: string[]): string[] {
  const allCTAs = new Set<string>();

  platforms.forEach(platform => {
    const ctas = platformCTAs[platform];
    if (ctas) {
      ctas.forEach(cta => allCTAs.add(cta));
    }
  });

  return Array.from(allCTAs);
}

export const linkedInAngles = [
  'Lessons I learned the hard way',
  'What [X] years in [industry] taught me',
  'The honest truth about [topic]',
  'I was wrong about [belief] until...',
  'Most people overlook this about [topic]',
];

export const threadsAngles = [
  '⚡ Hot Takes — Bold opinions that divide the room',
  '🔥 Contrarian — "Everyone says X. Here\'s why they\'re wrong."',
  '💡 Unpopular Opinion — Opens with "Unpopular opinion:"',
  '📋 Quick Tips — Fast value in list format',
  '🎭 Behind the Scenes — Raw, unfiltered thoughts',
  '📖 Story-led — Personal narrative, relatable moment',
];

export const categoryScriptAngles: Record<string, string[]> = {
  'eBook / Digital Download': [
    'This ebook changed how I think about [topic]',
    'I wrote everything I know about [topic] into one guide',
    'Stop Googling [topic] — I put it all in one place',
    'The exact framework I used to [result] — now in an ebook',
  ],
  'Print on Demand': [
    'I designed something and I need your opinion',
    'This is what [niche] people actually wear / use',
    'I made this for people who [identity statement]',
    'POD unboxing — here\'s how it turned out',
  ],
  'Affiliate Marketing': [
    'I\'ve been using this for [X] weeks and here\'s my honest review',
    'This is the product I wish I found sooner',
    'Nobody talks about this affiliate offer but it\'s paying me every week',
    'I compared 5 options so you don\'t have to — here\'s the winner',
  ],
  'TikTok Shop': [
    'TikTok made me buy it — and I have no regrets',
    'Honest review after [X] days of using this',
    'I found this on TikTok Shop and it actually works',
    'Unboxing + first impression — worth it or skip it?',
  ],
  'Coaching Program': [
    'What my clients achieve in [X] weeks inside my program',
    'I used to struggle with [pain point] until I built this system',
    'Here\'s the exact framework inside my coaching program',
    'This is what separates people who get results from those who don\'t',
  ],
  'Faith & Ministry': [
    'This scripture/principle changed how I see [topic]',
    'God placed this message on my heart and I had to share it',
    'If you\'re going through [struggle] — watch this',
    'The breakthrough you\'ve been praying for starts here',
    'This is what nobody in the church is talking about',
    'I almost gave up until [turning point]',
    'This one principle from [book/scripture] transformed my life',
    'Stop praying for change and start doing this',
    'The enemy doesn\'t want you to know this about [topic]',
    'What 10 years of faith taught me about [topic]',
  ],
  'Church / Religious Organisation': [
    'This scripture/principle changed how I see [topic]',
    'God placed this message on my heart and I had to share it',
    'If you\'re going through [struggle] — watch this',
    'The breakthrough you\'ve been praying for starts here',
    'This is what nobody in the church is talking about',
    'I almost gave up until [turning point]',
    'This one principle from [book/scripture] transformed my life',
    'Stop praying for change and start doing this',
    'The enemy doesn\'t want you to know this about [topic]',
    'What 10 years of faith taught me about [topic]',
  ],
  'Motivational Speaker': [
    'Nobody prepared me for what [life stage] would feel like',
    'The mindset shift that changed everything for me',
    'Stop waiting for permission to [action]',
    'You\'re one decision away from a completely different life',
    'The real reason most people never reach their goals',
    'What successful people do that nobody talks about',
    'I used to be exactly where you are right now',
    'The thing holding you back has nothing to do with money or time',
    'Everyone told me it was impossible until I did this',
    'The 3 things I wish someone had told me about [topic]',
  ],
  'Life Coach': [
    'Nobody prepared me for what [life stage] would feel like',
    'The mindset shift that changed everything for me',
    'Stop waiting for permission to [action]',
    'You\'re one decision away from a completely different life',
    'The real reason most people never reach their goals',
    'What successful people do that nobody talks about',
    'I used to be exactly where you are right now',
    'The thing holding you back has nothing to do with money or time',
    'Everyone told me it was impossible until I did this',
    'The 3 things I wish someone had told me about [topic]',
  ],
};

export const categoryCTAs: Record<string, string[]> = {
  'eBook / Digital Download': [
    'Link in bio to grab your copy',
    'Comment GUIDE and I\'ll send you the link',
    'Only $[price] — tap the link',
    'Download it instantly — link in bio',
  ],
  'Print on Demand': [
    'Shop the link in bio',
    'Limited run — grab yours before it\'s gone',
    'Tag someone who needs this',
    'Comment [word] for the link',
  ],
  'Affiliate Marketing': [
    'Link in bio — my affiliate link gets you [discount/bonus]',
    'Comment [word] and I\'ll send you my honest review',
    'This is not sponsored — this is just what actually works',
  ],
  'TikTok Shop': [
    'Tap the yellow basket to shop',
    'It\'s linked in my TikTok Shop',
    'Check the product link below this video',
  ],
  'Coaching Program': [
    'DM me [word] to learn more',
    'Applications open — link in bio',
    'Comment [word] and I\'ll send you the details',
    'Book a free call — link in bio',
  ],
  'Faith & Ministry': [
    'Share this with someone who needs to hear it today',
    'Comment FAITH and I\'ll send you more',
    'Follow for daily encouragement',
    'Link in bio for the full message',
    'Tag someone who needs this right now',
    'Save this for when you need a reminder',
    'DM me [word] for the full teaching',
    'Subscribe for weekly inspiration',
  ],
  'Church / Religious Organisation': [
    'Share this with someone who needs to hear it today',
    'Comment FAITH and I\'ll send you more',
    'Follow for daily encouragement',
    'Link in bio for the full message',
    'Tag someone who needs this right now',
    'Save this for when you need a reminder',
    'DM me [word] for the full teaching',
    'Subscribe for weekly inspiration',
  ],
};

export const categoryTips: Record<string, string> = {
  'eBook / Digital Download': '✦ For low-ticket digital products, lead with the transformation not the price. Mention price only in the CTA.',
  'Print on Demand': '✦ POD content performs best when it leads with identity — make the viewer feel the product was made specifically for them.',
  'Faith & Ministry': '✦ Faith-based content performs best when it leads with the human struggle before the spiritual solution. Meet people where they are — then lift them higher.',
  'Church / Religious Organisation': '✦ Faith-based content performs best when it leads with the human struggle before the spiritual solution. Meet people where they are — then lift them higher.',
};
