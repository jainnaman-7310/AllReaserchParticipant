export const POSTAL_CODE_RULES = {
  US: {
    regex: /^\d{5}(-\d{4})?$/,
    errorKey: 'app.us_zip_error',
  },

  CA: {
    regex: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    privacyRegex: /^[A-Z]\d[A-Z]$/i,
    errorKey: 'app.ca_zip_error',
  },

  GB: {
    regex: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    privacyRegex: /^[A-Z]{1,2}\d[A-Z\d]?$/i,
    errorKey: 'app.gb_zip_error',
  },

  DE: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.de_zip_error',
  },

  FR: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.fr_zip_error',
  },

  ES: {
    regex: /^\d{5}$/,
    errorKey: 'app.es_zip_error',
  },

  IT: {
    regex: /^\d{5}$/,
    errorKey: 'app.it_zip_error',
  },

  AU: {
    regex: /^\d{4}$/,
    errorKey: 'app.au_zip_error',
  },

  NZ: {
    regex: /^\d{4}$/,
    errorKey: 'app.nz_zip_error',
  },

  IN: {
    regex: /^\d{6}$/,
    errorKey: 'app.in_zip_error',
  },

  BR: {
    regex: /^\d{5}-?\d{3}$/,
    errorKey: 'app.br_zip_error',
  },

  PH: {
    regex: /^\d{4}$/,
    errorKey: 'app.ph_zip_error',
  },

  BE: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.be_zip_error',
  },

  NL: {
    regex: /^\d{4}\s?[A-Z]{2}$/i,
    privacyRegex: /^\d{4}$/i,
    errorKey: 'app.nl_zip_error',
  },

  JP: {
    regex: /^\d{3}-?\d{4}$/,
    privacyRegex: /^\d{3}$/,
    errorKey: 'app.jp_zip_error',
  },

  CH: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  NO: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  SE: {
    regex: /^\d{3}\s?\d{2}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  DK: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  FI: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  IE: {
    regex: /^[A-Z0-9]{3}\s?[A-Z0-9]{4}$/i,
    privacyRegex: /^[A-Z0-9]{3,7}$/i,
    errorKey: 'app.zip_error',
  },

  SG: {
    regex: /^\d{6}$/,
    privacyRegex: /^\d{3,6}$/,
    errorKey: 'app.zip_error',
  },

  LU: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  IS: {
    regex: /^\d{3}$/,
    privacyRegex: /^\d{3}$/,
    errorKey: 'app.zip_error',
  },

  HK: {
    regex: /^[A-Z0-9\s-]{2,10}$/i,
    privacyRegex: /^[A-Z0-9\s-]{3,10}$/i,
    errorKey: 'app.zip_error',
  },

  AT: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  MX: {
    regex: /^\d{5}$/,
    errorKey: 'app.zip_error',
  },

  BD: {
    regex: /^\d{4}$/,
    errorKey: 'app.zip_error',
  },

  CN: {
    regex: /^\d{6}$/,
    privacyRegex: /^\d{3,6}$/,
    errorKey: 'app.zip_error',
  },

  KR: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  VN: {
    regex: /^\d{5,6}$/,
    privacyRegex: /^\d{3,6}$/,
    errorKey: 'app.zip_error',
  },

  MY: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  TH: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  ID: {
    regex: /^\d{5}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  PL: {
    regex: /^\d{2}-?\d{3}$/,
    privacyRegex: /^\d{2,5}$/,
    errorKey: 'app.zip_error',
  },

  PT: {
    regex: /^\d{4}-?\d{3}$/,
    privacyRegex: /^\d{4}$/,
    errorKey: 'app.zip_error',
  },

  CZ: {
    regex: /^\d{3}\s?\d{2}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  SK: {
    regex: /^\d{3}\s?\d{2}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },

  HU: {
    regex: /^\d{4}$/,
    privacyRegex: /^\d{3,4}$/,
    errorKey: 'app.zip_error',
  },

  RO: {
    regex: /^\d{6}$/,
    privacyRegex: /^\d{3,6}$/,
    errorKey: 'app.zip_error',
  },

  GR: {
    regex: /^\d{3}\s?\d{2}$/,
    privacyRegex: /^\d{3,5}$/,
    errorKey: 'app.zip_error',
  },
};

export const ZIP_DEMO_IDS = [
  '620196Demo1562404395959',
  '620196Demo15624043959593',
  '1420238Demo1694715287569',
  '1620236Demo1689526219196',
  '2020214Demo1621489323479',
  '2220213Demo1619081142384',
  '2220226Demo1658499245547',
  '2220226Demo1658500202186',
  '2220226Demo1658500202186',
  '2820213Demo1619594031167',
  '320236Demo1688361186450',
  '1220230Demo1673521005742',
  '920231Demo1675926945067',
  '420214Demo1620120012821',
  '2820233Demo1682678130614',
  '320214Demo1620072003732',
];

export const DB_POSTAL_COUNTRIES = [
  'SE',
  'NL',
  'IT',
  'FR',
  'ES',
  'CH',
  'AU',
  'US',
  'GB',
  'NZ',
  'DE',
];
