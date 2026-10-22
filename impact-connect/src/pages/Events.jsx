import { useMemo, useState } from 'react'
import { categories } from '../data/mockData'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import EventCard from '../components/EventCard'
import { Loading, ErrorMessage } from '../components/Status'

export default function Events() {
  const [category, setCategory] = useState('All')
  const { data: events, loading, error } = useAsync(() => api.getEvents(), [])

  const filtered = useMemo(() => {
    if (!events) return []
    return category === 'All' ? events : events.filter((e) => e.category === category)
  }, [events, category])

  return (
    <div>
      <section className="bg-forest-50 border-b border-sand-300 py-14">
        <div className="container-page">
          <p className="text-sm font-medium text-forest-600 mb-2">Get involved</p>
          <h1 className="text-4xl sm:text-5xl mb-4">Upcoming events</h1>
          <p className="text-ink/70 max-w-prose">
            Sign up for a volunteering slot in a few clicks. Your registrations
            are saved to your account so you can track them from your dashboard.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                category === c
                  ? 'bg-forest-600 text-sand-50 border-forest-600'
                  : 'bg-sand-50 text-ink/70 border-sand-300 hover:border-forest-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && <Loading text="Loading events…" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
