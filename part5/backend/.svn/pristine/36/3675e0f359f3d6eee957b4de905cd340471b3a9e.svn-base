const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testblog 1',
    author: 'Tester 1',
    url: 'cool url 1',
    likes: 2
  },
  {
    title: 'Testblog 2',
    author: 'Tester 2',
    url: 'cool url 2',
    likes: 4
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}