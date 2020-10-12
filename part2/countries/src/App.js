import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')
  const [allCountries, setAllCountries] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setAllCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countriesFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setCountriesFilter(event.target.value)
  }

  const handleFilterChangeCountry = (filter) => {
    setCountriesFilter(filter)
  }

  return (
    <>
      <Filter value={countriesFilter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} allCountries={allCountries} buttonFilter={handleFilterChangeCountry} />
    </>
  )
}

export default App;