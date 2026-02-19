import { useState } from 'react'

export default function IndustrySelector({ industries, selected, onChange }) {
  const currentIndustry = industries.find(ind => ind.id === selected) || industries[0]

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label htmlFor="industry">Select your industry</label>
      <select
        id="industry"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="glass-card"
        style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.2)' }}
      >
        {industries.map((ind) => (
          <option key={ind.id} value={ind.id} style={{ background: '#2a2a4a', color: '#fff' }}>
            {ind.name}
          </option>
        ))}
      </select>

      {currentIndustry && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>✨ Industry tips</div>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', opacity: 0.9 }}>
            {currentIndustry.resumeTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
          <div style={{ marginTop: '0.75rem' }}>
            <span style={{ fontWeight: 500 }}>Top keywords: </span>
            {currentIndustry.keywords.slice(0, 5).join(' · ')}
          </div>
        </div>
      )}
    </div>
  )
}
