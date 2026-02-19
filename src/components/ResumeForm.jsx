import { useState } from 'react'

export default function ResumeForm({
  resume,
  onUpdatePersonal,
  onUpdateSummary,
  onUpdateSkills,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  industryKeywords,
  verbs
}) {
  const [skillInput, setSkillInput] = useState('')
  const [showVerbSuggestions, setShowVerbSuggestions] = useState(null) // experience id

  // Add a skill
  const handleAddSkill = () => {
    if (skillInput.trim()) {
      onUpdateSkills([...resume.skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (index) => {
    const newSkills = [...resume.skills]
    newSkills.splice(index, 1)
    onUpdateSkills(newSkills)
  }

  // Keyword highlighting: if any skill matches industry keywords, we can mark as "good"
  const keywordSet = new Set(industryKeywords.map(k => k.toLowerCase()))
  const getSkillClass = (skill) => {
    return keywordSet.has(skill.toLowerCase()) ? 'keyword-match' : ''
  }

  return (
    <div className="resume-form">
      {/* Personal details */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Personal details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label>Full name</label>
            <input
              type="text"
              value={resume.personal.fullName}
              onChange={(e) => onUpdatePersonal('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={resume.personal.email}
              onChange={(e) => onUpdatePersonal('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              value={resume.personal.phone}
              onChange={(e) => onUpdatePersonal('phone', e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={resume.personal.location}
              onChange={(e) => onUpdatePersonal('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>
      </div>

      {/* Professional summary */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Professional summary</h3>
        <textarea
          rows="3"
          value={resume.summary}
          onChange={(e) => onUpdateSummary(e.target.value)}
          placeholder="Brief overview of your career and goals..."
        />
      </div>

      {/* Skills section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Skills</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. JavaScript"
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button className="btn" onClick={handleAddSkill} style={{ whiteSpace: 'nowrap' }}>
            Add skill
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {resume.skills.map((skill, idx) => (
            <span
              key={idx}
              className={`glass-card ${getSkillClass(skill)}`}
              style={{
                padding: '0.3rem 0.8rem',
                borderRadius: '30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: keywordSet.has(skill.toLowerCase()) ? 'rgba(102, 126, 234, 0.3)' : undefined,
              }}
            >
              {skill}
              <button
                onClick={() => removeSkill(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {industryKeywords.length > 0 && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
            <span style={{ opacity: 0.7 }}>Suggested: </span>
            {industryKeywords.slice(0, 5).map((kw, i) => (
              <button
                key={i}
                className="btn"
                style={{ margin: '0.2rem', padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}
                onClick={() => {
                  if (!resume.skills.includes(kw)) {
                    onUpdateSkills([...resume.skills, kw])
                  }
                }}
              >
                + {kw}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Experience section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Experience</h3>
          <button className="btn" onClick={onAddExperience}>
            + Add experience
          </button>
        </div>

        {resume.experiences.map((exp, index) => (
          <div key={exp.id} className="glass-card" style={{ padding: '1rem', marginBottom: '1rem', position: 'relative' }}>
            {resume.experiences.length > 1 && (
              <button
                onClick={() => onRemoveExperience(exp.id)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'none',
                  border: 'none',
                  color: '#ff6b6b',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label>Job title</label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => onUpdateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div>
                <label>Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onUpdateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label>Start date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => onUpdateExperience(exp.id, 'startDate', e.target.value)}
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <label>End date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => onUpdateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label>Description (use action verbs)</label>
              <textarea
                rows="3"
                value={exp.description}
                onChange={(e) => onUpdateExperience(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                onFocus={() => setShowVerbSuggestions(exp.id)}
                onBlur={() => setTimeout(() => setShowVerbSuggestions(null), 200)}
              />
            </div>

            {/* Verb suggestions (when field focused) */}
            {showVerbSuggestions === exp.id && verbs && (
              <div
                className="glass-card"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  💪 Try these action verbs:
                </div>
                {verbs.map((cat) => (
                  <div key={cat.name} style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{cat.name}</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.2rem' }}>
                      {cat.verbs.slice(0, 4).map((verb) => (
                        <button
                          key={verb}
                          className="btn"
                          style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}
                          onClick={() => {
                            const newDesc = verb + ' ' + exp.description.replace(/^[A-Z][a-z]+ed\s*/, ''); // simple prepend, could be smarter
                            onUpdateExperience(exp.id, 'description', newDesc)
                          }}
                        >
                          {verb}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
