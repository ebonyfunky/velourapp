import { useCampaignStore } from '../store/campaignStore';
import { Check } from 'lucide-react';

interface DayAction {
  day: number;
  title: string;
  description: string;
  isDynamic?: boolean;
  dynamicKey?: string;
}

const baseWeekPlan: Record<number, DayAction[]> = {
  1: [
    { day: 1, title: 'Define Your Niche', description: 'Complete the Niche Finder and save your focus area' },
    { day: 2, title: 'Set Up Your Rate Card', description: 'Fill out your pricing and portfolio goal' },
    { day: 3, title: 'Film First Video', description: 'Record your first unboxing or testimonial video' },
    { day: 4, title: 'Upload Portfolio Video', description: 'Edit and upload your first portfolio video link' },
    { day: 5, title: 'Research Brands', description: 'Find and list 10 brands in your niche', isDynamic: true, dynamicKey: 'niche' },
    { day: 6, title: 'Write Your Pitch', description: 'Use the Brand Outreach templates to craft your pitch' },
    { day: 7, title: 'Rest & Review', description: 'Celebrate your progress and plan for Week 2' },
  ],
  2: [
    { day: 8, title: 'Film Tutorial Video', description: 'Create your second portfolio video — tutorial or how-to' },
    { day: 9, title: 'Send First Pitches', description: 'Send your first 3 brand pitches using your templates' },
    { day: 10, title: 'Engage With Brands', description: 'Engage with 5 brand accounts on TikTok or Instagram', isDynamic: true, dynamicKey: 'niche' },
    { day: 11, title: 'Lifestyle Showcase', description: 'Film your third portfolio video — lifestyle showcase' },
    { day: 12, title: 'Follow Up', description: 'Follow up on Day 9 pitches professionally' },
    { day: 13, title: 'Join UGC Platform', description: 'Apply to one UGC platform — Billo or Insense' },
    { day: 14, title: 'Film Voiceover Video', description: 'Create a voiceover or text-on-screen video' },
  ],
  3: [
    { day: 15, title: 'Send 5 New Pitches', description: 'Reach out to 5 new brands in your niche', isDynamic: true, dynamicKey: 'niche' },
    { day: 16, title: 'Film Fifth Video', description: 'Record your fifth portfolio video' },
    { day: 17, title: 'Follow Up All Pitches', description: 'Follow up on all unanswered pitches from Weeks 1-2' },
    { day: 18, title: 'Share Your Work', description: 'Post a portfolio highlight to your social media' },
    { day: 19, title: 'Join TikTok Shop', description: 'Apply to 2 TikTok Shop affiliate products', isDynamic: true, dynamicKey: 'niche' },
    { day: 20, title: 'Before & After Video', description: 'Film a transformation or before/after video' },
    { day: 21, title: 'Track Responses', description: 'Review all pitches sent — log responses in tracker' },
  ],
  4: [
    { day: 22, title: 'Pitch Dream Brands', description: 'Send your strongest pitch to your top 3 dream brands', isDynamic: true, dynamicKey: 'niche' },
    { day: 23, title: 'Mini Commercial', description: 'Film your professional mini commercial portfolio video' },
    { day: 24, title: 'Follow Up Week 3', description: 'Follow up on all Week 3 pitches' },
    { day: 25, title: 'Negotiate Your Deal', description: 'If you have a reply, negotiate your first paid deal' },
    { day: 26, title: 'Deliver Content', description: 'Film and deliver your first piece of brand content' },
    { day: 27, title: 'Request Testimonial', description: 'Ask the brand for a testimonial or review' },
    { day: 28, title: 'Celebrate First Deal', description: 'Share your win and celebrate your first deal' },
    { day: 29, title: 'Plan Month 2', description: 'Set a new pitch goal and content strategy for next month' },
    { day: 30, title: 'Download UGC Pack', description: 'Export your UGC Pack and review your 30-day progress' },
  ],
};

