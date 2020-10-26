import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Services'
import './index.css'

const Flash = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification flash">{message}</div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification error">{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [flashMessage, setFlashMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundName = persons.find(found => found.name === newName)
        const id = foundName.id
        personService
          .update(id, personObject)
          .then(newNumberForPerson => {
            setPersons(persons.map(person => person.id !== id ? person : newNumberForPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data)
          })
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(personsReturn => {
          setPersons(persons.concat(personsReturn))
          setFlashMessage(`Added ${newName} to the phonebook`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error);
        })
        setTimeout(() => {
          setFlashMessage(null)
          setErrorMessage(null)
        }, 5000)
    }
  }

  const deletePerson = (id) => {
    const personToBeRemoved = persons.find((name) => name.id === id)
    if (window.confirm(`Delete ${personToBeRemoved.name}?`)) {
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
      <Flash message={flashMessage} />
      <Error message={errorMessage} />
      <Filter value={showPerson} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personObject} deletePerson={deletePerson} />
    </>
  )
}

export default App