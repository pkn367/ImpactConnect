// Netlify Function that serves the Express API.
// Requests to /api/* are routed here by the redirect in netlify.toml.
exports.handler = require('../../server/lambda').handler
