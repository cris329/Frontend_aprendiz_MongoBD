function AprendizList({ aprendices, loading, selectedId, onSelect }) {
  if (loading) return <p className="empty-state">Cargando...</p>
  if (!aprendices.length) return <p className="empty-state">Sin datos registrados</p>

  return (
    <div className="list-container">
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Identificación</th></tr>
        </thead>
        <tbody>
          {aprendices.map(a => (
            <tr
              key={a.id}
              onClick={() => onSelect(a)}
              className={`row-clickable ${selectedId === a.id ? 'selected' : ''}`}
            >
              <td className="id-cell">{a.id}</td>
              <td>{a.nombre} {a.apellido}</td>
              <td>{a.numero_identificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AprendizList