const API_BASE = "http://localhost:5000/api";

export async function fetchTodayBirthday() {
  const res = await fetch(`${API_BASE}/birthday/today`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch birthday");
  }

  return res.json();
}
