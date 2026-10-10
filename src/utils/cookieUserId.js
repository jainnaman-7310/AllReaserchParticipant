import Cookies from 'universal-cookie';
import { browserFingerprints } from 'sentinel-guard.js';

const cookies = new Cookies();
const COOKIE_NAME = 'userId';

let pendingCookieUserId = null;

const normalizeCookieUserId = (value) => {
  if (value === undefined || value === null) {
    return '';
  }

  const normalizedValue = String(value).trim();

  if (
    !normalizedValue
    || normalizedValue === 'undefined'
    || normalizedValue === 'null'
  ) {
    return '';
  }

  return normalizedValue;
};

const createFallbackCookieUserId = () => {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return `zamp-${window.crypto.randomUUID()}`;
  }

  return `zamp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const persistCookieUserId = (value) => {
  cookies.set(COOKIE_NAME, value, {
    path: '/',
    sameSite: 'lax',
    secure: window.location.protocol === 'https:',
  });
};

export const getStoredCookieUserId = () => {
  const cookieUserId = normalizeCookieUserId(cookies.get(COOKIE_NAME));

  if (cookieUserId) {
    return cookieUserId;
  }

  cookies.remove(COOKIE_NAME, { path: '/' });
  return '';
};

export const getCookieUserId = async () => {
  const existingCookieUserId = getStoredCookieUserId();

  if (existingCookieUserId) {
    return existingCookieUserId;
  }

  if (!pendingCookieUserId) {
    pendingCookieUserId = browserFingerprints()
      .then((fingerprintId) => (
        normalizeCookieUserId(fingerprintId) || createFallbackCookieUserId()
      ))
      .catch(() => createFallbackCookieUserId())
      .then((cookieUserId) => {
        persistCookieUserId(cookieUserId);
        return cookieUserId;
      })
      .finally(() => {
        pendingCookieUserId = null;
      });
  }

  return pendingCookieUserId;
};
