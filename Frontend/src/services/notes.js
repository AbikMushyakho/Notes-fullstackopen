import axios from 'axios'
// const baseUrl = process.env.NODE_ENV === 'production' ? '/api/notes' : '/notes';

// const baseUrl = 'http://localhost:3001/api/notes';
const baseUrl = '/api/notes'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = axios.get(baseUrl)

  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, create, update, setToken }
