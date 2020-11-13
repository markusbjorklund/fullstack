import React, { useState } from 'react'

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
    <div style={blogStyle}>
      <div style={hideViewAll} className='blog'>
        {blog.title} by {blog.author} <button onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll}>
        {blog.title} by {blog.author} <button onClick={() => setViewAll(false)}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>
        <button style={showRemoveButton} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog