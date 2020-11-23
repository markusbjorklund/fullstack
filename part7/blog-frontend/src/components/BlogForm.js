import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Create new blogpost</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <div>
            <input
              id='title'
              type="text"
              value={newTitle}
              name="title"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <div>
            <input
              id='author'
              type="text"
              value={newAuthor}
              name="author"
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <div>
            <input
              id='url'
              type="text"
              value={newUrl}
              name="url"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
        </Form.Group>
        <Button id='create-button' type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm