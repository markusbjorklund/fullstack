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

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props
  return (
    <>
    <Display stats={"good " + good} />
    <Display stats={"neutral " + neutral} />
    <Display stats={"bad " + bad} />
    <Display stats={"all " + all} />
    <Display stats={"average " + average()} />
    <Display stats={"positive " + positive() + "%"} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const all = good + neutral + bad

  const average = () => {
    if (all === 0) {
      return 0
    }
    return (good - bad) / all
  }

  const positive = () => {
    if (all === 0) {
      return 0
    }
    return good / all * 100
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleKlick={increaseGood} text='good' />
      <Button handleKlick={increaseNeutral} text='neutral' />
      <Button handleKlick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)