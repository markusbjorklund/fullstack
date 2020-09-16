import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleKlick}>
      {props.text}
    </button>
  )
}

const Display = ({ stats }) => {
  return (
    <><p>{stats}</p></>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleKlick={increaseGood} text='good' />
      <Button handleKlick={increaseNeutral} text='neutral' />
      <Button handleKlick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Display stats={"good " + good} />
      <Display stats={"neutral " + neutral} />
      <Display stats={"bad " + bad} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)