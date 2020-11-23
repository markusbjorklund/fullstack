import axios from 'axios'
const userUrl = 'api/users'

const getAllUsers = () => {
  const request = axios.get(userUrl)
  return request.then(response => response.data)
}

export default { getAllUsers }