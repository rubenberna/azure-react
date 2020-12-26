import { PublicClientApplication } from '@azure/msal-browser';
import { APP_ID, REDIRECT_URI, SCOPES } from '../config/environment';

const MSAL_CONFIG = {
  auth: {
    clientId: APP_ID,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: REDIRECT_URI,
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
      name: allAccounts[0].name
    }
  } catch (err) {
    if (isInteractionNeeded(err)) {
      const interactiveResult = await azureProvider.loginPopup(scopeRequestConfig);
      const allAccounts = azureProvider.getAllAccounts();

      return {
        token: interactiveResult.accessToken,
        name: allAccounts[0].name
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
