const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET FILTER':
      return action.content
    default:
      return state
  }
}

export const filterChange = (content) => {
  return {
    type: 'SET FILTER',
    content,
  }
}

export default filterReducer