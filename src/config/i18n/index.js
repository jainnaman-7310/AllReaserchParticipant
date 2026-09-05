import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import * as rdd from 'react-device-detect';

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng',
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: '',
    fallbackLng: 'en',
    parseMissingKeyHandler(key) {
      return `???${key}???`;
    },
    detection: options,
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
  });

// Added a fallback language detection for inconsistent browser behavior (e.g., QQ or 360 Mobile).
// This runs after i18n initialization and doesn’t interfere with existing detection logic.
try {
  const ua = navigator.userAgent || '';
  const browserLang = navigator.language || navigator.userLanguage || '';

  // Pull values from react-device-detect (rdd)
  const { isMobile, browserName } = rdd;

  // Safari-like detection for iPhone browsers
  const isIPhone = /iPhone/i.test(ua);
  const isSafariLike = /Version\/[\d.]+ Safari\/[\d.]+/i.test(ua);
  const isChromeiOS = /CriOS|EdgiOS|FXIOS/i.test(ua);
  const isUCBrowser = /UCBrowser|UC Browser/i.test(ua); // UC Browser also has some inconsistencies, but it's less common in China and more likely to report correctly
  // QQ and 360 browser indicators
  const isQQ = /MQQBrowser/i.test(ua);
  const is360 = isIPhone
    && isSafariLike
    && !isChromeiOS
    && browserName === 'Brave'; // Brave tag is common in 360 iOS builds
  const isChineseUA = /zh-CN|zh-TW|zh-HK|zh-SG/i.test(ua);
  // Optional mismatch detection
  const localeMismatch = isChineseUA && !/^zh/i.test(browserLang);
  const QQMismatch = /^en/i.test(browserLang) && !isChineseUA;
  // QQ or 360 mobile browsers sometimes misreport Chinese users as en_IN
  if ((isQQ || is360 || isUCBrowser) && (isChineseUA || localeMismatch || QQMismatch) && isMobile) {
    i18n.changeLanguage('zh_CN');
  }
} catch (err) {
  // silently ignored — non-critical fallback detection
}

export { i18n };
