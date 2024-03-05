const API_URL = 'http://localhost:3000/api/board'

const createBoard = async (title, color, token) => {
  const res = await fetch(`${API_URL}/create-board`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ title, color })
  })
  return res
}

const saveBoard = async (token, boardId, columns) => {
  const res = await fetch(`${API_URL}/save-board`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ boardId, columns })
  })
  return res
}

const getAllBoards = async token => {
  const res = await fetch(`${API_URL}/all-boards`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    }
  })
  return res
}

const getBoardById = async (token, boardId) => {
  const res = await fetch(`${API_URL}/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    }
  })
  return res
}

const inviteMember = async (token, boardId, email) => {
  const res = await fetch(`${API_URL}/invite-member`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ boardId, email })
  })
  return res
}

const removeMember = async (token, boardId, memberId) => {
  const res = await fetch(`${API_URL}/remove-member`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ boardId, memberId })
  })
  return res
}

const getUserById = async (token, userId) => {
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    }
  })
  return res
}

export default {
  createBoard,
  saveBoard,
  getAllBoards,
  getBoardById,
  inviteMember,
  removeMember,
  getUserById
}
