import { Lock } from 'lucide-react'

export default function FeatureGate({ isLocked, featureName, onUpgrade, children }) {
  if (!isLocked) {
    return <>{children}</>
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Blurred background layer */}
      <div style={{ filter: 'blur(2px)', pointerEvents: 'none', opacity: 0.5 }}>
        {children}
      </div>

      {/* Lock overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(4px)',
          borderRadius: 'inherit',
          padding: '1rem',
        }}
      >
        <Lock size={32} style={{ marginBottom: '0.5rem', color: 'white' }} />
        <p style={{ fontWeight: 500, marginBottom: '1rem', color: 'white', textAlign: 'center' }}>
          {featureName} is locked
        </p>
        <button className="btn btn-primary btn-glow" onClick={onUpgrade}>
          Unlock with Premium
        </button>
      </div>
    </div>
  )
}
