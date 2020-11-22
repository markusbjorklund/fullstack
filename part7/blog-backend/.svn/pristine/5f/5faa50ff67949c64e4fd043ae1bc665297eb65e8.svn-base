const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')
const bcrypt = require('bcrypt')

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Macken',
      name: 'Markus Bjorklund',
      password: 'hemligt',
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

  test('username is missing', async () => {
    const newUser = {
      username: '',
      name: 'Markus Bjorklund',
      password: 'hemligt'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('username is missing')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
  })

  test('password is missing', async () => {
    const newUser = {
      username: 'Macken',
      name: 'Markus Bjorklund',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('password is empty')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
  })

  test('username is too short', async () => {
    const newUser = {
      username: 'ma',
      name: 'Markus Bjorklund',
      password: 'hemligt'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('username is too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
  })

  test('password is too short', async () => {
    const newUser = {
      username: 'macken',
      name: 'Markus Bjorklund',
      password: 'he'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('password is too short')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})