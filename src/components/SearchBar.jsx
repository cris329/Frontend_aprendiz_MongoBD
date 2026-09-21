function SearchBar({ searchId, onSearchChange, onSearch, onClear }) {
  return (
    <form onSubmit={onSearch} className="search-form">
      <input
        type="number"
        placeholder="Buscar por ID..."
        value={searchId}
        onChange={e => onSearchChange(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Buscar</button>
      <button type="button" className="btn btn-secondary" onClick={onClear}>Mostrar todos</button>
    </form>
  )
}

export default SearchBar