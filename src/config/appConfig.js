let siteURL = process.env.REACT_APP_API_URL;
const currentURL = window.location.href;

// hotfix for redirecting to correct user service url based on respondent landing url
if (currentURL.includes('https://respondentlanding-hotfix.azurewebsites.net')) {
  siteURL = 'https://zampliauserservice-hotfix.azurewebsites.net/api/';
}

const appConfig = {
  siteURL,
  version: '1.1.15',
  checkSecurityEndpoint: process.env.REACT_APP_CHECK_SECURITY_ENDPOINT,
  checkSecurityApiKey: process.env.REACT_APP_CHECK_SECURITY_API_KEY,
};

export default appConfig;
