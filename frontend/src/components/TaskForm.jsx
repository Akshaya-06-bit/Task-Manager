import { useState, useEffect } from "react";

// Default blank form — used when adding a new task or after resetting
const emptyForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium",
};

// TaskForm is reused for both Add mode and Edit mode
// Props:
//   onSubmit  — called with form data when the form is submitted
//   editTask  — the task object to edit (null when adding)
//   clearEdit — called to exit edit mode (Cancel button)
function TaskForm({ onSubmit, editTask, clearEdit }) {
  const [formData, setFormData] = useState(emptyForm);

  // When editTask changes, prefill the form with that task's existing values
  // This is what makes the Edit button correctly populate the form
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || "",
        description: editTask.description || "",
        // The date input requires yyyy-mm-dd format — slice the ISO string
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : "",
        priority: editTask.priority || "Medium",
      });
    } else {
      // editTask was cleared — reset the form back to empty
      setFormData(emptyForm);
    }
  }, [editTask]);

  // Keep formData in sync with whatever the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return; // Do not submit if title is empty
    onSubmit(formData);
    setFormData(emptyForm); // Clear the form after submitting
  };

  const handleCancel = () => {
    setFormData(emptyForm); // Clear the form
    clearEdit();            // Tell App.jsx to exit edit mode
  };

  const isEditing = Boolean(editTask);

  return (
    <div className="task-form-card">
      <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title *"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          {/* Cancel button only appears when editing */}
          {isEditing && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
