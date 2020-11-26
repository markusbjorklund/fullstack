import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { Table, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

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

  useEffect(() => {
    userService.getAllUsers().then(users =>
      setUsers(users)
    )
  }, [])

  console.log('Get all the users', users)

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
      notifyWith('Wrong username or password!', 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.location = 'http://localhost:3000/'
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(updatedBlog => {
        setBlogs(blogs.concat(updatedBlog))
        notifyWith(`A new blog ${updatedBlog.title} by ${updatedBlog.author} has been added`)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addLike = (id) => {
    const updateBlog = blogs.find(b => b.id === id)
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

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blogpost' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const NavBar = () => (
    <>
      <Link style={rightSpace} to="/"><b>Blogs</b></Link>
      <Link style={rightSpace} to="/users"><b>Users</b></Link>
      {user.name} logged in <Button variant="warning" onClick={handleLogOut}>Log out</Button>
    </>
  )

  const sortByLike = (a, b) => {
    return b.likes - a.likes
  }

  const sortByBlogs = (a, b) => {
    return b.blogs.length - a.blogs.length
  }

  const rightSpace = {
    marginRight: 10
  }

  const listBlogs = () => (
    <div className="container">
      <NavBar />
      <h2>Blogs</h2>
      <div>{blogForm()}</div>
      <>
        {blogs.sort(sortByLike).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={() => addLike(blog.id)}
            user={user}
            deleteBlog={deleteBlog}
          />
        )}
      </>
    </div>
  )
  const ListUsers = () => (
    <div>
      <Table striped>
        <tbody>
          <tr><td><strong>Name</strong></td><td><strong>Blogs created</strong></td></tr>
          {users.sort(sortByBlogs).map(user =>
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

  const showUsers = () => (
    <div className="container">
      <NavBar />
      <h2>Users</h2>
      <ListUsers />
    </div>
  )

  const Users = () => (
    <div>
      {user === null ?
        loginForm() :
        showUsers()
      }
    </div>
  )

  return (
    <div className="container">
      <Router>
        <Notification />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {user === null ?
              loginForm() :
              listBlogs()
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App