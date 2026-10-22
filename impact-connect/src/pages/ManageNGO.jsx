import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { categories } from '../data/mockData'
import { Loading } from '../components/Status'

const empty = { name: '', category: '', location: '', tagline: '', about: '', needs: '', image: '' }

// One page used for both: /ngos/new (create) and /ngos/:id/edit (update)
export default function ManageNGO() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(isEdit)
  const [blocked, setBlocked] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // When editing, load the existing NGO and fill the form
  useEffect(() => {
    if (!isEdit) return
    api
      .getNgo(id)
      .then((ngo) => {
        if (ngo.createdBy !== user.id) {
          setBlocked(true)
          setError('You can only edit organizations you created.')
        } else {
          setForm({
            name: ngo.name,
            category: ngo.category,
            location: ngo.location || '',
            tagline: ngo.tagline || '',
            about: ngo.about || '',
            needs: (ngo.needs || []).join(', '),
            image: ngo.image || '',
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        setBlocked(true)
        setError(err.message)
        setLoading(false)
      })
  }, [id, isEdit, user.id])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.category || !form.location.trim() || !form.tagline.trim()) {
      setError('Name, category, location and tagline are required.')
      return
    }
    const payload = {
      name: form.name.trim(),
      category: form.category,
      location: form.location.trim(),
      tagline: form.tagline.trim(),
      about: form.about.trim(),
      needs: form.needs.split(',').map((s) => s.trim()).filter(Boolean),
    }
    if (form.image.trim()) payload.image = form.image.trim()

    setSaving(true)
    try {
      if (isEdit) await api.updateNgo(id, payload) // PUT  -> Express -> MongoDB
      else await api.createNgo(payload) //            POST -> Express -> MongoDB
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
        <p className="text-ink/70 mb-6">
          You are logged in as a {user.role}. Only accounts registered with the NGO role can add
          organizations. Log out and register a new account with the NGO role to try this.
        </p>
        <Link to="/dashboard" className="btn-secondary inline-flex">Back to dashboard</Link>
      </div>
    )
  }

  if (loading) return <Loading text="Loading organization…" />

  return (
    <div className="container-page py-12 max-w-2xl">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-forest-700 mb-6">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <h1 className="text-3xl mb-2">{isEdit ? 'Edit organization' : 'Add your organization'}</h1>
      <p className="text-ink/60 mb-8">
        {isEdit ? 'Update the details below and save.' : 'It will appear on Explore NGOs as soon as you save.'}
      </p>

      {blocked ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="field-label" htmlFor="name">Organization name</label>
            <input id="name" className="field" value={form.name} onChange={update('name')} placeholder="e.g. Helping Hands Trust" />
          </div>
          <div>
            <label className="field-label" htmlFor="category">Category</label>
            <select id="category" className="field" value={form.category} onChange={update('category')}>
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="location">Location</label>
            <input id="location" className="field" value={form.location} onChange={update('location')} placeholder="e.g. Vellore" />
          </div>
          <div>
            <label className="field-label" htmlFor="tagline">One-line summary</label>
            <input id="tagline" className="field" value={form.tagline} onChange={update('tagline')} placeholder="What does your organization do?" />
          </div>
          <div>
            <label className="field-label" htmlFor="about">About (optional)</label>
            <textarea id="about" rows={4} className="field" value={form.about} onChange={update('about')} />
          </div>
          <div>
            <label className="field-label" htmlFor="needs">Where you need help (optional, separate with commas)</label>
            <input id="needs" className="field" value={form.needs} onChange={update('needs')} placeholder="Weekend tutors, Book donations" />
          </div>
          <div>
            <label className="field-label" htmlFor="image">Image link (optional)</label>
            <input id="image" className="field" value={form.image} onChange={update('image')} placeholder="https://..." />
          </div>

          {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add organization'}
          </button>
        </form>
      )}
    </div>
  )
}
