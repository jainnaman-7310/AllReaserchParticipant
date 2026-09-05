/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { safeExternalRedirect } from './safeRedirect';

export const setBrowserData = (browserData, requestData) => {
  if (requestData) {
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.replace('-', '_');
    browserData.browserLang = browserLang;
    browserData.studyId = requestData.studyId;
    browserData.uID = requestData.userId;
    browserData.vid = requestData.vendorId;
  }
  return browserData;
};

export const getBrowserLanguage = () => {
  const detectBrowserLanguage = require('detect-browser-language');
  let langCodeOfBrowser = detectBrowserLanguage();
  if (langCodeOfBrowser.includes('-')) {
    langCodeOfBrowser = langCodeOfBrowser.split('-')[0];
  }
  return langCodeOfBrowser;
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const redirectToUrl = (url) => {
  const queryString = window.location.search;
  let isHoldForVoxco = false;
  if (queryString !== '') {
    if (queryString.includes('2420215VENDOR1624513492101')) {
      isHoldForVoxco = true;
    }
  }

  //   if (isHoldForVoxco) {
  // window.location.href = appConfig.azureFunctions.EVA_REDIRECT_URL;
  //   } else {
  safeExternalRedirect(url);
  //   }
};
