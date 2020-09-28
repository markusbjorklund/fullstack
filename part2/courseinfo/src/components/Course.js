import React from 'react'

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

export default Course