import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-display text-6xl text-forest-600 mb-4">404</p>
      <h1 className="text-2xl mb-4">This page doesn't exist</h1>
      <p className="text-ink/60 mb-8">The page you're looking for may have moved or been renamed.</p>
      <Link to="/" className="btn-primary inline-flex">Back to home</Link>
    </div>
  )
}
