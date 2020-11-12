import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import Blog from './components/Blog' // eslint-disable-line no-unused-vars
import Notification from './components/Notification' // eslint-disable-line no-unused-vars
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        notifyWith(`a new blog ${newTitle} by ${newAuthor} added`)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in <input type='button' value='logout' onClick={handleLogOut} /></p>
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogFormVisible(true)}>new blogpost</button>
          </div>
          <div style={showWhenVisible}>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
              <div>
                title:
                <input
                  type="text"
                  value={newTitle}
                  name="title"
                  onChange={({ target }) => setNewTitle(target.value)}
                />
              </div>
              <div>
                author:
                <input
                  type="text"
                  value={newAuthor}
                  name="author"
                  onChange={({ target }) => setNewAuthor(target.value)}
                />
              </div>
              <div>
                url:
                <input
                  type="text"
                  value={newUrl}
                  name="url"
                  onChange={({ target }) => setNewUrl(target.value)}
                />
              </div>
              <button type="submit">create</button>
              <button onClick={() => setBlogFormVisible(false)}>cancel</button>
            </form>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App