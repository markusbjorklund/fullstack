const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW NOTIFICATION':
      let stateCopy = { ...state}
      stateCopy = action.notification
      return stateCopy 
    case 'NO NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const createNotification = notification => {
  return {
    type: 'NEW NOTIFICATION', notification
  }
}

export const clearNotification = () => {
  return {
    type: 'NO NOTIFICATION'
  }
}

export default notificationReducer