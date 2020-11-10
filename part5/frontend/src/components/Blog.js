import React from 'react' // eslint-disable-line no-unused-vars
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog