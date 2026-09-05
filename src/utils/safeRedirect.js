// Central guard for full-page navigations driven by server- or URL-supplied values.
//
// (1) Always blocks dangerous URL schemes (javascript:, data:, vbscript:, file:)
//     before assigning window.location — defense-in-depth against a reflected/DOM
//     XSS payload arriving as a redirect target.
// (2) Off-site (open-redirect) protection needs an allow-list of the vendor /
//     partner hosts the participant flow legitimately redirects to. Populate
//     ALLOWED_REDIRECT_HOSTS with those domains and flip ENFORCE_HOST_ALLOWLIST to
//     true. Until then the host check runs in AUDIT mode (logs off-site hosts, does
//     not block) so live vendor redirects are never broken by this change.
const DANGEROUS_SCHEME = /^\s*(javascript|data|vbscript|file):/i;

// TODO(security): fill from the vendor/partner redirect-domain inventory, then set
// ENFORCE_HOST_ALLOWLIST = true to block open redirects.
const ALLOWED_REDIRECT_HOSTS = [];
const ENFORCE_HOST_ALLOWLIST = false;

export function isSafeRedirectUrl(url) {
  if (typeof url !== 'string' || url.trim() === '') return false;
  if (DANGEROUS_SCHEME.test(url)) return false;
  if (ENFORCE_HOST_ALLOWLIST) {
    try {
      const { host } = new URL(url, window.location.origin);
      if (host === window.location.host) return true; // same-origin / relative
      return ALLOWED_REDIRECT_HOSTS.includes(host);
    } catch (_) {
      return false;
    }
  }
  return true;
}

export function safeExternalRedirect(url) {
  if (!isSafeRedirectUrl(url)) {
    // eslint-disable-next-line no-console
    console.error('[safeRedirect] blocked unsafe redirect target');
    return false;
  }
  if (!ENFORCE_HOST_ALLOWLIST) {
    try {
      const { host } = new URL(url, window.location.origin);
      if (host && host !== window.location.host) {
        // eslint-disable-next-line no-console
        console.warn('[safeRedirect] off-site redirect host (audit):', host);
      }
    } catch (_) { /* relative/non-URL — fine */ }
  }
  window.location.href = url;
  return true;
}

export default safeExternalRedirect;
