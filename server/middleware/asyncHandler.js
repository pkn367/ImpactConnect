// Wraps an async route so any error is passed to Express's error handler
// (which answers with a clean 500 JSON) instead of crashing the whole server.
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
