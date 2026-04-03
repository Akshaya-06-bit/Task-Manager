// FilterBar — shows three filter buttons and highlights the currently active one
function FilterBar({ filter, onFilterChange }) {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f}
          // "active" class highlights the selected filter button
          className={`filter-btn ${filter === f ? "active" : ""}`}
          onClick={() => onFilterChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
