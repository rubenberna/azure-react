import createDataContext from './createDataContext';
import { azureProvider, getAccessToken, getRolesFromParsedJwt, parseJwt } from '../utils/security.util';

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
  username: null,
  role: null,
  errorMessage: ''
};

const authReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_ERROR:
      return {...state, errorMessage: action.payload};
    case TYPES.LOGIN:
      return {username: action.payload.name, isAuthenticated: true, errorMessage: '', token: action.payload.token, role: action.payload.role};
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
  const {token, account, idToken} = await getAccessToken();
  const parsedJWT = parseJwt(idToken);
  const userRole = getRolesFromParsedJwt(parsedJWT);

  dispatch({
    type: TYPES.LOGIN,
    payload: {
      token,
      name: account.name,
      role: userRole
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
