const API_URL = `${import.meta.env.VITE_API_URL}/api/column`

const createColumn = async (token, title, boardId) => {
  const res = await fetch(`${API_URL}/create-column`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ title, boardId })
  })
  return res
}

const updateTitle = async (token, columnId, title) => {
  const res = await fetch(`${API_URL}/update-column-title`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ columnId, title })
  })
  return res
}

const deleteColumn = async (token, boardId, columnId) => {
  const res = await fetch(`${API_URL}/delete-column`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ boardId, columnId })
  })
  return res
}

const swapColumnOrder = async (token, boardId, sourceId, destinationId) => {
  const res = await fetch(`${API_URL}/swap-column`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ boardId, sourceId, destinationId })
  })
  return res
}

export default {
  createColumn,
  updateTitle,
  deleteColumn,
  swapColumnOrder
}
