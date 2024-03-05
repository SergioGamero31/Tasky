const API_URL = 'http://localhost:3000/api/auth/'

const signUp = async (email, userName, password) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, userName, password })
  })

  return res
}

const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res
}

export default { signUp, login }
