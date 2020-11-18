import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange }
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

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const saveVote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: saveVote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW ANECDOTE',
      data: newAnecdote
    })
  }
}

  export const initializeAnecdote = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INIT ANECDOTE',
        data: anecdotes
      })
    }
  }

  export default reducer