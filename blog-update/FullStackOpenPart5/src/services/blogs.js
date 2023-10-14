import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const submitBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const addLike = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  blogObject.likes += 1

  const blogUrl = baseUrl + `/${blogObject._id}`
  const response = await axios.put(blogUrl, blogObject, config)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + `/${blogObject._id}`
  const response = await axios.delete(blogUrl, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, submitBlog, addLike, deleteBlog, setToken }