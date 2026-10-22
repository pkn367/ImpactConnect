import { Link } from 'react-router-dom'
import { ArrowRight, Compass, HandHeart, ShieldCheck, Sparkles } from 'lucide-react'
import { stats } from '../data/mockData'

const values = [
  {
    icon: ShieldCheck,
    title: 'Verified, not just listed',
    text: 'Every NGO on ImpactConnect is reviewed for registration status and track record before it goes live, so volunteers and donors can give with confidence.',
  },
  {
    icon: HandHeart,
    title: 'Built around real time',
    text: "We design for people fitting volunteering around a job, a commute, a family — every listing shows exactly what's asked of you before you sign up.",
  },
  {
    icon: Compass,
    title: 'Local first',
    text: 'We start with the organizations doing the work in your city, not a global directory. Right now that means Chennai and Vellore, with more cities on the way.',
  },
  {
    icon: Sparkles,
    title: 'Small effort, real effect',
    text: "A two-hour Saturday shift matters. We make it easy to find opportunities that fit the time you actually have, not the time you wish you had.",
  },
]

const milestones = [
  { year: '2022', text: 'ImpactConnect started as a spreadsheet shared between three NGOs in Chennai struggling to find weekend volunteers.' },
  { year: '2023', text: 'First 50 organizations onboarded; built the verification process now used for every NGO on the platform.' },
  { year: '2024', text: 'Crossed 5,000 registered volunteers and introduced corporate volunteering programs.' },
  { year: '2026', text: 'Now connecting 10,000+ volunteers with 500+ organizations across Tamil Nadu.' },
]

const team = [
  { name: 'Kamal Nayak Pandiyan', role: 'Founder & CEO', image: '/kamal.png' },
  { name: 'Sarah Bennett', role: 'Co-founder & Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Michael Hartley', role: 'Partnerships Lead', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Natalie Reed', role: 'Volunteer Experience', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Marcus Reid', role: 'Engineering', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-50 border-b border-sand-300 py-20">
        <div className="container-page grid md:grid-cols-5 gap-10 items-end">
          <div className="md:col-span-4">
            <p className="text-sm font-medium text-forest-600 mb-4">About ImpactConnect</p>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-2xl">
              We built the directory we wished existed when we started volunteering.
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-page py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-sm font-medium text-forest-600 mb-3">Our story</p>
          <h2 className="text-3xl mb-5">Finding a good NGO shouldn't take a week of phone calls</h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            In 2022, our founders spent three weeks trying to find a legitimate
            place to volunteer their Saturdays — cold-emailing NGOs, chasing
            unanswered calls, and eventually giving up more than once.
          </p>
          <p className="text-ink/70 leading-relaxed">
            ImpactConnect exists so that search never has to happen again.
            Every organization here is verified, every listing tells you
            exactly what's needed, and signing up takes under a minute.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80"
          alt=""
          className="w-full aspect-[4/3] object-cover"
        />
      </section>

      {/* Values */}
      <section className="bg-sand-50 border-y border-sand-300 py-20">
        <div className="container-page">
          <p className="text-sm font-medium text-forest-600 mb-3">What guides us</p>
          <h2 className="text-3xl mb-12 max-w-xl">Four things we won't compromise on</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-sand-100 border-l-4 border-l-forest-600 p-6">
                <v.icon className="text-forest-600 mb-4" size={26} strokeWidth={1.75} />
                <h3 className="text-lg font-semibold text-forest-900 mb-2">{v.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-20">
        <p className="text-sm font-medium text-forest-600 mb-3">How we got here</p>
        <h2 className="text-3xl mb-12 max-w-xl">From a shared spreadsheet to a statewide network</h2>
        <div className="space-y-0">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-6 sm:gap-10 py-6 border-t border-sand-300 last:border-b">
              <span className="font-display text-2xl text-forest-600 w-20 shrink-0">{m.year}</span>
              <p className="text-ink/75 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-sand-300 bg-forest-800 text-sand-50">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-50/15">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-10 px-4">
              <p className="font-display text-3xl font-semibold text-amber-400">{s.value}</p>
              <p className="text-sm text-sand-100/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-page py-20">
        <p className="text-sm font-medium text-forest-600 mb-3">The team</p>
        <h2 className="text-3xl mb-12 max-w-xl">A small team, mostly former volunteers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((t) => (
            <div key={t.name}>
              <img src={t.image} alt="" className="aspect-square w-full object-cover mb-4" />
              <p className="font-medium text-forest-900">{t.name}</p>
              <p className="text-sm text-ink/60">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-50 border-t border-sand-300">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl sm:text-4xl mb-4">Want to be part of the next chapter?</h2>
          <p className="text-ink/70 max-w-prose mx-auto mb-8">
            Whether you have two hours a month or two hours a week, there's an
            organization near you that needs it.
          </p>
          <Link to="/register" className="btn-primary inline-flex">
            Join Impact <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
