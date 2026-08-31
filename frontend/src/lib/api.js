const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function getJson(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
  return res.json();
}

export default API_URL;
