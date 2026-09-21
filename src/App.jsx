import { useState, useEffect } from 'react'
import './styles/App.css'
import SearchBar from './components/SearchBar'
import AprendizForm from './components/AprendizForm'
import AprendizList from './components/AprendizList'
import AprendizDetail from './components/AprendizDetail'
import { FIELDS, emptyForm } from './config/aprendizConfig'
import * as aprendizService from './services/aprendizService'

function App() {
  const [aprendices, setAprendices] = useState([])
  const [selected, setSelected] = useState(null)
  const [searchId, setSearchId] = useState('')
  const [form, setForm] = useState(emptyForm())
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    try {
      setLoading(true)
      setAprendices(await aprendizService.getAprendices())
    } catch {
      setMsg({ type: 'error', text: 'No se pudo cargar la lista' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const empty = FIELDS.filter(f => !form[f].trim())
    if (empty.length) {
      setErrors(Object.fromEntries(empty.map(f => [f, 'requerido'])))
      return
    }
    setErrors({})

    const id = selected ? selected.id : null
    try {
      if (id) await aprendizService.updateAprendiz(id, form)
      else await aprendizService.createAprendiz(form)
      await loadAll()
      setSelected(null)
      setForm(emptyForm())
      setMsg({ type: 'success', text: id ? 'Registro actualizado correctamente' : 'Registro creado correctamente' })
    } catch (err) {
      setMsg({ type: 'error', text: 'Error al guardar: ' + err.message })
    }
  }

  const handleSelect = (a) => {
    setSelected(a)
    setForm({ ...a })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este aprendiz?')) return
    try {
      await aprendizService.deleteAprendiz(id)
      await loadAll()
      setSelected(null)
      setForm(emptyForm())
      setMsg({ type: 'success', text: 'Registro eliminado' })
    } catch {
      setMsg({ type: 'error', text: 'Error al eliminar' })
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchId) return
    try {
      const d = await aprendizService.getAprendiz(searchId)
      setSelected(d)
      setForm({ ...d })
      setMsg(null)
    } catch {
      setMsg({ type: 'error', text: `No existe registro con ID ${searchId}` })
    }
  }

  const handleClear = () => {
    setSearchId('')
    loadAll()
  }

  const handleCancel = () => {
    setSelected(null)
    setForm(emptyForm())
    setMsg(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>Gestión de Aprendices</h1>
            <p>SENA · Ficha de seguimiento</p>
          </div>
          <span className="count-badge">{aprendices.length} registro{aprendices.length !== 1 && 's'}</span>
        </div>
      </header>

      <SearchBar searchId={searchId} onSearchChange={setSearchId} onSearch={handleSearch} onClear={handleClear} />

      {msg && <div className={`msg ${msg.type}`}>{msg.type === 'success' ? '✓' : '✕'} {msg.text}</div>}

      <div className="grid">
        <div className="panel">
          <h2 className="panel-title">{selected ? 'Editar aprendiz' : 'Nuevo aprendiz'}</h2>
          <AprendizForm
            form={form}
            errors={errors}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isEditing={!!selected}
            onCancel={handleCancel}
          />
        </div>

        <div className="panel">
          <h2 className="panel-title">Lista de aprendices</h2>
          <AprendizList aprendices={aprendices} loading={loading} selectedId={selected?.id} onSelect={handleSelect} />
        </div>

        <div className="panel">
          <h2 className="panel-title">Detalle</h2>
          <AprendizDetail aprendiz={selected} onDelete={handleDelete} onClose={handleCancel} />
        </div>
      </div>
    </div>
  )
}

export default App