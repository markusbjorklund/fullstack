const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW NOTIFICATION':
      return [...state, action.notification]
    case 'NO NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutID

export const createNotification = (notification, duration) => {
  return dispatch => {
    dispatch({
      type: 'NEW NOTIFICATION',
      notification
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'NO NOTIFICATION'
  }
}

export default notificationReducer