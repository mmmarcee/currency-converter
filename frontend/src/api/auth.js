const API_URL = 'http://localhost:5139/api';

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } 
  catch { data = text; }

  console.log(`[POST] ${path}`, res.status, data);

  if (!res.ok) {
    let message = `Error ${res.status}`;
    if (data?.title) message = data.title;
    if (data?.message) message = data.message;
    if (typeof data === 'string') message = data;
    if (Array.isArray(data)) message = data.map(e => e.description || e).join(', ');

    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const register = (username, password) =>
  post('/Auth/register', { username, password });

export const login = async (username, password) => {
  const data = await post('/Auth/login', { username, password });

  const token = data?.token || data?.accessToken || data?.jwt;
  if (token) {
    localStorage.setItem('authToken', token);
  }
  return data;
};


export const getTelegramLink = async (username) => {
  const data = await post('/Auth/telegram-link', { username });
  return data?.url;
};