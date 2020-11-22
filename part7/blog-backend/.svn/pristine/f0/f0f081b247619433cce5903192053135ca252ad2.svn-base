const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog(helper.initialBlogs[0]).save()
  await new Blog(helper.initialBlogs[1]).save()
})

describe('retrieve posts from the blog', () => {
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
})

describe('saving posts to blog', () => {
  test('blogpost can be added correctly', async () => {
    const newBlog = {
      title: 'New Testblog',
      author: 'New Tester',
      url: 'New cool url',
      likes: '100'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')

    const blogs = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContain('New Testblog')
  })

  test('post defaults to zero if likes is missing when posting', async () => {
    const newBlog = {
      title: 'Blog with no likes',
      author: 'Tester zero',
      url: 'Zero cool url'
    }

    const noLikesBlog = await api.post('/api/blogs').send(newBlog)

    expect(noLikesBlog.body).toHaveProperty('likes', 0)
  })

  test("returns error if title or url is missing when trying to post", async () => {
    const noTitleNoUrlBlog = {
      author: 'Tester forgot title and url',
      likes: 100
    }

    await api
      .post("/api/blogs")
      .send(noTitleNoUrlBlog)
      .expect(400)
  })

})

describe('deleting and updating posts in the blog',() => {
  test('deleting a post based in id is possible', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const deletedBlog = await helper.blogsInDb()
    expect(deletedBlog).toHaveLength(helper.initialBlogs.length - 1)
  })
  
  test('update likes on a post or adding likes when there is no likes', async () => {
    const blogs = await api.get("/api/blogs")
    const id = blogs.body[1].id
    const updateLikes = { likes: 333 }
  
    const updatedBlog = await api.put(`/api/blogs/${id}`).send(updateLikes)
  
    expect(updatedBlog.body).toHaveProperty('likes', updateLikes.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('add user with uniques username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'macken',
      name: 'Markus Bjorklund',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})