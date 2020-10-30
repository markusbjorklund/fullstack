const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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
beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog(initialBlogs[0]).save()
  await new Blog(initialBlogs[1]).save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of blogs', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body.length).toBe(2)
})

test('id is defined', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})