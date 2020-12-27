import { PublicClientApplication } from '@azure/msal-browser';
import { APP_ID, AZURE_AUTHORITY, SCOPES } from '../config/environment';

const MSAL_CONFIG = {
  auth: {
    clientId: APP_ID,
    redirectUri: window.location.origin,
    authority: AZURE_AUTHORITY,
    postLogoutRedirectUri: window.location.origin,
  },
};

export const azureProvider = new PublicClientApplication(MSAL_CONFIG);
export const scopeRequestConfig = {
  scopes: SCOPES.split(',')
};

export const getAccessToken = async () => {
  const allAccounts = azureProvider.getAllAccounts();
  try {
    if (allAccounts?.length <= 0) throw new Error('login_required');
    const silentResult = await azureProvider.acquireTokenSilent({
      scopeRequestConfig,
      account: allAccounts[0]
    });

    return {
      token: silentResult.accessToken,
      idToken: silentResult.idToken,
      account: allAccounts[0]
    }
  } catch (err) {
    if (isInteractionNeeded(err)) {
      const interactiveResult = await azureProvider.loginPopup(scopeRequestConfig);
      const allAccounts = azureProvider.getAllAccounts();

      return {
        token: interactiveResult.accessToken,
        idToken: interactiveResult.idToken,
        account: allAccounts[0]
      }
    } else {
      throw err;
    }
  }
}

export const isInteractionNeeded = (error) => {
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

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getRolesFromParsedJwt = (parsedJWT) => {
  if (parsedJWT?.roles instanceof Array) {
    return parsedJWT?.roles[0]?.toUpperCase();
  } else{
    return parsedJWT?.roles?.toUpperCase();
  }
}