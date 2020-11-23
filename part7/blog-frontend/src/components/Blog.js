import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)
  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  let showRemoveButton = { display: 'none' }
  if (user.name === blog.user.name) {
    showRemoveButton = { display: '' }
  }

  const removeBlog = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  const blogStyle = {
    padding: 10,
    border: 'dashed',
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 20,
    marginTop: 20
  }

  return (
    <div style={blogStyle} className="container">
      <div style={hideViewAll} className='blog hidden'>
        {blog.title} by {blog.author} <Button variant='info' id='view-button' onClick={() => setViewAll(true)}>View</Button>
      </div>
      <div style={showViewAll} className='visible'>
        {blog.title} by {blog.author} <Button variant='secondary' id='hide-button' onClick={() => setViewAll(false)}>Hide</Button>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>likes {blog.likes} <Button variant='primary' id='like-button' onClick={addLike}>Like</Button></p>
        <p>{blog.user.name}</p>
        <Button variant='danger' id='delete-button' style={showRemoveButton} onClick={removeBlog}>Remove</Button>
      </div>
    </div>
  )
}

export default Blog