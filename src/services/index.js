import axios from 'axios';
import appConfig from 'config/appConfig';
// import { getAccessToken } from 'config/localStorage';
// import { userLogout } from 'actions/userAuth';

// ---------------------------------------------------------------------------
// Canonical endpoint rename (flag-gated). The backend serves BOTH legacy and
// canonical /v2/... names (additive aliases). This interceptor rewrites the
// outgoing path only when REACT_APP_USE_CANONICAL_ENDPOINTS=true, so it is safe
// to flip only AFTER the backend is deployed + validated. Default = legacy.
// ---------------------------------------------------------------------------
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
  'chuck-miller/get-questions': 'v2/questionnaires/cm/get-questions',
  'chuck-miller/submit-response': 'v2/questionnaires/cm/submit-response',
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

export default (headers = {}) => {
  const service = axios.create({
    baseURL: appConfig.siteURL,
    headers: {
      // Authorization: `Bearer ${getAccessToken()}`,
      ...headers,
    },
  });
  service.interceptors.request.use((config) => {
    config.url = canonizeUrl(config.url);
    // Echo the server-signed identity token (issued at session-init) so the backend
    // can trust the participant identity over tamperable query params. No token yet
    // ⇒ header omitted ⇒ backend falls back to existing behaviour (non-breaking).
    try {
      const t = typeof localStorage !== 'undefined' && localStorage.getItem('zamp_identity_token');
      if (t) {
        config.headers = config.headers || {};
        config.headers['x-zamp-identity'] = t;
      }
    } catch (e) { /* ignore storage access errors */ }
    return config;
  });
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      // Guard: network errors have no `error.response` (previously threw a
      // TypeError here, masking the real error).
      const errorResponse = error && error.response;
      if (errorResponse && errorResponse.status === 401) {
        // window.location = '/unauthorized';
      }
      throw error;
    },
  );
  return service;
};
