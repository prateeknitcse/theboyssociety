const API_BASE = "http://localhost:5000/api";

export async function fetchTodayBirthday() {
  const res = await fetch(`${API_BASE}/birthday/today`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
}
