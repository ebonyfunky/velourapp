import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../../store/campaignStore';
import { Calendar, Clock } from 'lucide-react';
import DatePicker from '../DatePicker';

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (EST) — UTC-5' },
  { value: 'America/Chicago', label: 'Central Time (CST) — UTC-6' },
  { value: 'America/Denver', label: 'Mountain Time (MST) — UTC-7' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PST) — UTC-8' },
  { value: 'Europe/London', label: 'London (GMT/BST) — UTC+0/+1' },
  { value: 'Africa/Lagos', label: 'Lagos (WAT) — UTC+1' },
  { value: 'Africa/Nairobi', label: 'Nairobi (EAT) — UTC+3' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST) — UTC+2' },
  { value: 'Africa/Accra', label: 'Accra (GMT) — UTC+0' },
  { value: 'Asia/Dubai', label: 'Dubai (GST) — UTC+4' },
  { value: 'Asia/Kolkata', label: 'India (IST) — UTC+5:30' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT) — UTC+8' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST) — UTC+10' },
  { value: 'auto', label: 'Auto-detect from browser' },
];

const durations = ['1 Week', '2 Weeks', '1 Month', '2 Months', '3 Months', '6 Months'];
const postsPerWeekOptions = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 4, label: '4x' },
  { value: 5, label: '5x' },
];
const postsPerDayOptions = [
  { value: 7, label: '1/day' },
  { value: 14, label: '2/day' },
  { value: 21, label: '3/day' },
];

