import createDataContext from './createDataContext';
import { azureProvider, getAccessToken } from '../utils/security.util';

const TYPES = {
  ADD_ERROR: 'auth/add_error',
  LOGIN: 'auth/login',
  SIGN_OUT: 'auth/signOut',
  CLEAR_ERROR: 'auth/clearError',
  SET_USER: 'auth/setUser'
};

const initialState = {
  isAuthenticated: false,
  token: null,
  errorMessage: '',
  username: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_ERROR:
      return {...state, errorMessage: action.payload};
    case TYPES.LOGIN:
      return {...state, isAuthenticated: true, errorMessage: '', token: action.payload};
    case TYPES.CLEAR_ERROR:
      return {...state, errorMessage: ''};
    case TYPES.SIGN_OUT:
      return initialState;
    case TYPES.SET_USER:
      return {...state, username: action.payload}
    default:
      return state;
  }
};

const signIn = (dispatch) => async () => {
  try {
    const firstTimeRefresh = await getAccessToken();
    dispatch({
      type: TYPES.LOGIN,
      payload: firstTimeRefresh
    });
  } catch (err) {
    dispatch({
      type: TYPES.ADD_ERROR,
      payload: err
    });
  }
};

const getProfile = (dispatch) => async () => {
  const accounts = azureProvider.getAllAccounts();
  dispatch({
    type: TYPES.SET_USER,
    payload: accounts[0].name
  })
};


// Todo: signout from FE

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, getProfile},
  initialState
);
