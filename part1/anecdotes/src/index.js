import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleKlick, text }) => {
  return (
    <button onClick={handleKlick}>{text}</button>
  )
}

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  // handle votes
  const votes = Array.apply(null, Array(6)).map(Number.prototype.valueOf, 0);

  const [countVote, setVote] = useState(votes)

  const countVoteCopy = [...countVote]
  countVoteCopy[selected] += 1

  const voteAnecdote = () => { setVote(countVoteCopy) }

  // handle max votes
  const popularAnecdote = countVote.indexOf(Math.max.apply(null, countVote))

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={countVote[selected]} />
      <Button handleKlick={voteAnecdote} text="vote" />
      <Button handleKlick={nextAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[popularAnecdote]} votes={countVote[popularAnecdote]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
