import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function EventCard({ event }) {
  const { user, registrations, toggleRegistration } = useAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [liveCount, setLiveCount] = useState(null)

  const isRegistered = registrations.includes(event.id)
  const count = liveCount ?? event.registeredCount
  const seatsLeft = event.capacity - count

  const handleClick = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/events' } })
      return
    }
    setBusy(true)
    setError('')
    const result = await toggleRegistration(event.id)
    if (result.ok) setLiveCount(result.event.registeredCount)
    else setError(result.error)
    setBusy(false)
  }

  return (
    <article className="bg-sand-50 border border-sand-300 flex flex-col">
      <div className="aspect-[16/9] overflow-hidden">
        <img src={event.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="tag bg-forest-50 text-forest-700 w-fit mb-3">{event.category}</span>
        <h3 className="text-lg font-semibold text-forest-900 mb-1">{event.title}</h3>
        <p className="text-sm text-ink/60 mb-3">Organized by {event.organizer}</p>

        <div className="space-y-1.5 text-sm text-ink/70 mb-4">
          <p className="flex items-center gap-2"><Calendar size={14} className="text-forest-600" /> {formatDate(event.date)} · {event.time}</p>
          <p className="flex items-center gap-2"><MapPin size={14} className="text-forest-600" /> {event.location}</p>
          <p className="flex items-center gap-2"><Users size={14} className="text-forest-600" /> {count}/{event.capacity} registered</p>
        </div>

        {error && <p className="text-xs text-red-700 mb-2">{error}</p>}

        <button
          onClick={handleClick}
          disabled={busy || (!isRegistered && seatsLeft <= 0)}
          className={isRegistered ? 'btn-secondary text-sm w-full mt-auto' : 'btn-primary text-sm w-full mt-auto'}
        >
          {busy ? (
            'Please wait…'
          ) : isRegistered ? (
            <>
              <Check size={15} /> Registered
            </>
          ) : seatsLeft <= 0 ? (
            'Fully booked'
          ) : (
            'Register now'
          )}
        </button>
      </div>
    </article>
  )
}
