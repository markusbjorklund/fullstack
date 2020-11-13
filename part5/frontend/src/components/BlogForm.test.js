import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BLogForm'

test('check if the blogform works correctly', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'this is a title' } })
  fireEvent.change(author, { target: { value: 'this is the author' } })
  fireEvent.change(url, { target: { value: 'this is a cool url' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a title' )
  expect(createBlog.mock.calls[0][0].author).toBe('this is the author' )
  expect(createBlog.mock.calls[0][0].url).toBe('this is a cool url' )
})