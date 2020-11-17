const notificationReducer = (state = 'Initial value', action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer