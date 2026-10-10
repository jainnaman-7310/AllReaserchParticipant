import axios from 'axios';
import appConfig from 'config/appConfig';

const USE_CANONICAL = String(process.env.REACT_APP_USE_CANONICAL_ENDPOINTS) === 'true';
const CANONICAL = {
  createParticipantV3: 'v2/participants',
  getParticipantDemoStatusV2: 'v2/participants/demo-status',
  participantFailedInScreenersV2: 'v2/screeners/failed',
  checkScreenerForQuotaRouterV2: 'v2/screeners/quota-check',
  saveParticipantReplyV2: 'v2/participants/replies',
  clientRedirectUpdate: 'v2/participants/client-redirect',
  participantsDemographics: 'v2/participants/demographics',
  createParticipantUserEntry: 'v2/participants/entry',
  getExposeClientParticipantData: 'v2/participants/expose-data',
  aiQuestions: 'v2/ai/questions',
  'participant-session-init': 'v2/participants/session',
  'getrandomai-question': 'v2/ai/random-question',
  'submit-randomquestionres': 'v2/ai/random-response',
};

function canonizeUrl(url) {
  if (!USE_CANONICAL || typeof url !== 'string') return url;
  const qIdx = url.indexOf('?');
  const rawPath = qIdx >= 0 ? url.slice(0, qIdx) : url;
  const rest = qIdx >= 0 ? url.slice(qIdx) : '';
  const leadingSlash = rawPath.startsWith('/') ? '/' : '';
  const clean = rawPath.replace(/^\//, '');
  if (CANONICAL[clean]) return leadingSlash + CANONICAL[clean] + rest;
  return url;
}

const apiClient = axios.create({
  baseURL: appConfig.siteURL,
});

apiClient.interceptors.request.use((config) => {
  const nextConfig = config;
  nextConfig.url = canonizeUrl(nextConfig.url);

  try {
    const token = typeof localStorage !== 'undefined' && localStorage.getItem('zamp_identity_token');
    if (token) {
      nextConfig.headers = nextConfig.headers || {};
      nextConfig.headers['x-zamp-identity'] = token;
    }
  } catch (e) {
    // Ignore storage access failures and keep the request working.
  }

  return nextConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error && error.response;
    if (errorResponse && errorResponse.status === 401) {
      // Existing behavior intentionally preserved.
    }
    throw error;
  },
);

// Kept as a function so existing service calls do not need to change.
// The same Axios instance is returned every time instead of axios.create() per request.
export default () => apiClient;
