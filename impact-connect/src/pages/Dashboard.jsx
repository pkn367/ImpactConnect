import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, LogOut, ArrowRight, Plus, Pencil, Trash2, Repeat } from 'lucide-react'
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
  const { user, logout, registrations, cancelRegistration, switchRegistration } = useAuth()
  const [ngoRefresh, setNgoRefresh] = useState(0)
  const [eventRefresh, setEventRefresh] = useState(0)
  const [actionError, setActionError] = useState('')
  const [notice, setNotice] = useState('')
  const [switchingId, setSwitchingId] = useState(null) // event whose "switch" panel is open
  const [targetId, setTargetId] = useState('')
  const [busyId, setBusyId] = useState(null)

  const { data: events, loading, error } = useAsync(() => api.getEvents(), [eventRefresh])
  const ngosState = useAsync(
    () => (user.role === 'NGO' ? api.getNgos() : Promise.resolve([])),
    [user.role, ngoRefresh]
  )

  const byDate = (a, b) => a.date.localeCompare(b.date)
  const registeredEvents = (events || []).filter((e) => registrations.includes(e.id)).sort(byDate)
  // Events the user could switch to: not already joined, and with free seats
  const switchOptions = (events || [])
    .filter((e) => !registrations.includes(e.id) && e.capacity - e.registeredCount > 0)
    .sort(byDate)
  const myNgos = (ngosState.data || []).filter((n) => n.createdBy === user.id)

  const clearMessages = () => {
    setActionError('')
    setNotice('')
  }

  // DELETE a registration
  const handleCancel = async (ev) => {
    if (!window.confirm(`Cancel your registration for ${ev.title}?`)) return
    clearMessages()
    setBusyId(ev.id)
    const result = await cancelRegistration(ev.id)
    setBusyId(null)
    if (result.ok) {
      setNotice(`Your registration for ${ev.title} was cancelled.`)
      setSwitchingId(null)
      setEventRefresh((n) => n + 1)
    } else {
      setActionError(result.error)
    }
  }

  const openSwitch = (ev) => {
    clearMessages()
    setSwitchingId(ev.id)
    setTargetId('')
  }

  // UPDATE a registration: move it to a different event
  const handleSwitch = async (ev) => {
    if (!targetId) {
      setActionError('Choose the event you want to switch to.')
      return
    }
    clearMessages()
    const target = switchOptions.find((e) => e.id === targetId)
    setBusyId(ev.id)
    const result = await switchRegistration(ev.id, targetId)
    setBusyId(null)
    if (result.ok) {
      setNotice(`Switched from ${ev.title} to ${target ? target.title : 'the new event'}.`)
      setSwitchingId(null)
      setTargetId('')
      setEventRefresh((n) => n + 1)
    } else {
      setActionError(result.error)
    }
  }

  const handleDeleteNgo = async (ngo) => {
    if (!window.confirm(`Delete ${ngo.name}? This cannot be undone.`)) return
    clearMessages()
    try {
      await api.deleteNgo(ngo.id)
      setNgoRefresh((r) => r + 1)
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

      {notice && (
        <p className="mt-8 text-sm text-forest-800 bg-forest-50 border border-forest-200 px-4 py-3">{notice}</p>
      )}
      {actionError && <ErrorMessage message={actionError} />}

      {user.role === 'NGO' && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Your organizations</h2>
            <Link to="/ngos/new" className="btn-primary text-sm">
              <Plus size={15} /> Add organization
            </Link>
          </div>
          {ngosState.loading && !ngosState.data && <Loading text="Loading your organizations…" />}
          {ngosState.error && <ErrorMessage message={ngosState.error} />}
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
                    <button onClick={() => handleDeleteNgo(n)} className="btn-secondary text-sm px-4 py-2 text-red-700 border-red-300 hover:bg-red-50">
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
      {loading && !events && <Loading text="Loading your events…" />}
      {error && <ErrorMessage message={error} />}
      {events && registeredEvents.length === 0 && (
        <div className="border border-dashed border-sand-300 p-10 text-center">
          <p className="text-ink/60 mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="btn-primary inline-flex">
            Browse events <ArrowRight size={16} />
          </Link>
        </div>
      )}
      {registeredEvents.length > 0 && (
        <div className="divide-y divide-sand-300 border-t border-b border-sand-300">
          {registeredEvents.map((e) => (
            <div key={e.id} className="py-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-forest-900">{e.title}</p>
                  <p className="text-sm text-ink/60">Organized by {e.organizer}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink/70 mt-2">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(e.date)}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {e.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openSwitch(e)}
                    disabled={busyId === e.id}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    <Repeat size={14} /> Switch event
                  </button>
                  <button
                    onClick={() => handleCancel(e)}
                    disabled={busyId === e.id}
                    className="btn-secondary text-sm px-4 py-2 text-red-700 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Cancel registration
                  </button>
                </div>
              </div>

              {switchingId === e.id && (
                <div className="mt-4 bg-sand-50 border border-sand-300 p-5">
                  <p className="text-sm font-medium text-forest-900 mb-3">Switch to another event</p>
                  {switchOptions.length === 0 ? (
                    <p className="text-sm text-ink/60">There are no other events with free seats right now.</p>
                  ) : (
                    <select value={targetId} onChange={(ev) => setTargetId(ev.target.value)} className="field mb-4">
                      <option value="">Choose an event…</option>
                      {switchOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.title} — {formatDate(o.date)} — {o.capacity - o.registeredCount} seats left
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="flex items-center gap-3">
                    {switchOptions.length > 0 && (
                      <button onClick={() => handleSwitch(e)} disabled={busyId === e.id} className="btn-primary text-sm px-5 py-2">
                        {busyId === e.id ? 'Switching…' : 'Confirm switch'}
                      </button>
                    )}
                    <button onClick={() => setSwitchingId(null)} className="btn-secondary text-sm px-5 py-2">
                      Keep my current event
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
