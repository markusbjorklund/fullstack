const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).end()
  }
  else {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = request.body
  const updatedBLog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBLog)
})

module.exports = blogRouter