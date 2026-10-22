import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import NGOCard from '../components/NGOCard'
import EventCard from '../components/EventCard'
import { Loading, ErrorMessage } from '../components/Status'

export default function Home() {
  const ngosState = useAsync(() => api.getNgos(), [])
  const eventsState = useAsync(() => api.getEvents(), [])
  const statsState = useAsync(() => api.getStats(), [])

  // These numbers come live from MongoDB through the Express API
  const s = statsState.data
  const stats = [
    { label: 'Organizations', value: s ? s.ngos.toLocaleString() : '–' },
    { label: 'Upcoming events', value: s ? s.events.toLocaleString() : '–' },
    { label: 'Volunteers in our network', value: s ? s.networkVolunteers.toLocaleString() : '–' },
    { label: 'Event sign-ups', value: s ? s.signups.toLocaleString() : '–' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-50 border-b border-sand-300">
        <div className="container-page grid md:grid-cols-5 gap-12 py-20 md:py-28 items-center">
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-forest-600 mb-5">A home for volunteers, NGOs and donors</p>
            <h1 className="text-5xl sm:text-6xl leading-[1.05] mb-6">
              Connect people.
              <br />
              <span className="text-forest-600">Create impact.</span>
            </h1>
            <p className="text-lg text-ink/70 max-w-prose mb-9 leading-relaxed">
              ImpactConnect brings volunteers, verified NGOs and social-impact
              opportunities together in one place — so showing up for your
              community takes minutes, not weeks of searching.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/events" className="btn-primary">
                Explore opportunities <ArrowRight size={16} />
              </Link>
              <Link to="/ngos" className="btn-secondary">
                Discover NGOs
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80"
              alt=""
              className="aspect-[3/4] object-cover w-full"
            />
            <div className="flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=500&q=80"
                alt=""
                className="aspect-square object-cover w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
                alt=""
                className="aspect-square object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live stats from the database */}
      <section className="border-b border-sand-300 bg-sand-50">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-300">
          {stats.map((st) => (
            <div key={st.label} className="text-center py-8 px-4">
              <p className="font-display text-3xl font-semibold text-forest-700">{st.value}</p>
              <p className="text-sm text-ink/60 mt-1">{st.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-ink/40 pb-3">Live numbers from our database</p>
      </section>

      {/* NGOs */}
      <section className="py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-forest-600 mb-2">Discover</p>
              <h2 className="text-3xl sm:text-4xl">Organizations making a difference</h2>
            </div>
            <Link to="/ngos" className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-800">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          {ngosState.loading && <Loading text="Loading organizations…" />}
          {ngosState.error && <ErrorMessage message={ngosState.error} />}
          {ngosState.data && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngosState.data.slice(0, 3).map((ngo) => (
                <NGOCard key={ngo.id} ngo={ngo} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-forest-50 border-y border-sand-300">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-forest-600 mb-2">Get involved</p>
              <h2 className="text-3xl sm:text-4xl">Upcoming opportunities</h2>
            </div>
            <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-800">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          {eventsState.loading && <Loading text="Loading events…" />}
          {eventsState.error && <ErrorMessage message={eventsState.error} />}
          {eventsState.data && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsState.data.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container-page max-w-3xl">
          <Quote className="text-amber-500 mb-4" size={32} />
          <p className="font-display text-2xl sm:text-3xl leading-snug text-forest-900 mb-6">
            "I found a weekend teaching program within a day of signing up. Two
            years later, it's still the best part of my month."
          </p>
          <p className="text-sm text-ink/60">Priya R. — Volunteer since 2024</p>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-forest-800 text-sand-50">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl sm:text-4xl text-sand-50 mb-4">Ready to make a start?</h2>
          <p className="text-sand-100/70 max-w-prose mx-auto mb-8">
            Create a free account and join thousands of volunteers, NGOs and
            donors already working together on ImpactConnect.
          </p>
          <Link to="/register" className="btn-amber inline-flex">
            Join Impact <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
