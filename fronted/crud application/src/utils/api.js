const API_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch all tasks
const getTask = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

// ✅ Create a new task
const createTask = async (task) => {
  console.log("🧪 Creating task:", task);
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  return res.json();
};

// ✅ Update task
const updateTask = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  return res.json();
};

// ✅ Delete task
const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export { getTask, createTask, updateTask, deleteTask };
