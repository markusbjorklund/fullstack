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

const Statistic = ({text, value}) => {
  return (
    <>
      <td>{text}</td><td>{value}</td>
    </>
  )
}

const Header = () => {
  return (
    <>
      <h1>feedback</h1>
    </>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table><tbody>
        <tr><Statistic text='good' value={good} /></tr>
        <tr><Statistic text='neutral' value={neutral} /></tr>
        <tr><Statistic text='bad' value={bad} /></tr>
        <tr><Statistic text='all' value={all} /></tr>
        <tr><Statistic text='average' value={average} /></tr>
        <tr><Statistic text='positive' value={positive} /></tr>
      </tbody></table>
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
    return good / all * 100 + ' %'
  }

  return (
    <>
      <Header />
      <Buttons increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average()} positive={positive()} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)