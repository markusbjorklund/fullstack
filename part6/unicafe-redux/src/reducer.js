const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let stateCopy = { ...state }
  switch (action.type) {
    case 'GOOD':
      stateCopy.good++
      return stateCopy
    case 'OK':
      stateCopy.ok++
      return stateCopy
    case 'BAD':
      stateCopy.bad++
      return stateCopy
    case 'ZERO':
      return initialState
    default: return initialState
  }
}

export default counterReducer