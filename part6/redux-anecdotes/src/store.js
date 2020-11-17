import { createStore, combineReducers} from 'redux'
import anecdoteReducer, { initializeAnecdote } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes.js'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes => 
    store.dispatch(initializeAnecdote(anecdotes))
)

export default store