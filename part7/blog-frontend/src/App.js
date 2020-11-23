import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    const notifyObject = { message, type }
    dispatch(setNotification(notifyObject, 5))
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
    } catch (error) {
      notifyWith('Wrong username or password', 'error')
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(updatedBlog => {
        setBlogs(blogs.concat(updatedBlog))
        notifyWith(`A new blog ${blogObject.title} by ${blogObject.author} has been added`)
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
        notifyWith(`Problem updating the blog, ${error}`, 'error')
      })
  }

  const deleteBlog = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author} ?`)) {
      blogService
        .deleteObject(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          notifyWith(`${title} has already been deleted, ${error}`)
        })
    }
  }

  const sortedBlogs = (a, b) => {
    return b.likes - a.likes
  }
  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
        :
        <div className="container">
          <h2>Blogs</h2>
          <p>{user.name} logged in <Button variant='warning' onClick={handleLogOut}>Logout</Button></p>
          <Toggleable buttonLabel="New blogpost">
            <BlogForm createBlog={addBlog} />
          </Toggleable>
          {blogs.sort(sortedBlogs).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={() => addLike(blog.id)}
              user={user}
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App