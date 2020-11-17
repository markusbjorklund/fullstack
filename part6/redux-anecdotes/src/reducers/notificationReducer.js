const initialState = 'Initial message'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer