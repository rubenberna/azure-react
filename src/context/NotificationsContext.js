import createDataContext from './createDataContext';

const TYPES = {
  ADD_NOTIFICATION: 'notifications/add_notification'
}

const initialState = {
  message: undefined
}

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_NOTIFICATION:
      return action.payload
    default:
      return state
  }
}

const setNotification = (dispatch) => (message) => {
  dispatch({
    type: TYPES.ADD_NOTIFICATION,
    payload: message
  })
}

const clearNotifications = (dispatch) => () => {
  dispatch({
    type: TYPES.ADD_NOTIFICATION,
    payload: undefined
  })
}

export const { Provider, Context } = createDataContext(
  notificationsReducer,
  {setNotification, clearNotifications},
  initialState
)