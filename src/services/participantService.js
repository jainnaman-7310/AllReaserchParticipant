import CryptoJS from 'crypto-js';
import appConfig from 'config/appConfig';
import client from './index';

// Transport encryption for the participant session-init endpoint. The key comes
// ONLY from the build environment (REACT_APP_DATA_PROTECTION_KEY) — never
// hardcoded here. NOTE: any key embedded in a JS bundle is obfuscation, NOT a
// security boundary; actual Calibr8 enforcement happens server-side in
// createParticipantV3, which re-derives eligibility on every request.
const SECURITY_PAYLOAD_KEY = process.env.REACT_APP_DATA_PROTECTION_KEY;
const encryptSecurityPayload = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECURITY_PAYLOAD_KEY).toString();
const decryptSecurityPayload = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECURITY_PAYLOAD_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const createParticipantUserEntryApi = (vendorId, browserInfo, userLandingUrl) => client().post('createParticipantUserEntry', {
  vendorId,
  browserData: JSON.stringify(browserInfo),
  userLandingUrl,
  versionNumber: appConfig.version,
  userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
});
export const getParticipantDemoStatusV2Api = (vendorId, browserInfo, userLandingUrl) => client().get('getParticipantDemoStatusV2', {
  params: {
    vendorId,
    userLandingUrl,
    versionNumber: appConfig.version,
    userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
  },
});
export const createParticipantV3Api = (participantData, landingUrlString, newUserId, PID, botDetectionResult, browserLang) => client().get('createParticipantV3', {
  params: {
    queryParams: participantData,
    userLandingUrl: landingUrlString,
    cookieUserid: newUserId,
    PID,
    b2r: botDetectionResult && botDetectionResult.bot ? 1 : 0,
    userLang: browserLang,
    userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
  },
});

export const participantsDemographicsApi = (participantData, landingUrlString, newUserId, browserLang) => client().get('participantsDemographics', {
  params: {
    queryParams: participantData,
    userLandingUrl: landingUrlString,
    cookieUserid: newUserId,
    appType: 'zampparticipantV2',
    userLang: browserLang,
    userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
  },
});
export const participantFailedInScreenersV2Api = (data) => client().post('participantFailedInScreenersV2', data);
export const checkScreenerForQuotaRouterV2Api = (params) => client().post('checkScreenerForQuotaRouterV2', params);
export const saveParticipantReplyV2Api = (data) => client().post('saveParticipantReplyV2', data);

export const clientRedirectUpdateApi = (data) => client().get('clientRedirectUpdate', {
  params: {
    studyId: data.studyId,
    pid: data.pid,
    redirectUrl: data.redirectUrl,
    userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
  },
});

export const getExposeClientParticipantDataApi = (data) => client().get('getExposeClientParticipantData', {
  params: data,
});

export const getCMQuestionnaireApi = (data) => client().get('chuck-miller/get-questions', {
  params: data,
});

export const saveCMResponseApi = (data) => client().post('chuck-miller/submit-response', data);

export const getRandomQuestionApi = (data) => client().get('getrandomai-question', {
  params: data,
});

export const submitRandomQuestionApi = (data) => client().post('submit-randomquestionres', data);

export const getAiQuestionApi = (studyId) => client().get(`/aiQuestions?sid=${studyId}`);

export const getRouterV4AIQuestionApi = (data) => client().post('/getRouterV4AIQuestion', data);
export const getRouterV4AINextQuestionApi = (data) => client().post('/getRouterV4AINextQuestion', data);

export const getAiQuestionReviewApi = (data) => client().post('submit-randomquestionres', data, {
  headers: {
    'Content-Type': 'application/json',
  },
});
function storeIdentityToken(token) {
  if (token && typeof token === 'string') {
    try { localStorage.setItem('zamp_identity_token', token); } catch (e) { /* ignore */ }
  }
}
export const getCheckSecurityPassedApi = async (data) => {
  if (!SECURITY_PAYLOAD_KEY) {
    // Build misconfiguration: REACT_APP_DATA_PROTECTION_KEY was not set at build
    // time. Fall back to plaintext (still accepted by the backend) so the
    // participant flow keeps working; enforcement is server-side regardless.
    // eslint-disable-next-line no-console
    console.error('REACT_APP_DATA_PROTECTION_KEY is not set — session-init payload sent unencrypted.');
    const plainRes = await client().post(appConfig.checkSecurityEndpoint, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appConfig.checkSecurityApiKey,
      },
    });
    storeIdentityToken(plainRes?.data?.identityToken);
    return plainRes;
  }
  const result = await client().post(appConfig.checkSecurityEndpoint, { data: encryptSecurityPayload(data) }, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': appConfig.checkSecurityApiKey,
    },
  });
  // Backend mirrors the request mode: encrypted request → { data: <ciphertext> }
  if (result?.data && typeof result.data.data === 'string') {
    result.data = decryptSecurityPayload(result.data.data);
  }
  storeIdentityToken(result?.data?.identityToken);
  return result;
};

// Persist the server-signed identity token so the axios factory can echo it as the
// x-zamp-identity header on subsequent participant calls. Safe no-op if absent.

export const getValidatePostalCodeApi = (data) => client().post('validatePostalCode', data, {
  headers: {
    'Content-Type': 'application/json',
  },
});
