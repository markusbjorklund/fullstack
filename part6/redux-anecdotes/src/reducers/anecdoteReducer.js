const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange }
      changedAnecdote.votes++
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'INIT ANECDOTE': {
      return action.data
    }
    case 'NEW ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW ANECDOTE',
    data: content
  }
}

export const initializeAnecdote = (anecdotes) => {
  return {
    type: 'INIT ANECDOTE',
    data: anecdotes
  }
}

export default reducer