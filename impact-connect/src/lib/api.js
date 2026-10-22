// Small helper that talks to the Express backend.
const TOKEN_KEY = 'ic_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  // Give up after 15 seconds so buttons never hang forever
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)

  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    throw new Error(
      err.name === 'AbortError'
        ? 'The server took too long to respond. Check that the backend is running.'
        : 'Cannot reach the server. Is the backend running?'
    )
  } finally {
    clearTimeout(timer)
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // response had no JSON body
  }
  if (!res.ok) {
    throw new Error(
      data?.message ||
        (res.status >= 500
          ? 'The server is not responding. Check that the backend is running.'
          : 'Something went wrong.')
    )
  }
  return data
}

export const api = {
  register: (form) => request('/auth/register', { method: 'POST', body: form }),
  login: (form) => request('/auth/login', { method: 'POST', body: form }),
  me: () => request('/auth/me'),
  getStats: () => request('/stats'),
  getNgos: () => request('/ngos'),
  getNgo: (id) => request(`/ngos/${id}`),
  createNgo: (body) => request('/ngos', { method: 'POST', body }),
  updateNgo: (id, body) => request(`/ngos/${id}`, { method: 'PUT', body }),
  deleteNgo: (id) => request(`/ngos/${id}`, { method: 'DELETE' }),
  getEvents: () => request('/events'),
  getMyRegistrations: () => request('/events/me/registrations'),
  toggleRegistration: (id) => request(`/events/${id}/register`, { method: 'POST' }),
}
