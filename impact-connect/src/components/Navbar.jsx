import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/ngos', label: 'Explore NGOs' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur border-b border-sand-300">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="ImpactConnect" className="h-8 w-8 object-contain" />
          <span className="font-display text-lg font-semibold text-forest-800">ImpactConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-forest-700' : 'text-ink/70 hover:text-forest-700'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 border border-sand-300 hover:border-forest-400 transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center bg-forest-100 text-forest-700 text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-ink">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-ink/50" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-sand-50 border border-sand-300 shadow-lg py-1">
                  <div className="px-4 py-2 border-b border-sand-200">
                    <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                    <p className="text-xs text-ink/50 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-sand-100"
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-700 hover:bg-sand-100"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink/80 hover:text-forest-700">
                Log in
              </Link>
              <Link to="/register" className="btn-primary text-sm px-5 py-2.5">
                Join Impact
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-ink" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-sand-300 bg-sand-50 px-6 py-4 space-y-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-ink/80"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-sand-200 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-primary text-sm">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary text-sm">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-sm">
                  Join Impact
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
