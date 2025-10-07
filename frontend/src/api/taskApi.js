const API_BASE_URL = "http://localhost:8080/api/v2";

const fetchTaskApi = async () => {
  const results = await fetch(`${API_BASE_URL}/todos`);
  if (!results.ok) throw new Error("Failed to fetch task");
  return results.json();
};

export { fetchTaskApi };
