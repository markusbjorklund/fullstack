import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  console.log('countries', countries)
  console.log('countries length', countries)
  return (
    <>
 
    {countries.map(country => {
      return <div key={country.name}>
              <h2>{country.name}</h2>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <img src={country.flag} width="100" alt={country.name} />
          </div>
    })}
    </>
  );
}

export default App;
