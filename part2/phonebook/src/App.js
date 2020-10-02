import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewNumber('')
    })

    if (persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(newName + ' is already added to phonebook')
    }

    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personObject = persons.filter(person => person.name.toLowerCase().includes(ShadowRoot.toLowerCase()))

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
      <Persons persons={personObject} />
    </>
  )
}

export default App