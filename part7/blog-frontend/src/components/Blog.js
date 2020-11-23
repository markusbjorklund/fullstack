import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)
  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  let showRemoveButton = { display: 'none' }
  if (user.name === blog.user.name) {
    showRemoveButton = { display: '', color: 'white', background: 'red' }
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className="container">
      <div style={hideViewAll} className='blog hidden'>
        {blog.title} by {blog.author} <Button variant='success' id='view-button' onClick={() => setViewAll(true)}>view</Button>
      </div>
      <div style={showViewAll} className='visible'>
        {blog.title} by {blog.author} <Button variant='secondary' id='hide-button' onClick={() => setViewAll(false)}>hide</Button>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>likes {blog.likes} <Button variant='primary' id='like-button' onClick={addLike}>like</Button></p>
        <p>{blog.user.name}</p>
        <Button variant='danger' id='delete-button' style={showRemoveButton} onClick={removeBlog}>remove</Button>
      </div>
    </div>
  )
}

export default Blog