export default function Step6({ onNext, onBack }: Step6Props) {
  const { timezone, campaignDuration, postsPerWeek, updateStep6 } = useCampaignStore();

  const [localTimezone, setLocalTimezone] = useState(
    timezone || 'America/New_York'
  );
  const [localDuration, setLocalDuration] = useState(campaignDuration || '1 Month');
  const [localPostsPerWeek, setLocalPostsPerWeek] = useState(postsPerWeek || 3);
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);

  const handleContinue = () => {
    updateStep6({
      timezone: localTimezone === 'auto' ? Intl.DateTimeFormat().resolvedOptions().timeZone : localTimezone,
      campaignDuration: localDuration,
      postsPerWeek: localPostsPerWeek,
      startDate,
    });
    onNext();
  };

  const canProceed = startDate && localTimezone && localDuration && localPostsPerWeek;

  const calculateTotalPosts = () => {
    const durationValue = localDuration;
    let weeks = 0;

    if (durationValue.includes('Week')) {
      weeks = parseInt(durationValue);
    } else if (durationValue.includes('Month')) {
      weeks = parseInt(durationValue) * 4;
    }

    return localPostsPerWeek * weeks;
  };

  const calculateEndDate = () => {
    if (!startDate || !localDuration) return '';

    const start = new Date(startDate);
    const durationValue = localDuration;
    let daysToAdd = 0;

    if (durationValue.includes('Week')) {
      daysToAdd = parseInt(durationValue) * 7;
    } else if (durationValue.includes('Month')) {
      daysToAdd = parseInt(durationValue) * 30;
    }

    const endDate = new Date(start);
    endDate.setDate(endDate.getDate() + daysToAdd);

    return endDate.toISOString().split('T')[0];
  };

  const getFrequencyLabel = () => {
    if (localPostsPerWeek >= 7) {
      const perDay = localPostsPerWeek / 7;
      return `${perDay} post${perDay > 1 ? 's' : ''} per day`;
    }
    return `${localPostsPerWeek} posts per week`;
  };

  const getPeakTimeMessage = () => {
    if (localTimezone === 'America/New_York' || localTimezone === 'America/Chicago') {
      return 'Peak engagement: 6:00 PM - 8:00 PM EST';
    } else if (
      localTimezone === 'Africa/Lagos' ||
      localTimezone === 'Africa/Accra' ||
      localTimezone === 'Africa/Johannesburg' ||
      localTimezone === 'Africa/Nairobi'
    ) {
      return 'Peak engagement: 7:00 PM - 10:00 PM WAT';
    } else if (localTimezone === 'Europe/London') {
      return 'Peak engagement: 7:00 PM - 9:00 PM GMT';
    } else if (localTimezone === 'Asia/Dubai') {
      return 'Peak engagement: 8:00 PM - 10:00 PM GST';
    } else {
      return 'Peak engagement: Evening hours in your local timezone';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="gradient-text mb-2">Content Calendar</h1>
        <p className="text-gold text-[14px] font-semibold italic">Plan your rollout and own the algorithm</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="input-label">YOUR TIMEZONE</label>
          <select
            value={localTimezone}
            onChange={(e) => setLocalTimezone(e.target.value)}
            className="input-field"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <p
            className="mt-3 text-center p-3 rounded-lg"
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.2)',
              fontSize: '12px',
              color: '#e8c96a',
              fontStyle: 'italic',
            }}
          >
            {getPeakTimeMessage()}
          </p>
        </div>

        <div>
          <label className="input-label">Campaign Duration</label>
          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => setLocalDuration(duration)}
                className={`pill ${localDuration === duration ? 'active' : ''}`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="input-label">Posting Frequency</label>

          <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', marginTop: '12px', marginBottom: '8px' }}>
            Posts per week
          </div>
          <div className="flex flex-wrap gap-2">
            {postsPerWeekOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLocalPostsPerWeek(option.value)}
                style={{
                  whiteSpace: 'nowrap',
                  borderRadius: '100px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: localPostsPerWeek === option.value ? 700 : 600,
                  cursor: 'pointer',
                  background: localPostsPerWeek === option.value
                    ? 'rgba(201,168,76,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: localPostsPerWeek === option.value
                    ? '1.5px solid #c9a84c'
                    : '1px solid rgba(255,255,255,0.12)',
                  color: localPostsPerWeek === option.value ? '#e8c96a' : '#9b8fb5',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, color: '#e8c96a', marginTop: '12px', marginBottom: '8px' }}>
            Posts per day
          </div>
          <div className="flex flex-wrap gap-2">
            {postsPerDayOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLocalPostsPerWeek(option.value)}
                style={{
                  whiteSpace: 'nowrap',
                  borderRadius: '100px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: localPostsPerWeek === option.value ? 700 : 600,
                  cursor: 'pointer',
                  background: localPostsPerWeek === option.value
                    ? 'rgba(201,168,76,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: localPostsPerWeek === option.value
                    ? '1.5px solid #c9a84c'
                    : '1px solid rgba(255,255,255,0.12)',
                  color: localPostsPerWeek === option.value ? '#e8c96a' : '#9b8fb5',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="input-label">Start Date</label>
          <DatePicker
            value={startDate ? new Date(startDate) : new Date()}
            onChange={(date) => setStartDate(date.toISOString().split('T')[0])}
          />
        </div>

        <div
          className="velour-card p-6"
          style={{
            background: 'rgba(201,168,76,0.06)',
            borderColor: 'rgba(201,168,76,0.3)',
          }}
        >
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-[16px] font-bold text-gold mb-2">Content Calendar Preview</h3>
              <p className="text-[14px] text-text-body leading-relaxed mb-2">
                Based on your settings, you'll create:
              </p>
              <ul className="space-y-1 text-[13px] text-text-dim">
                <li>• {getFrequencyLabel()}</li>
                <li>• Campaign duration: {localDuration}</li>
                <li>• Total posts: {calculateTotalPosts()}</li>
                {startDate && <li>• Start date: {new Date(startDate).toLocaleDateString()}</li>}
                {startDate && <li>• Est. end date: {new Date(calculateEndDate()).toLocaleDateString()}</li>}
                <li>• Optimized for {localTimezone === 'auto' ? 'your timezone' : localTimezone.split('/')[1]?.replace('_', ' ')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button onClick={handleContinue} disabled={!canProceed} className="btn-primary flex-1">
          Continue to Campaign Pack →
        </button>
      </div>
    </motion.div>
  );
}
