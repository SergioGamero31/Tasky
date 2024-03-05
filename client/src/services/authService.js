const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`

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
