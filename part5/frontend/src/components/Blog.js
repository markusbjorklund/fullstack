import React, { useState } from 'react' // eslint-disable-line no-unused-vars

const Blog = ({ blog, addLike }) => {
  const [viewAll, setViewAll] = useState(false)
  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideViewAll}>
        {blog.title} by {blog.author} <button onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll}>
        {blog.title} by {blog.author} <button onClick={() => setViewAll(false)}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog