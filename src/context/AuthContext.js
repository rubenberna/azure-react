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
};

const authReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_ERROR:
      return {...state, errorMessage: action.payload};
    case TYPES.LOGIN:
      return {username: action.payload.name, isAuthenticated: true, errorMessage: '', token: action.payload.token};
    case TYPES.CLEAR_ERROR:
      return {...state, errorMessage: ''};
    case TYPES.SIGN_OUT:
      return initialState;
    case TYPES.SET_USER:
      return {...state, username: action.payload};
    default:
      return state;
  }
};

const signIn = (dispatch) => async () => {
  const {token, name} = await getAccessToken();
  dispatch({
    type: TYPES.LOGIN,
    payload: {
      token,
      name
    }
  });
};

const signOut = (dispatch) => async () => {
  await azureProvider.logout();

  dispatch({
    type: TYPES.SIGN_OUT
  });
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut},
  initialState
);
