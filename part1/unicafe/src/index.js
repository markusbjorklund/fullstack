import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleKlick, text }) => {
  return (
    <button onClick={handleKlick}>
      {text}
    </button>
  )
}

const Buttons = ({ increaseGood, increaseNeutral, increaseBad }) => {
  return (
    <>
      <Button handleKlick={increaseGood} text='good' />
      <Button handleKlick={increaseNeutral} text='neutral' />
      <Button handleKlick={increaseBad} text='bad' />
    </>
  )
}

const Statistic = (props) => {
  return (
    <>
      <p>{props.text} {props.value}</p>
    </>
  )
}

const Statistics = ({ text, good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all} />
      <Statistic text='average' value={average} />
      <Statistic text='positive' value={positive} />
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

  if (all === 0) {
    return (
      <>
        <h1>give feedback</h1>
        <Buttons increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad} />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>give feedback</h1>
      <Buttons increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average()} positive={positive()} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)