export default function ActionPlan() {
  const {
    actionPlanCompletedDays,
    ugcSelectedNiche,
    ugcExperience,
    portfolioVideos,
    outreachPitches,
    setField,
  } = useCampaignStore();

  const getDynamicDescription = (action: DayAction): string => {
    if (!action.isDynamic || !action.dynamicKey) {
      return action.description;
    }

    if (action.dynamicKey === 'niche' && ugcSelectedNiche) {
      return action.description.replace('your niche', ugcSelectedNiche);
    }

    return action.description;
  };

  const toggleDay = (day: number) => {
    const isCompleted = actionPlanCompletedDays.includes(day);
    if (isCompleted) {
      setField(
        'actionPlanCompletedDays',
        actionPlanCompletedDays.filter((d) => d !== day)
      );
    } else {
      setField('actionPlanCompletedDays', [...actionPlanCompletedDays, day]);
    }
  };

  const completionPercentage = Math.round((actionPlanCompletedDays.length / 30) * 100);

  const getWeekStatus = (weekNum: number): { completed: number; total: number } => {
    const weekDays = baseWeekPlan[weekNum];
    const completed = weekDays.filter((action) =>
      actionPlanCompletedDays.includes(action.day)
    ).length;
    return { completed, total: weekDays.length };
  };

  const getContextualMessage = () => {
    const portfolioCompleted = portfolioVideos.filter((v) => v.completed).length;
    const pitchesSent = outreachPitches.length;

    if (completionPercentage === 0) {
      return "Start your UGC journey today. Day 1 awaits.";
    } else if (completionPercentage < 25) {
      return "You're laying the foundation. Keep building.";
    } else if (completionPercentage < 50) {
      return `${portfolioCompleted} portfolio videos done. You're gaining momentum.`;
    } else if (completionPercentage < 75) {
      return `${pitchesSent} pitches sent. Brands are noticing you.`;
    } else if (completionPercentage < 100) {
      return "Almost there. Your first deal is within reach.";
    } else {
      return "30 days complete. You're officially a UGC creator.";
    }
  };

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '42px',
          fontWeight: 600,
          color: '#f0ebff',
          marginBottom: '12px',
        }}
      >
        30-Day Action Plan
      </h1>
      <p
        style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#c9a84c',
          marginBottom: '32px',
        }}
      >
        Your personalized roadmap to landing your first paid UGC deal
      </p>

      {/* Progress Overview */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(139,105,20,0.15))',
          border: '2px solid #c9a84c',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#e8c96a',
            marginBottom: '8px',
            fontFamily: 'Cormorant Garamond, serif',
          }}
        >
          {completionPercentage}%
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#f0ebff',
            marginBottom: '16px',
            fontWeight: 600,
          }}
        >
          {actionPlanCompletedDays.length} of 30 Days Complete
        </div>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: 'rgba(10,6,16,0.6)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: `${completionPercentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c9a84c, #e8c96a)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
        <div
          style={{
            fontSize: '15px',
            color: '#d4cee8',
            fontStyle: 'italic',
          }}
        >
          {getContextualMessage()}
        </div>
      </div>

      {/* Week-by-Week Plan */}
      {[1, 2, 3, 4].map((weekNum) => {
        const weekStatus = getWeekStatus(weekNum);
        const isWeekComplete = weekStatus.completed === weekStatus.total;

        const weekTitles: Record<number, string> = {
          1: 'Foundation',
          2: 'Build',
          3: 'Pitch',
          4: 'Close',
        };

        return (
          <div
            key={weekNum}
            style={{
              background: '#1c1a35',
              border: isWeekComplete
                ? '2px solid #c9a84c'
                : '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: isWeekComplete ? '#e8c96a' : '#f0ebff',
                    marginBottom: '4px',
                    fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Week {weekNum} — {weekTitles[weekNum]}
                </h2>
                <div style={{ fontSize: '13px', color: '#9b8fb5' }}>
                  Days {baseWeekPlan[weekNum][0].day}-
                  {baseWeekPlan[weekNum][baseWeekPlan[weekNum].length - 1].day}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isWeekComplete
                    ? 'rgba(201,168,76,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: isWeekComplete
                    ? '1px solid #c9a84c'
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {isWeekComplete && <Check size={16} color="#c9a84c" />}
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isWeekComplete ? '#e8c96a' : '#9b8fb5',
                  }}
                >
                  {weekStatus.completed}/{weekStatus.total}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px',
              }}
            >
              {baseWeekPlan[weekNum].map((action) => {
                const isCompleted = actionPlanCompletedDays.includes(action.day);

                return (
                  <div
                    key={action.day}
                    onClick={() => toggleDay(action.day)}
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(139,105,20,0.15))'
                        : 'rgba(255,255,255,0.03)',
                      border: isCompleted
                        ? '2px solid #c9a84c'
                        : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                    onMouseOver={(e) => {
                      if (!isCompleted) {
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isCompleted) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          background: isCompleted
                            ? '#c9a84c'
                            : 'rgba(255,255,255,0.05)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: isCompleted ? '#0a0610' : '#9b8fb5',
                        }}
                      >
                        {isCompleted ? <Check size={20} /> : action.day}
                      </div>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          border: isCompleted
                            ? '2px solid #c9a84c'
                            : '2px solid rgba(255,255,255,0.2)',
                          borderRadius: '4px',
                          background: isCompleted ? '#c9a84c' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isCompleted && <Check size={14} color="#0a0610" />}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: isCompleted ? '#e8c96a' : '#f0ebff',
                        marginBottom: '8px',
                      }}
                    >
                      {action.title}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: isCompleted ? '#d4cee8' : '#9b8fb5',
                        lineHeight: 1.5,
                      }}
                    >
                      {getDynamicDescription(action)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Completion Celebration */}
      {completionPercentage === 100 && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(139,105,20,0.2))',
            border: '2px solid #c9a84c',
            borderRadius: '16px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#e8c96a',
              marginBottom: '16px',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            You Did It!
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#f0ebff',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            30 days complete. You've built your portfolio, pitched brands, and
            launched your UGC career. This is just the beginning. Keep creating,
            keep pitching, and keep growing.
          </p>
        </div>
      )}
    </div>
  );
}
