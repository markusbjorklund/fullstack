import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const clear = () => dispatch(clearNotification())
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(createNotification(`you voted on ${content}`))
    setTimeout(clear, 5000)
  }

  const sortedAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const filterAnecdotes = () => {
    const filteredAnecdotes = [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes
  }

  return (
    <>
      {sortedAnecdotes(filterAnecdotes()).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes