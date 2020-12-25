import { PublicClientApplication } from '@azure/msal-browser';
import { APP_ID, REDIRECT_URI, SCOPES } from '../config/environment';

export const MSAL_CONFIG = {
  auth: {
    clientId: APP_ID,
    redirectUri: REDIRECT_URI
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};

export const azureProvider = new PublicClientApplication(MSAL_CONFIG);
export const scopeRequestConfig = {
  scopes: SCOPES.split(',')
}

export const getAccessToken = async () => {
  const allAccounts = azureProvider.getAllAccounts();
  try {
    if (allAccounts?.length <= 0) throw new Error('login_required');
    const silentResult = await azureProvider.acquireTokenSilent({
      scopeRequestConfig,
      account: allAccounts[0]
    });

    return silentResult.accessToken;
  } catch (err) {
    if (isInteractionNeeded(err)) {
      const interactiveResult = await azureProvider.acquireTokenPopup({
        scopeRequestConfig
      });

      return interactiveResult.accessToken;
    } else {
      throw err;
    }
  }
};

const isInteractionNeeded = (error) => {
  if (!error.message || error.message.length <= 0) {
    return false;
  }

  return (
    error.message.indexOf('consent_required') > -1 ||
    error.message.indexOf('interaction_required') > -1 ||
    error.message.indexOf('login_required') > -1 ||
    error.message.indexOf('no_account_in_silent_request') > -1
  );
};

export const getUserProfile = async () => {
  try {
    const accessToken = await getAccessToken(scopeRequestConfig);
    if (accessToken) {
      return {
        isAuthenticated: true,
        user: {},
        error: {message: "Access token:", debug: accessToken}
      };
    }
  } catch (err) {
    return {
      isAuthenticated: false,
      user: {},
      error: normalizeError(err)
    };
  }
};

const normalizeError = (error) => {
  let normalizedError = {};

  if (typeof (error) === 'string') {
    const errParts = error.split('|');
    normalizedError = errParts.length > 1 ?
      {message: errParts[1], debug: errParts[0]} :
      {message: error};
  } else {
    normalizedError = {
      message: error.message,
      debug: JSON.stringify(error)
    };
  }
  return normalizedError;
};