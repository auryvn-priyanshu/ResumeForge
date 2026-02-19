import { Sparkles } from 'lucide-react'

export default function Navbar({ onUpgrade, isPremium }) {
  return (
    <nav className="glass-card" style={{
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: '1rem',
      zIndex: 100,
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7H17" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 12H17" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17H13" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round"/>
          <defs>
            <linearGradient id="grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#667eea"/>
              <stop offset="1" stopColor="#764ba2"/>
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>
          Resume<span style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span> AI
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isPremium ? (
          <span style={{
            background: 'rgba(255,215,0,0.2)',
            backdropFilter: 'blur(4px)',
            padding: '0.25rem 1rem',
            borderRadius: '30px',
            border: '1px solid gold',
            color: 'gold',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            ✦ PREMIUM
          </span>
        ) : (
          <button
            className="btn btn-primary btn-glow"
            onClick={onUpgrade}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Sparkles size={18} />
            Upgrade
          </button>
        )}
      </div>
    </nav>
  )
}
