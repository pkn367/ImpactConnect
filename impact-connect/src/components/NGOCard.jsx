import { Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Users } from 'lucide-react'

const categoryColor = {
  Education: 'border-l-amber-500',
  Environment: 'border-l-forest-500',
  Healthcare: 'border-l-rose-500',
  'Animal Welfare': 'border-l-orange-500',
  'Youth Empowerment': 'border-l-sky-500',
}

export default function NGOCard({ ngo }) {
  return (
    <article className={`bg-sand-50 border border-sand-300 border-l-4 ${categoryColor[ngo.category] || 'border-l-forest-500'} flex flex-col`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={ngo.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="tag bg-forest-50 text-forest-700 w-fit mb-3">{ngo.category}</span>
        <h3 className="text-lg font-semibold text-forest-900 mb-1">{ngo.name}</h3>
        {ngo.verified && (
          <p className="flex items-center gap-1 text-xs font-medium text-forest-600 mb-2">
            <BadgeCheck size={13} /> Verified organization
          </p>
        )}
        <p className="text-sm text-ink/70 leading-relaxed mb-4 flex-1">{ngo.tagline}</p>
        <div className="flex items-center justify-between text-xs text-ink/50 mb-4">
          <span className="flex items-center gap-1"><MapPin size={13} /> {ngo.location}</span>
          <span className="flex items-center gap-1"><Users size={13} /> {ngo.volunteers.toLocaleString()}</span>
        </div>
        <Link to={`/ngos/${ngo.id}`} className="btn-secondary text-sm w-full">
          View profile
        </Link>
      </div>
    </article>
  )
}
