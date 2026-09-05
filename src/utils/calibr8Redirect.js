// Single-redirect guard for the server-side Calibr8 gate.
//
// Several gated endpoints (getExposeClientParticipantData,
// getParticipantDemoStatusV2, participantsDemographics, createParticipantV3) are
// dispatched CONCURRENTLY on mount, and each returns { calibr8Required,
// redirectUrl } until Calibr8 is completed. Without a guard, each thunk assigned
// window.location.href independently, so two concurrent gated calls both
// navigated to the Calibr8 screen — the "asked twice" symptom.
//
// This ensures at most ONE Calibr8 redirect per page load. The module-level flag
// naturally resets on the full-page navigation to Calibr8 (and on the reload when
// the user returns), so it only suppresses duplicate redirects within the same
// page load, never a legitimately needed later redirect.
import { safeExternalRedirect } from './safeRedirect';

let redirecting = false;

export function redirectToCalibr8(redirectUrl) {
  if (!redirectUrl) return false;
  if (redirecting) return true; // a concurrent gated call already started the redirect
  redirecting = true;
  safeExternalRedirect(redirectUrl);
  return true;
}

export default redirectToCalibr8;
