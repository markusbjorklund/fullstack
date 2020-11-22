import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

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
        notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
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
        notifyWith(`problem updating the blog, ${error}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const sortedBlogs = (a, b) => {
    return b.likes - a.likes
  }
  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
        :
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