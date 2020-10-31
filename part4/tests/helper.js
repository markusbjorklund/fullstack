const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}