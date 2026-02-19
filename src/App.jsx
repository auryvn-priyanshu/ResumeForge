import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import IndustrySelector from './components/IndustrySelector'
import FeatureGate from './components/FeatureGate'
import industriesData from './data/industries.json'
import verbsData from './data/verbs.json'

// Initial resume structure
const initialResume = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  skills: [],
  experiences: [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-0',
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
}

function App() {
  const [resume, setResume] = useState(initialResume)
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData.industries[0]?.id || 'tech')
  const [isPremium, setIsPremium] = useState(false) // mock premium status

  const previewRef = useRef(null)

  // Compute basic ATS score (0-100) based on keyword matches from selected industry
  const industry = industriesData.industries.find(ind => ind.id === selectedIndustry) || industriesData.industries[0]
  const keywords = industry?.keywords || []

  const calculateBasicATS = () => {
    if (!keywords.length) return 0
    const textToSearch = [
      resume.summary,
      ...resume.skills,
      ...resume.experiences.map(exp => `${exp.jobTitle} ${exp.company} ${exp.description}`),
    ].join(' ').toLowerCase()

    let matches = 0
    keywords.forEach(keyword => {
      if (textToSearch.includes(keyword.toLowerCase())) matches++
    })
    // score = (matches / keywords.length) * 100, capped at 100
    return Math.min(100, Math.round((matches / keywords.length) * 100))
  }

  const basicATSScore = calculateBasicATS()

  // Advanced ATS (only for premium) – just a mock for now, could be more complex
  const advancedATSScore = isPremium ? Math.min(100, basicATSScore + 15) : null

  // Handlers for resume updates
  const updatePersonal = (field, value) => {
    setResume(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateSummary = (value) => {
    setResume(prev => ({ ...prev, summary: value }))
  }

  const updateSkills = (skillsArray) => {
    setResume(prev => ({ ...prev, skills: skillsArray }))
  }

  const updateExperience = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + prev.experiences.length,
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }))
  }

  const removeExperience = (id) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }))
  }

  // PDF download function
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return
    const html2canvas = (await import('html2canvas')).default
    const jsPDF = (await import('jspdf')).default

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: null, // transparent to preserve glass
        logging: false,
        allowTaint: false,
        useCORS: true,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width * 0.75, canvas.height * 0.75], // approximate
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75)
      pdf.save(`Resume-${resume.personal.fullName || 'Untitled'}.pdf`)
    } catch (error) {
      console.error('PDF generation failed', error)
    }
  }

  return (
    <>
      <Navbar onUpgrade={() => setIsPremium(true)} isPremium={isPremium} />
      <main className="container" style={{ paddingTop: '2rem' }}>
        <div className="grid-2">
          {/* LEFT COLUMN: FORM */}
          <section>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Build your resume</h2>
              <IndustrySelector
                industries={industriesData.industries}
                selected={selectedIndustry}
                onChange={setSelectedIndustry}
              />
              <ResumeForm
                resume={resume}
                onUpdatePersonal={updatePersonal}
                onUpdateSummary={updateSummary}
                onUpdateSkills={updateSkills}
                onUpdateExperience={updateExperience}
                onAddExperience={addExperience}
                onRemoveExperience={removeExperience}
                industryKeywords={keywords}
                verbs={verbsData.categories}
              />
            </div>
          </section>

          {/* RIGHT COLUMN: PREVIEW & ATS */}
          <section>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Live preview</h2>
                <button className="btn btn-primary" onClick={handleDownloadPDF}>
                  Download PDF
                </button>
              </div>

              {/* ATS Score Cards */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div className="glass-card" style={{ padding: '1rem', flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Basic ATS Match</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{basicATSScore}%</div>
                </div>
                <FeatureGate
                  isLocked={!isPremium}
                  featureName="Advanced ATS Score"
                  onUpgrade={() => setIsPremium(true)}
                >
                  <div className="glass-card" style={{ padding: '1rem', flex: 1, minWidth: '120px' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Advanced ATS</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{advancedATSScore}%</div>
                  </div>
                </FeatureGate>
                <FeatureGate
                  isLocked={!isPremium}
                  featureName="Premium Templates"
                  onUpgrade={() => setIsPremium(true)}
                >
                  <div className="glass-card" style={{ padding: '1rem', flex: 1, minWidth: '120px', cursor: 'pointer' }} onClick={() => alert('Template gallery would open')}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Templates</div>
                    <div style={{ fontSize: '1.2rem' }}>✨ 8 premium designs</div>
                  </div>
                </FeatureGate>
              </div>

              {/* Preview */}
              <div ref={previewRef}>
                <ResumePreview resume={resume} industry={industry} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
