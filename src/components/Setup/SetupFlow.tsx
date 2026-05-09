import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import ProgressBar from '../Layout/ProgressBar';
import SetupSidebar from './SetupSidebar';
import SetupComplete from './SetupComplete';
import SetupStep1Profession from './SetupStep1Profession';
import SetupStep2Audience from './SetupStep2Audience';
import SetupStep3Voice from './SetupStep3Voice';

const fadeTransition = { duration: 0.22 };

/**
 * 3-step setup plus Phase B placeholder. Expects Velour gradient behind the flex row (App shell).
 */
export default function SetupFlow() {
  const setupComplete = useCampaignStore((s) => s.setupComplete);
  const resetMode = useCampaignStore((s) => s.resetMode);
  const setField = useCampaignStore((s) => s.setField);

  const [phase, setPhase] = useState<'steps' | 'placeholder'>(() => (useCampaignStore.getState().setupComplete ? 'placeholder' : 'steps'));
  const [setupStep, setSetupStep] = useState(1);
  const [furthestStep, setFurthestStep] = useState(1);
  /** When setup is marked complete but user returns to Voice from the complete screen without clearing completion. */
  const [resumeStepsAfterComplete, setResumeStepsAfterComplete] = useState(false);

  useEffect(() => {
    if (setupComplete && !resumeStepsAfterComplete) {
      setPhase('placeholder');
      setFurthestStep(3);
    }
  }, [setupComplete, resumeStepsAfterComplete]);

  const bumpFurthest = useCallback((n: number) => {
    setFurthestStep((prev) => Math.max(prev, n));
  }, []);

  const handleStepClick = useCallback(
    (n: number) => {
      if (phase === 'steps' && n <= furthestStep && n !== setupStep) {
        setSetupStep(n);
      }
    },
    [phase, furthestStep, setupStep]
  );

  const handleEditSetup = useCallback(() => {
    setResumeStepsAfterComplete(false);
    setField('setupComplete', false);
    setPhase('steps');
    setSetupStep(1);
    bumpFurthest(3);
  }, [setField, bumpFurthest]);

  const handleBackFromCompleteToVoice = useCallback(() => {
    setResumeStepsAfterComplete(true);
    setPhase('steps');
    setSetupStep(3);
    bumpFurthest(3);
  }, [bumpFurthest]);

  const showProgress = phase === 'steps';

  return (
    <>
      <SetupSidebar phase={phase} setupStep={setupStep} furthestStep={furthestStep} onStepClick={handleStepClick} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'relative', minHeight: '100vh' }}>
        {showProgress && <ProgressBar currentStep={setupStep} totalSteps={3} />}

        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-0"
          style={{
            height: 'min(380px, 48vh)',
            background: 'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(212, 169, 60, 0.10) 0%, transparent 72%)',
          }}
          aria-hidden
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            minHeight: '100vh',
            padding: '40px',
            overflowY: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              background: '#252B5F',
              border: '1px solid rgba(212, 169, 60, 0.25)',
              borderRadius: '20px',
              padding: '44px 48px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            }}
          >
            <AnimatePresence mode="sync">
              {phase === 'placeholder' ? (
                <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
                  <SetupComplete onEditSetup={handleEditSetup} onBackToVoice={handleBackFromCompleteToVoice} />
                </motion.div>
              ) : setupStep === 1 ? (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
                  <SetupStep1Profession
                    onExitToHome={() => resetMode()}
                    onNext={() => {
                      setSetupStep(2);
                      bumpFurthest(2);
                    }}
                  />
                </motion.div>
              ) : setupStep === 2 ? (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
                  <SetupStep2Audience
                    onBack={() => setSetupStep(1)}
                    onNext={() => {
                      setSetupStep(3);
                      bumpFurthest(3);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
                  <SetupStep3Voice
                    onBack={() => setSetupStep(2)}
                    onComplete={() => {
                      bumpFurthest(3);
                      setResumeStepsAfterComplete(false);
                      setPhase('placeholder');
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
