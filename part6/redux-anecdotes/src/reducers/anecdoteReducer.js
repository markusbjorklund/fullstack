const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: ++anecdoteToChange.votes
      }
      return state.map(anecdote => {
        return anecdote.id === id ? changedAnecdote : anecdote
      })
    }
    case 'NEW ANECDOTE': {
      return [...state, action.data]
    }
    case 'INIT ANECDOTE': {
      return action.data
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
    data: { content }
  }
}

  export const initializeAnecdote = (anecdote) => {
    return {
      type: 'INIT ANECDOTE',
      data: anecdote
    }
  }

export default reducer