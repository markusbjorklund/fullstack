import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleKlick, text }) => {
  return (
    <button onClick={handleKlick}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 5))
  }

  // handle votes
  const votes = Array.apply(null, Array(5)).map(Number.prototype.valueOf, 0);

  const [countVote, setVote] = useState(votes)

  const countVoteCopy = [...countVote]
  countVoteCopy[selected] += 1

  const voteAnecdote = () => { setVote(countVoteCopy) }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {countVote[selected]} votes</p>
      <Button handleKlick={voteAnecdote} text="vote" />
      <Button handleKlick={nextAnecdote} text="next anecdote" />
    </div>
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