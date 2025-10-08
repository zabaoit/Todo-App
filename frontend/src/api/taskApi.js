const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v2";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const fetchTaskApi = async () => {
  const results = await fetch(`${API_BASE_URL}/todos`, {
    headers: getAuthHeader(),
  });
  if (!results.ok) throw new Error("Failed to fetch task");
  return results.json();
};

const createTaskApi = async task => {
  const results = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(task),
  });

  if (!results.ok) throw new Error("Failed to create task");

  const data = await results.json();
  return data;
};

const updateTaskApi = async (id, uppdates) => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(uppdates),
  });

  if (!results.ok) throw new Error("Failed to update task");

  const data = await results.json();
  return data;
};

const deleteTaskApi = async id => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  if (!results.ok) throw new Error("Failed to delete task");
  return true;
};

const toggleTaskApi = async id => {
  const results = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
    method: "PATCH",
    headers: getAuthHeader(),
  });

  if (!results.ok) throw new Error("Failed to update task");
  const data = await results.json();
  return data;
};
export { fetchTaskApi, createTaskApi, updateTaskApi, deleteTaskApi, toggleTaskApi };
