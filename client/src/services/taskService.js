const API_URL = 'http://localhost:3000/api/task'

const createTask = async (token, title, columnId) => {
  const res = await fetch(`${API_URL}/create-task`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ title, columnId })
  })
  return res
}

const updateTask = async (token, taskId, task) => {
  const res = await fetch(`${API_URL}/update-task`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ taskId, task })
  })
  return res
}

const deleteTask = async (token, taskId) => {
  const res = await fetch(`${API_URL}/delete-task`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ taskId })
  })
  return res
}

//prettier-ignore
const shiftColumn = async (token, tasks) => {
  const {sourceList, destinationList, sourceColId, destinationColId} = tasks

  const res = await fetch(`${API_URL}/shift-column`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${token}`
    },
    body: JSON.stringify({ sourceList, destinationList, sourceColId, destinationColId })
  })
  return res
}

export default {
  createTask,
  updateTask,
  deleteTask,
  shiftColumn
}
