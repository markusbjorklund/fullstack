import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, exercise) =>
  sum + exercise.exercises, 0)
  return (
  <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      {course.parts.map(course =>
        <p key={course.id}>
          {course.name} {course.exercises}
        </p>
      )}
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'New course',
        exercises: 1,
        id: 4
      },
      {
        name: 'Newest course',
        exercises: 12,
        id: 6
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))