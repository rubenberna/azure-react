import createDataContext from '../createDataContext';

const TYPES = {
  ADD_NOTIFICATION: 'notifications/addNotification',
  CLEAR_NOTIFICATION: 'notifications/clearNotification'
}

const initialState = {
  message: undefined,
  visible: false
}

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_NOTIFICATION:
      return { visible: true, message: action.payload }
    case TYPES.CLEAR_NOTIFICATION:
      return { visible: false, message: '' }
    default:
      return state
  }
}

const setNotification = (dispatch) => (message) => {
  dispatch({
    type: TYPES.ADD_NOTIFICATION,
    payload: message
  })

  setTimeout(() =>
    dispatch({
      type: TYPES.CLEAR_NOTIFICATION,
    }), 1000)
}


const clearNotifications = (dispatch) => () => {
  dispatch({
    type: TYPES.CLEAR_NOTIFICATION,
  })
}

export const { Provider, Context } = createDataContext(
  notificationsReducer,
  {setNotification, clearNotifications},
  initialState
)