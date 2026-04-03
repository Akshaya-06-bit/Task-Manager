import TaskItem from "./TaskItem";

// TaskList — renders all task cards or shows an empty state message
// Props:
//   tasks    — array of task objects to display (already filtered and searched)
//   onToggle — passed down to each TaskItem
//   onEdit   — passed down to each TaskItem
//   onDelete — passed down to each TaskItem
function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  // Show empty state if there are no tasks matching the current filter/search
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
