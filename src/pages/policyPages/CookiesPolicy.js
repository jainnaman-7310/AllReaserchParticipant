/* eslint-disable */
import { Trans } from 'react-i18next';

const CookiesPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 ">

      <p className="text-gray-600 text-sm">
        <Trans i18nKey="cookies.effectiveDate" components={{ bold: <b /> }} />
      </p>

      <p className="mt-4 text-gray-700">
        <Trans i18nKey="cookies.intro" components={{ strong: <strong /> }} />
      </p>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.cookiesTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.cookiesDescription" /></p>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.typesTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.typesIntro" /></p>
      <p className="text-gray-700"><Trans i18nKey="cookies.typesNote" /></p>

      <h6 className="text-lg font-semibold mt-4"><Trans i18nKey="cookies.typesQuestion" /></h6>
      <p className="text-gray-700"><Trans i18nKey="cookies.typesAnswer" /></p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><Trans i18nKey="cookies.sessionCookies" components={{ strong: <strong /> }} /></li>
        <li><Trans i18nKey="cookies.persistentCookies" components={{ strong: <strong /> }} /></li>
      </ul>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.usageTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.usageIntro" /></p>
      <p className="text-gray-700"><Trans i18nKey="cookies.usageDetail" /></p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><Trans i18nKey="cookies.auth" components={{ strong: <strong /> }} /></li>
        <li><Trans i18nKey="cookies.performance" components={{ strong: <strong /> }} /></li>
        <li><Trans i18nKey="cookies.features" components={{ strong: <strong /> }} /></li>
        <li><Trans i18nKey="cookies.analytics" components={{ strong: <strong /> }} /></li>
      </ul>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.adChoicesTitle" /></h3>
      <p className="text-gray-700">
        <Trans i18nKey="cookies.adChoicesText" components={{ aboutCookies: <a href="https://www.aboutcookies.org" target="_blank" className="text-blue-600 hover:underline" /> }} />
      </p>

      <h1 className="text-2xl font-semibold mt-6"><Trans i18nKey="cookies.policyTitle" /></h1>
      <p className="text-gray-700"><Trans i18nKey="cookies.policyText" /></p>

      <h3 className="text-sm font-semibold mt-6"><Trans i18nKey="cookies.avoidCookiesTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.avoidCookiesText" /></p>

      <h3 className="text-sm font-semibold mt-6"><Trans i18nKey="cookies.emailCookiesTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.emailCookiesText" /></p>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.securityTitle" /></h3>
      <p className="text-gray-700"><Trans i18nKey="cookies.securityText" /></p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><Trans i18nKey="cookies.securityPoint1" /></li>
        <li><Trans i18nKey="cookies.securityPoint2" /></li>
        <li><Trans i18nKey="cookies.securityPoint3" /></li>
      </ul>

      <h3 className="text-xl font-semibold mt-6"><Trans i18nKey="cookies.questionsTitle" /></h3>
      <p className="text-gray-700">
        <Trans i18nKey="cookies.questionsText" components={{ emailLink: <a href="mailto:privacy@zamplia.com" className="text-blue-600 hover:underline" /> }} />
      </p>
      <p className="text-gray-700">
        <Trans i18nKey="cookies.contactText" components={{ emailLink: <a href="mailto:privacy@zamplia.com" className="text-blue-600 hover:underline" /> }} />
      </p>
    </div>
  );
};

export default CookiesPolicy;
