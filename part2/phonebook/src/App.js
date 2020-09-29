import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

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

  const personObject = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personObject} />
    </>
  )
}

export default App