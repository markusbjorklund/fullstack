import React from 'react'
import Weather from './Weather'

const Countries = ({ countries, buttonFilter }) => {
  if (countries.length === 1) {
    return (
      <>
        {countries.map(country =>
          <div key={country.name}>
            <h1>{country.name}</h1>
            <p><b>Capital:</b> {country.capital}</p>
            <p><b>Population:</b> {country.population}</p>
            <h3>Spoken languages</h3>
            <ul>
              {country.languages.map(lang =>
                <li key={lang.iso639_1}>{lang.name}</li>
              )}
            </ul>
            <img src={country.flag} alt="country flag" width="150" />
            <Weather capital={country.capital} />
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

  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }
}

export default Countries