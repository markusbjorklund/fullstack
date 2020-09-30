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

const ShowCountries = ({ filteredCountries, countries }) => {
  if (filteredCountries.length === Math.max(countries.length)) {
    return (
      <>
      </>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <>
        {filteredCountries.map(country =>
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

  if (filteredCountries.length < 10) {
    return (
      <>
        {filteredCountries.map(country => (
          <p key={country.name}> {country.name}</p>
        ))}
      </>
    )
  }

  else if (filteredCountries.length > 10 || filteredCountries.length - 1) {
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

  return (
    <>
      <Filter value={countriesFilter} onChange={handleFilterChange} />
      <ShowCountries filteredCountries={filteredCountries} countries={countries} />
    </>
  );
}

export default App;