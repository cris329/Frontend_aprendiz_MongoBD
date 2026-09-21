import { FIELDS, LABELS } from '../config/aprendizConfig'

function AprendizForm({ form, errors, onSubmit, onChange, isEditing, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="form">
      {FIELDS.map(f => (
        <div key={f} className="form-group">
          <label htmlFor={`field-${f}`}>{LABELS[f]}</label>
          <input
            id={`field-${f}`}
            name={f}
            value={form[f]}
            onChange={onChange}
            className={errors[f] ? 'error' : ''}
          />
          {errors[f] && <span className="error-text">{errors[f]}</span>}
        </div>
      ))}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{isEditing ? 'Actualizar' : 'Crear'}</button>
        {isEditing && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  )
}

export default AprendizForm