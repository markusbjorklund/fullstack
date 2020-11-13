import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('url and number of likes are shown when view-button has been clicked', () => {
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

  const divHidden = component.container.querySelector('.hidden')
  const divVisible = component.container.querySelector('.visible')
  expect(divHidden).not.toHaveStyle('display: none')
  expect(divHidden).not.toHaveTextContent(blog.url)
  expect(divHidden).not.toHaveTextContent(blog.likes)
  expect(divVisible).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(divHidden).toHaveStyle('display: none')
  expect(divVisible).toHaveTextContent(blog.url)
  expect(divVisible).toHaveTextContent(blog.likes)
  expect(divVisible).not.toHaveStyle('display: none')
})