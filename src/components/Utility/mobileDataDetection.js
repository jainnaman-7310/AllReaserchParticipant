import * as rdd from 'react-device-detect';

function detectMobileData(browserLang) {
  try {
    const ua = navigator.userAgent || '';

    // Pull values from react-device-detect (rdd)
    const { isMobile, browserName } = rdd;

    // Safari-like detection for iPhone browsers
    const isIPhone = /iPhone/i.test(ua);
    const isSafariLike = /Version\/[\d.]+ Safari\/[\d.]+/i.test(ua);
    const isChromeiOS = /CriOS|EdgiOS|FXIOS/i.test(ua);
    const isUCBrowser = /UCBrowser|UC Browser/i.test(ua); // UC Browser also has some inconsistencies, but it's less common in China and more likely to report correctly

    // QQ and 360 browser indicators
    const isQQ = /MQQBrowser/i.test(ua);
    const is360 = isIPhone && isSafariLike && !isChromeiOS && (browserName === 'Brave' || /QHBrowser|Qihoo|360|Quark/i.test(ua)
    || (Intl.DateTimeFormat().resolvedOptions().timeZone || '').startsWith('Asia'));

    const isChineseUA = /zh-CN|zh-TW|zh-HK|zh-SG/i.test(ua);

    // Optional mismatch detection
    const localeMismatch = isChineseUA && !/^zh/i.test(browserLang);
    const QQMismatch = /^en/i.test(browserLang) && !isChineseUA;

    // QQ or 360 mobile browsers sometimes misreport Chinese users as en_IN
    if ((isQQ || is360 || isUCBrowser) && (isChineseUA || localeMismatch || QQMismatch) && isMobile) {
      return 'zh';
    }

    return browserLang;
  } catch (err) {
    return browserLang;// fallback
  }
}

export default detectMobileData;
