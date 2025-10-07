const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:8080/api/v2";

const fetchTaskApi = async () => {
  const results = await fetch(`${API_BASE_URL}/todos`);
  if (!results.ok) throw new Error("Failed to fetch task");
  return results.json();
};

const createTaskApi = async task => {
  const results = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!results.ok) throw new Error("Failed to create task");

  const data = await results.json();
  return data;
};

const updateTaskApi = async (id, uppdates) => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uppdates),
  });

  if (!results.ok) throw new Error("Failed to update task");

  const data = await results.json();
  return data;
};

const deleteTaskApi = async id => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!results.ok) throw new Error("Failed to delete task");
  return true;
};

const toggleTaskApi = async id => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
    method: "PATCH",
  });

  if (!results.ok) throw new Error("Failed to update task");
  const data = await results.json();
  return data;
};
export { fetchTaskApi, createTaskApi, updateTaskApi, deleteTaskApi, toggleTaskApi };
