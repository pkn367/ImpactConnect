import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, Calendar, MapPin, Users } from 'lucide-react'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import EventCard from '../components/EventCard'
import { Loading } from '../components/Status'

export default function NGODetail() {
  const { id } = useParams()
  const { data: ngo, loading, error } = useAsync(() => api.getNgo(id), [id])
  const { data: allEvents } = useAsync(() => api.getEvents(), [])
  const relatedEvents = (allEvents || []).filter((e) => e.organizerId === id)

  if (loading) return <Loading text="Loading organization…" />

  if (error || !ngo) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl mb-4">Organization not found</h1>
        <Link to="/ngos" className="btn-primary inline-flex">Back to Explore NGOs</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-[21/9] w-full overflow-hidden">
        <img src={ngo.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container-page py-12">
        <Link to="/ngos" className="inline-flex items-center gap-1 text-sm text-forest-700 hover:text-forest-800 mb-6">
          <ArrowLeft size={15} /> Back to Explore NGOs
        </Link>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <span className="tag bg-forest-50 text-forest-700 mb-3">{ngo.category}</span>
            <h1 className="text-4xl mb-2">{ngo.name}</h1>
            {ngo.verified && (
              <p className="flex items-center gap-1 text-sm font-medium text-forest-600 mb-6">
                <BadgeCheck size={15} /> Verified organization
              </p>
            )}
            <p className="text-lg text-ink/70 leading-relaxed mb-8">{ngo.about}</p>

            <h2 className="text-xl mb-4">Where they need help</h2>
            <ul className="space-y-2 mb-10">
              {ngo.needs.map((need) => (
                <li key={need} className="flex items-start gap-2 text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 bg-amber-500 shrink-0" />
                  {need}
                </li>
              ))}
            </ul>

            {relatedEvents.length > 0 && (
              <>
                <h2 className="text-xl mb-4">Upcoming events by {ngo.name}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedEvents.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="border border-sand-300 bg-sand-50 p-6 h-fit space-y-5">
            <div>
              <p className="text-xs font-medium text-ink/50 mb-1">Location</p>
              <p className="flex items-center gap-2 text-ink"><MapPin size={15} className="text-forest-600" /> {ngo.location}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink/50 mb-1">Founded</p>
              <p className="flex items-center gap-2 text-ink"><Calendar size={15} className="text-forest-600" /> {ngo.founded}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink/50 mb-1">Volunteer network</p>
              <p className="flex items-center gap-2 text-ink"><Users size={15} className="text-forest-600" /> {ngo.volunteers.toLocaleString()} volunteers</p>
            </div>
            <Link to="/register" className="btn-primary w-full mt-2">Volunteer with {ngo.name.split(' ')[0]}</Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
