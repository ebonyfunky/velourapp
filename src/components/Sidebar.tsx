import { Diamond } from 'lucide-react';

interface SidebarProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Campaign Identity' },
  { number: 2, title: 'Character & Assets' },
  { number: 3, title: 'Style & Aesthetics' },
  { number: 4, title: 'Review & Launch' },
];

export default function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-[260px] bg-bg-sidebar flex flex-col p-8"
      style={{
        borderRight: '1px solid transparent',
        borderImage: 'linear-gradient(to bottom, transparent 0%, #c9a84c 30%, #2e8b57 70%, transparent 100%) 1',
      }}
    >
      <div className="flex items-center gap-3 mb-16">
        <Diamond className="w-6 h-6 text-gold" fill="#c9a84c" />
        <h1 className="text-2xl font-bold text-gold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          VELOUR
        </h1>
      </div>

      <div className="flex flex-col gap-8 relative">
        <div
          className="absolute left-[15px] top-8 bottom-8 w-[2px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(180, 145, 40, 0.3) 0%, rgba(46, 139, 87, 0.3) 50%, rgba(180, 145, 40, 0.3) 100%)',
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <div key={step.number} className="flex items-start gap-4 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green text-text-primary'
                    : isCurrent
                    ? 'text-bg-main shadow-lg'
                    : 'bg-text-dim/30 text-text-muted border border-gold/20'
                }`}
                style={isCurrent ? {
                  background: 'linear-gradient(135deg, #c9a84c 0%, #8B6914 100%)',
                  boxShadow: '0 4px 12px rgba(201, 168, 76, 0.4)',
                } : {}}
              >
                {step.number}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCurrent ? 'text-gold' : isCompleted ? 'text-text-primary' : 'text-text-muted'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
