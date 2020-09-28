import React from 'react';
import ReactDOM from 'react-dom';

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
      <h1>Web development curriculum</h1>
      {course.map(course =>
        <div key={course.id}>
          <h2>
            {course.name}
          </h2>
          {course.parts.map(part =>
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          )}
          <Total course={course} />
        </div>
      )}
    </>
  )
}

const App = () => {

  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))