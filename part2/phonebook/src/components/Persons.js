import React from 'react'

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.name}> {person.name} {person.number} {person.id}<button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>
      ))}
    </>
  )
}

export default Persons