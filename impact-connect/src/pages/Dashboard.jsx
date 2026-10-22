import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, LogOut, ArrowRight, Plus, Pencil, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { Loading, ErrorMessage } from '../components/Status'

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Dashboard() {
  const { user, logout, registrations } = useAuth()
  const [refresh, setRefresh] = useState(0)
  const [actionError, setActionError] = useState('')

  const { data: events, loading, error } = useAsync(() => api.getEvents(), [])
  const ngosState = useAsync(
    () => (user.role === 'NGO' ? api.getNgos() : Promise.resolve([])),
    [user.role, refresh]
  )

  const registeredEvents = (events || []).filter((e) => registrations.includes(e.id))
  const myNgos = (ngosState.data || []).filter((n) => n.createdBy === user.id)

  const handleDelete = async (ngo) => {
    if (!window.confirm(`Delete ${ngo.name}? This cannot be undone.`)) return
    setActionError('')
    try {
      await api.deleteNgo(ngo.id) // DELETE -> Express -> MongoDB
      setRefresh((r) => r + 1)
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <div className="container-page py-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-sand-300">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center bg-forest-100 text-forest-700 text-xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-forest-900">{user.name}</h1>
            <p className="text-sm text-ink/60">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="tag bg-forest-50 text-forest-700 border border-forest-200">{user.role}</span>
          <button onClick={logout} className="btn-secondary text-sm">
            <LogOut size={15} /> Log out
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-4">
        <div className="border border-sand-300 p-6">
          <p className="text-xs text-ink/50 mb-1">Member since</p>
          <p className="text-lg font-medium text-forest-900">
            {new Date(user.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="border border-sand-300 p-6">
          <p className="text-xs text-ink/50 mb-1">Events registered</p>
          <p className="text-lg font-medium text-forest-900">{registrations.length}</p>
        </div>
        <div className="border border-sand-300 p-6">
          <p className="text-xs text-ink/50 mb-1">Account type</p>
          <p className="text-lg font-medium text-forest-900">{user.role}</p>
        </div>
      </div>

      {user.role === 'NGO' && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Your organizations</h2>
            <Link to="/ngos/new" className="btn-primary text-sm">
              <Plus size={15} /> Add organization
            </Link>
          </div>
          {ngosState.loading && <Loading text="Loading your organizations…" />}
          {ngosState.error && <ErrorMessage message={ngosState.error} />}
          {actionError && <ErrorMessage message={actionError} />}
          {!ngosState.loading && !ngosState.error && myNgos.length === 0 && (
            <div className="border border-dashed border-sand-300 p-10 text-center">
              <p className="text-ink/60">You haven't added an organization yet.</p>
            </div>
          )}
          {myNgos.length > 0 && (
            <div className="divide-y divide-sand-300 border-t border-b border-sand-300">
              {myNgos.map((n) => (
                <div key={n.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5">
                  <div>
                    <Link to={`/ngos/${n.id}`} className="font-medium text-forest-900 hover:text-forest-600">{n.name}</Link>
                    <p className="text-sm text-ink/60">{n.category} · {n.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to={`/ngos/${n.id}/edit`} className="btn-secondary text-sm px-4 py-2">
                      <Pencil size={14} /> Edit
                    </Link>
                    <button onClick={() => handleDelete(n)} className="btn-secondary text-sm px-4 py-2 text-red-700 border-red-300 hover:bg-red-50">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <h2 className="text-2xl mt-12 mb-6">Your registered events</h2>
      {loading && <Loading text="Loading your events…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && registeredEvents.length === 0 && (
        <div className="border border-dashed border-sand-300 p-10 text-center">
          <p className="text-ink/60 mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="btn-primary inline-flex">
            Browse events <ArrowRight size={16} />
          </Link>
        </div>
      )}
      {!loading && !error && registeredEvents.length > 0 && (
        <div className="divide-y divide-sand-300 border-t border-b border-sand-300">
          {registeredEvents.map((e) => (
            <div key={e.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5">
              <div>
                <p className="font-medium text-forest-900">{e.title}</p>
                <p className="text-sm text-ink/60">Organized by {e.organizer}</p>
              </div>
              <div className="flex items-center gap-5 text-sm text-ink/70">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(e.date)}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {e.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
