import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { categories } from '../data/mockData'
import { Loading } from '../components/Status'

const emptyForm = {
  title: '',
  category: '',
  organizerId: '',
  date: '',
  time: '',
  location: '',
  capacity: 50,
  image: '',
  description: '',
}

export default function ManageEvent() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadForm() {
      try {
        const ownedNgos = await api.getNgos()
        const myNgos = ownedNgos.filter((ngo) => ngo.createdBy === user.id)
        if (cancelled) return
        setNgos(myNgos)

        if (isEdit) {
          const myEvents = await api.getMyEvents()
          const event = myEvents.find((item) => item.id === id)
          if (!event) throw new Error('You can only edit events organized by your organizations.')
          if (cancelled) return
          setForm({
            title: event.title || '',
            category: event.category || '',
            organizerId: event.organizerId || '',
            date: event.date || '',
            time: event.time || '',
            location: event.location || '',
            capacity: event.capacity || 1,
            image: event.image || '',
            description: event.description || '',
          })
        } else if (myNgos.length > 0) {
          setForm((current) => ({ ...current, organizerId: myNgos[0].id }))
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadForm()
    return () => {
      cancelled = true
    }
  }, [id, isEdit, user.id])

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.title.trim() || !form.category || !form.date || !form.time.trim() || !form.location.trim()) {
      setError('Title, category, date, time and location are required.')
      return
    }
    if (!Number.isInteger(Number(form.capacity)) || Number(form.capacity) < 1) {
      setError('Capacity must be a positive whole number.')
      return
    }
    if (!isEdit && !form.organizerId) {
      setError('Add an organization to your account before creating an event.')
      return
    }

    const payload = {
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      time: form.time.trim(),
      location: form.location.trim(),
      capacity: Number(form.capacity),
      image: form.image.trim(),
      description: form.description.trim(),
    }
    if (!isEdit) payload.organizerId = form.organizerId

    setSaving(true)
    try {
      if (isEdit) await api.updateEvent(id, payload)
      else await api.createEvent(payload)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (user.role !== 'NGO') {
    return (
      <div className="container-page py-24 max-w-xl">
        <h1 className="text-3xl mb-4">NGO accounts only</h1>
        <p className="text-ink/70 mb-6">Only NGO accounts can create or edit events.</p>
        <Link to="/dashboard" className="btn-secondary inline-flex">Back to dashboard</Link>
      </div>
    )
  }

  if (loading) return <Loading text="Loading event…" />

  return (
    <div className="container-page py-12 max-w-2xl">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-6">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="text-3xl mb-2">{isEdit ? 'Edit event' : 'Create an event'}</h1>
      <p className="text-ink/60 mb-8">
        {isEdit ? 'Update the event details and save them to the database.' : 'Your event will appear on the Events page after you save it.'}
      </p>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 mb-5">{error}</p>}
      {!isEdit && ngos.length === 0 ? (
        <div className="border border-sand-300 p-6">
          <p className="text-ink/70 mb-4">Add an organization to your account before creating an event.</p>
          <Link to="/ngos/new" className="btn-primary inline-flex">Add organization</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {!isEdit && (
            <div>
              <label className="field-label" htmlFor="organizerId">Organizing organization</label>
              <select id="organizerId" className="field" value={form.organizerId} onChange={update('organizerId')}>
                {ngos.map((ngo) => <option key={ngo.id} value={ngo.id}>{ngo.name}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="field-label" htmlFor="title">Event title</label>
            <input id="title" className="field" value={form.title} onChange={update('title')} required />
          </div>
          <div>
            <label className="field-label" htmlFor="category">Category</label>
            <select id="category" className="field" value={form.category} onChange={update('category')} required>
              <option value="">Select a category</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label" htmlFor="date">Date</label>
              <input id="date" type="date" className="field" value={form.date} onChange={update('date')} required />
            </div>
            <div>
              <label className="field-label" htmlFor="time">Time</label>
              <input id="time" className="field" value={form.time} onChange={update('time')} placeholder="e.g. 9:00 AM" required />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label" htmlFor="location">Location</label>
              <input id="location" className="field" value={form.location} onChange={update('location')} required />
            </div>
            <div>
              <label className="field-label" htmlFor="capacity">Capacity</label>
              <input id="capacity" type="number" min="1" step="1" className="field" value={form.capacity} onChange={update('capacity')} required />
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor="image">Image URL (optional)</label>
            <input id="image" type="url" className="field" value={form.image} onChange={update('image')} placeholder="https://..." />
          </div>
          <div>
            <label className="field-label" htmlFor="description">Description (optional)</label>
            <textarea id="description" rows={4} className="field" value={form.description} onChange={update('description')} />
          </div>
          <button type="submit" disabled={saving || (!isEdit && ngos.length === 0)} className="btn-primary">
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create event'}
          </button>
        </form>
      )}
    </div>
  )
}
