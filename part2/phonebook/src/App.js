import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: ''
    }

    if (persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already in the phonebook.`)
    }

    else {
      personService
        .create(personObject)
        .then(personsReturn => {
          setPersons(persons.concat(personsReturn))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const personToBeRemoved = persons.find((name) => name.id === id)
    if (window.confirm(`Delete ${personToBeRemoved.name} ?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          const personDeleted = persons.filter(persons => id !== persons.id)
          setPersons(personDeleted)
        })
    }
  }

  const personObject = persons.filter(person => person.name.toLowerCase().includes(showPerson.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowPerson(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={showPerson} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personObject} deletePerson={deletePerson} />
    </>
  )
}

export default App