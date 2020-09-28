import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  )
}

const Course = ({ course }) => {
  console.log('parts', course.parts)

  console.log('exercises', course.exercises)

  console.log('')

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(course =>
        <p key={course.id}>
          {course.name} {course.exercises}
        </p>
      )}
      <p><b>total of {course.parts.reduce((sum, exercise) =>
        sum + exercise.exercises, 0)}
      </b></p>
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
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))