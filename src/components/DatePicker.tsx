import { useMemo } from 'react';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export default function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const months = useMemo(() => [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);
  const years = useMemo(() => [2025, 2026, 2027], []);

  const currentDate = value || new Date();
  const selectedDay = currentDate.getDate();
  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();

  const handleDayChange = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    onChange(newDate);
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(selectedYear, monthIndex, selectedDay);
    onChange(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, selectedMonth, selectedDay);
    onChange(newDate);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
      <select
        value={selectedDay}
        onChange={(e) => handleDayChange(Number(e.target.value))}
        style={{
          flex: 1,
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#f0ebff',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {days.map(day => (
          <option key={day} value={day} style={{ background: '#1c1a35' }}>
            {day}
          </option>
        ))}
      </select>

      <select
        value={selectedMonth}
        onChange={(e) => handleMonthChange(Number(e.target.value))}
        style={{
          flex: 2,
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#f0ebff',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {months.map((month, index) => (
          <option key={month} value={index} style={{ background: '#1c1a35' }}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => handleYearChange(Number(e.target.value))}
        style={{
          flex: 1,
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#f0ebff',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {years.map(year => (
          <option key={year} value={year} style={{ background: '#1c1a35' }}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
