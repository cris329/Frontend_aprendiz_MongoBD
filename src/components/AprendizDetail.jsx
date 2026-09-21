import { FIELDS, LABELS } from '../config/aprendizConfig'

function AprendizDetail({ aprendiz, onDelete, onClose }) {
  if (!aprendiz) return <p className="empty-state">Selecciona un registro de la lista</p>

  return (
    <div className="detail">
      <div className="detail-grid">
        {FIELDS.map(key => (
          <div key={key} className="detail-item">
            <span className="detail-label">{LABELS[key]}</span>
            <span className="detail-value">{String(aprendiz[key] ?? '—')}</span>
          </div>
        ))}
      </div>
      <div className="detail-actions">
        <button onClick={() => onDelete(aprendiz.id)} className="btn btn-danger">Eliminar</button>
        <button onClick={onClose} className="btn btn-secondary">Cerrar</button>
      </div>
    </div>
  )
}

export default AprendizDetail