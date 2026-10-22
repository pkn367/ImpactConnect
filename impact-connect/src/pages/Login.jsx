import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Heart, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Enter your email and password to continue.')
      return
    }
    setSubmitting(true)
    try {
      const result = await login(form)
      if (!result.ok) {
        setError(result.error)
        return
      }
      navigate(from, { replace: true })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false) // always unfreezes the button
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-forest-800 text-sand-50 p-12 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-amber-500 text-forest-900">
              <Heart size={16} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="font-display text-lg font-semibold">ImpactConnect</span>
          </Link>
        </div>
        <div className="relative max-w-md">
          <p className="font-display text-3xl leading-snug mb-4">
            "The easiest sign-up I've done for anything — and the most rewarding thing I check every week."
          </p>
          <p className="text-sand-100/70 text-sm">Priya R. — Volunteer since 2024</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl mb-2">Welcome back</h1>
          <p className="text-ink/60 mb-8">Log in to continue to your dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="field-label">Email address</label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} className="field" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={update('password')}
                  className="field pr-11"
                  placeholder="••••••••"
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
              <LogIn size={16} /> {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="text-sm text-ink/60 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-forest-700 hover:text-forest-800">Join Impact</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
