import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-sand-100">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center bg-amber-500 text-forest-900">
              <Heart size={14} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="font-display text-base font-semibold">ImpactConnect</span>
          </div>
          <p className="text-sm text-sand-100/60 leading-relaxed">
            Connecting volunteers, NGOs and donors to the work that needs them most.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-sand-100/70">
            <li><Link to="/ngos" className="hover:text-sand-50">Browse NGOs</Link></li>
            <li><Link to="/events" className="hover:text-sand-50">Upcoming events</Link></li>
            <li><Link to="/about" className="hover:text-sand-50">Our story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-3">Get involved</h4>
          <ul className="space-y-2 text-sm text-sand-100/70">
            <li><Link to="/register" className="hover:text-sand-50">Volunteer</Link></li>
            <li><Link to="/register" className="hover:text-sand-50">Register your NGO</Link></li>
            <li><Link to="/register" className="hover:text-sand-50">Corporate giving</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-sand-100/70">
            <li>thegreatindianpsycho@gmail.com</li>
            <li>Los Angeles, California, USA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand-50/10 py-5 text-center text-xs text-sand-100/40">
        © {new Date().getFullYear()} ImpactConnect. Built for good.
      </div>
    </footer>
  )
}
