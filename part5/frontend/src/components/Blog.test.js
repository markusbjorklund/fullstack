import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('only title and author are rendered by default', () => {
  const user = {
    username: 'snake',
    name: 'Snake Plissken'
  }

  const blog = {
    title: 'Snakes in the grass',
    author: 'Snakeman',
    url: 'www.snakes.com',
    likes: '21',
    user: 'user'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
})