const API_BASE_URL = "http://localhost:8080/api/v2";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const fetchUserApiById = async id => {
  const results = await fetch(`${API_BASE_URL}/user/${id}`, {
    headers: getAuthHeader(),
  });
  if (!results.ok) throw new Error("Failed to fetch user");
  return results.json();
};

export { fetchUserApiById };
