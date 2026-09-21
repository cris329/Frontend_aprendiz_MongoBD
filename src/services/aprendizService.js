import { BASE } from '../config/aprendizConfig'

export const getAprendices = async () => {
  const r = await fetch(BASE)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const getAprendiz = async (id) => {
  const r = await fetch(`${BASE}/${id}`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const createAprendiz = async (data) => {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const updateAprendiz = async (id, data) => {
  const r = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}

export const deleteAprendiz = async (id) => {
  const r = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
}