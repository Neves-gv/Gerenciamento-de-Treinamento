const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}){
  const token = localStorage.getItem('token')
  const headers = options.headers || {}
  if(token) headers['Authorization'] = `Bearer ${token}`
  headers['Content-Type'] = headers['Content-Type'] || 'application/json'

  const res = await fetch(BASE + path, { ...options, headers })
  if(!res.ok){
    const text = await res.text()
    throw new Error(text || res.status)
  }
  const contentType = res.headers.get('content-type') || ''
  if(contentType.includes('application/json')) return res.json()
  return res.text()
}

export const api = {
  login: (body) => request('/login', { method: 'POST', body: JSON.stringify(body) }),
  usuarios: {
    list: () => request('/usuarios'),
    create: (body) => request('/usuarios', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (id, body) => request(`/usuarios/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id) => request(`/usuarios/${id}`, { method: 'DELETE' })
  },
  setores: {
    list: () => request('/setores'),
    create: (body) => request('/setores', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/setores/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (id, body) => request(`/setores/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id) => request(`/setores/${id}`, { method: 'DELETE' })
  },
  treinamentos: {
    list: () => request('/treinamentos'),
    create: (body) => request('/treinamentos', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/treinamentos/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (id, body) => request(`/treinamentos/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id) => request(`/treinamentos/${id}`, { method: 'DELETE' })
  },
  certificados: {
    list: () => request('/certificados'),
    create: (body) => request('/certificados', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/certificados/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    patch: (id, body) => request(`/certificados/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    remove: (id) => request(`/certificados/${id}`, { method: 'DELETE' })
  }
}

export default api
