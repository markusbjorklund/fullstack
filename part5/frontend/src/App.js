import React, { useState, useEffect, useRef } from 'react' // eslint-disable-line no-unused-vars
import Blog from './components/Blog' // eslint-disable-line no-unused-vars
import Notification from './components/Notification' // eslint-disable-line no-unused-vars
import BlogForm from './components/BlogForm' // eslint-disable-line no-unused-vars
import Toggleable from './components/Toggleable' // eslint-disable-line no-unused-vars
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(updatedBlog => {
        setBlogs(blogs.concat(updatedBlog))
        notifyWith(`a new blog ${blogObject.newTitle} by ${blogObject.newAuthor} added`)
      })
  }

  const addLike = (id) => {
    const updateBlog = blogs.find(blog => blog.id === id)
    const setBlog = {
      user: updateBlog.user.id,
      likes: (updateBlog.likes + 1),
      author: updateBlog.author,
      title: updateBlog.title,
      url: updateBlog.url
    }

    blogService
      .update(id, setBlog)
      .then(updatedBlog => {
        updatedBlog.user = updateBlog.user
        setBlogs(blogs.map(blog => blog.id !== updateBlog.id ? blog : updatedBlog))
      })
      .catch(error => {
        notifyWith(`problem with updating the blog ${error}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const sortedBlogs = (a, b) => {
    return b.likes - a.likes
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
  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <input type='button' value='logout' onClick={handleLogOut} /></p>
          <Toggleable buttonLabel="new blogpost" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          {blogs.sort(sortedBlogs).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={() => addLike(blog.id)} />
          )}
        </div>
      }
    </div>
  )
}

export default App