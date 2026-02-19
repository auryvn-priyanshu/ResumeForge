export default function ResumePreview({ resume, industry }) {
  const { personal, summary, skills, experiences } = resume
  const { name: industryName = '', suggestedSkills = [] } = industry || {}

  // Helper to check if a skill is suggested for this industry
  const isSuggested = (skill) =>
    suggestedSkills.some((s) => s.toLowerCase() === skill.toLowerCase())

  return (
    <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.25)' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
          {personal.email && <span>📧 {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.3rem', marginBottom: '0.75rem' }}>
            Professional Summary
          </h2>
          <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.3rem', marginBottom: '0.75rem' }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="glass-card"
                style={{
                  padding: '0.25rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  background: isSuggested(skill) ? 'rgba(102, 126, 234, 0.3)' : undefined,
                  borderColor: isSuggested(skill) ? '#667eea' : undefined,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.some(exp => exp.jobTitle || exp.company) && (
        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.3rem', marginBottom: '0.75rem' }}>
            Work Experience
          </h2>
          {experiences.map((exp) => {
            if (!exp.jobTitle && !exp.company && !exp.description) return null // skip empty
            return (
              <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {exp.jobTitle || 'Untitled'}{exp.company && ` at ${exp.company}`}
                  </h3>
                  {(exp.startDate || exp.endDate) && (
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                      {exp.startDate} – {exp.endDate}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p style={{ marginTop: '0.3rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </p>
                )}
              </div>
            )
          })}
        </section>
      )}

      {/* If nothing at all, show a placeholder */}
      {!summary && skills.length === 0 && !experiences.some(e => e.jobTitle || e.company || e.description) && (
        <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
          <p>Your resume preview will appear here ✨</p>
        </div>
      )}
    </div>
  )
}
