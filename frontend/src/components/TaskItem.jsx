// TaskItem — displays a single task card with all its details and action buttons
// Props:
//   task     — the task object to display
//   onToggle — called to flip the completed status
//   onEdit   — called to enter edit mode for this task
//   onDelete — called to delete this task
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    // Add "completed" CSS class to visually dim and strike through completed tasks
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        {/* Priority badge color is controlled by CSS class based on priority value */}
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {/* Only show description if it exists */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {/* Only show due date if it exists */}
        {task.dueDate && (
          <span className="due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        <span
          className={`status-text ${
            task.completed ? "status-done" : "status-pending"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        {/* Toggle button switches between "Complete" and "Undo" */}
        <button className="btn-toggle" onClick={() => onToggle(task)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
