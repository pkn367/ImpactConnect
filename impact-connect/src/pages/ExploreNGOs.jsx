import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { categories } from '../data/mockData'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import NGOCard from '../components/NGOCard'
import { Loading, ErrorMessage } from '../components/Status'

export default function ExploreNGOs() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const { data: ngos, loading, error } = useAsync(() => api.getNgos(), [])

  const filtered = useMemo(() => {
    if (!ngos) return []
    return ngos.filter((n) => {
      const matchesCategory = category === 'All' || n.category === category
      const q = query.toLowerCase()
      const matchesQuery = n.name.toLowerCase().includes(q) || (n.tagline || '').toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [ngos, query, category])

  return (
    <div>
      <section className="bg-forest-50 border-b border-sand-300 py-14">
        <div className="container-page">
          <p className="text-sm font-medium text-forest-600 mb-2">Discover</p>
          <h1 className="text-4xl sm:text-5xl mb-4">Explore NGOs</h1>
          <p className="text-ink/70 max-w-prose">
            Browse verified organizations across Chennai and Vellore working on
            education, environment, healthcare and more.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organizations..."
              className="field pl-11"
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field sm:w-56">
            <option>All</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {loading && <Loading text="Loading organizations…" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-ink/60 py-16 text-center">
            No organizations match your search. Try a different keyword or category.
          </p>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
