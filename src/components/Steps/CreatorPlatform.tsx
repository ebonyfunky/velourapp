export default function CreatorPlatform({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div style={{ color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ color: '#c9a84c', marginBottom: '16px' }}>Step 2 — Choose Your Platform</h2>
      <p style={{ color: '#9a8fa8', marginBottom: '24px' }}>Coming next</p>
      <button onClick={onBack} style={{ marginRight: '12px', background: 'transparent', border: '1px solid #c9a84c', color: '#c9a84c', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
      <button onClick={onNext} style={{ background: '#c9a84c', border: 'none', color: '#000', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Next</button>
    </div>
  )
}
