import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <>
      <div>
        find countries:
      <input
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </>
  )
}

const ShowCountries = ({ countries, buttonFilter }) => {
  if (countries.length === 1) {
    return (
      <>
        {countries.map(country =>
          <div key={country.name}>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
              {country.languages.map(lang =>
                <li key={lang.iso639_1}>{lang.name}</li>
              )}
            </ul>
            <img src={country.flag} alt="country flag" width="150" />
          </div>
        )}
      </>
    )
  }

  if (countries.length < 10) {
    return (
      <>
        {countries.map(country => (
          <p key={country.name}> {country.name}
            <button onClick={() => { buttonFilter(country.name) }}>show</button>
          </p>
        ))}
      </>
    )
  }

  if (countries.length > 10 || countries.length - 1) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
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
      <ShowCountries countries={filteredCountries} buttonFilter={handleFilterChangeCountry} />
    </>
  );
}

export default App;