// Custom Express middleware: logs every request and keeps the latest ones in memory
// so the status page at http://localhost:5000 can show them live.
const recent = []
const MAX_RECENT = 12

function logger(req, res, next) {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    const url = req.originalUrl
    const isPoll = url.startsWith('/api/status') || url === '/' || url === '/favicon.ico'
    if (!isPoll) {
      console.log(`${req.method} ${url} -> ${res.statusCode} (${ms}ms)`)
      recent.unshift({ time: new Date().toISOString(), method: req.method, path: url, status: res.statusCode, ms })
      if (recent.length > MAX_RECENT) recent.pop()
    }
  })
  next() // pass the request on to the next handler
}

module.exports = logger
module.exports.recent = recent
