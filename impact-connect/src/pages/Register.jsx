import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Heart, UserPlus, GraduationCap, HeartHandshake, Building2, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const roles = [
  { id: 'Volunteer', label: 'Volunteer', text: 'Find opportunities to give your time', icon: HeartHandshake },
  { id: 'Donor', label: 'Donor', text: 'Support organizations financially', icon: GraduationCap },
  { id: 'NGO', label: 'NGO', text: 'List your organization & opportunities', icon: Building2 },
  { id: 'Corporate', label: 'Corporate', text: 'Run employee volunteering programs', icon: Briefcase },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email || !form.password || !form.role) {
      setError('Fill in every field, including your role, to create an account.')
      return
    }
    if (form.password.length < 6) {
      setError('Your password needs to be at least 6 characters.')
      return
    }
    setSubmitting(true)
    try {
      const result = await register(form)
      if (!result.ok) {
        setError(result.error)
        return
      }
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false) // always unfreezes the button
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <h1 className="text-3xl mb-2">Join ImpactConnect</h1>
          <p className="text-ink/60 mb-8">Start your journey as an impact volunteer.</p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <span className="field-label">I'm joining as a</span>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => {
                  const active = form.role === r.id
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setForm((f) => ({ ...f, role: r.id }))}
                      className={`text-left p-3.5 border transition-colors ${
                        active ? 'border-forest-600 bg-forest-50' : 'border-sand-300 bg-sand-50 hover:border-forest-300'
                      }`}
                    >
                      <r.icon size={18} className={active ? 'text-forest-700' : 'text-ink/50'} />
                      <p className={`text-sm font-medium mt-2 ${active ? 'text-forest-800' : 'text-ink'}`}>{r.label}</p>
                      <p className="text-xs text-ink/50 leading-snug mt-0.5">{r.text}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="field-label">Full name</label>
              <input id="name" type="text" autoComplete="name" value={form.name} onChange={update('name')} className="field" placeholder="Jane Doe" />
            </div>

            <div>
              <label htmlFor="email" className="field-label">Email address</label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="field-label">Create password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={update('password')}
                  className="field pr-11"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              <UserPlus size={16} /> {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-ink/60 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-forest-700 hover:text-forest-800">Log in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-between bg-forest-800 text-sand-50 p-12 relative overflow-hidden order-1 lg:order-2">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd59a93f9724?w=1000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative flex justify-end">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold">ImpactConnect</span>
            <span className="flex h-8 w-8 items-center justify-center bg-amber-500 text-forest-900">
              <Heart size={16} fill="currentColor" strokeWidth={0} />
            </span>
          </Link>
        </div>
        <div className="relative max-w-md ml-auto text-right">
          <p className="font-display text-3xl leading-snug mb-4">10,000+ volunteers already found their fit.</p>
          <p className="text-sand-100/70 text-sm">Yours takes about a minute to set up.</p>
        </div>
      </div>
    </div>
  )
}
