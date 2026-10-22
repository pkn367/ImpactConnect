export function Loading({ text = 'Loading…' }) {
  return <p className="py-16 text-center text-ink/60">{text}</p>
}

export function ErrorMessage({ message }) {
  return (
    <p className="my-10 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
      {message}
    </p>
  )
}
