/* eslint-disable */
import { Trans } from 'react-i18next';

const TermsConditions = () => {
  return (
    <div className="max-w-[794px] w-full max-h-[90vh]">
      <div className="text-gray-700 space-y-4">
        <h3 className="text-lg font-semibold mb-1">
          <Trans i18nKey="terms.generalTitle" />
        </h3>
        <p className="text-sm mb-1">
          <Trans i18nKey="terms.companyName" />
        </p>
        <p className="text-sm">
          <Trans i18nKey="terms.generalIntro" />
        </p>
        <p>
          <Trans i18nKey="terms.effectiveDate" components={{ bold: <b /> }} />
        </p>
        <p>
          <Trans
            i18nKey="terms.contractNotice"
            components={{
              site: (
                <a
                  href="https://www.zamplia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:text-blue-800"
                />
              ),
            }}
          />
        </p>

        <h3 className="text-lg font-semibold">
          <Trans i18nKey="terms.conditionalTitle" />
        </h3>
        <p>
          <Trans i18nKey="terms.conditionalText" />
        </p>

        <h3 className="text-lg font-semibold">
          <Trans i18nKey="terms.restrictionsTitle" />
        </h3>
        <p>
          <Trans i18nKey="terms.restrictionsText" />
        </p>
        <p>
          <Trans i18nKey="terms.contactIntro" />
        </p>
        <p>
          <Trans i18nKey="terms.contactCompany" />
          <br />
          <Trans i18nKey="terms.contactPerson" />
          <br />
          <Trans i18nKey="terms.contactAddress" />
          <br />
          <Trans i18nKey="terms.contactCity" />
          <br />
          <Trans
            i18nKey="terms.contactEmail"
            components={{
              emailLink: (
                <a
                  href="mailto:privacy@zamplia.com"
                  className="text-blue-600 hover:underline"
                />
              ),
            }}
          />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.changesTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.changesText" />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.paymentsTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.paymentsText" />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.warrantyTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.warrantyText" />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.limitationTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.limitationText" />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.indemnityTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.indemnityText" />
        </p>
        <ul className="list-disc pl-8">
          <li><Trans i18nKey="terms.indemnityPoint1" /></li>
          <li><Trans i18nKey="terms.indemnityPoint2" /></li>
          <li><Trans i18nKey="terms.indemnityPoint3" /></li>
          <li><Trans i18nKey="terms.indemnityPoint4" /></li>
        </ul>
        <p>
          <Trans i18nKey="terms.choiceOfLaw" />
        </p>

        <h1 className="text-lg font-semibold">
          <Trans i18nKey="terms.securityMeasuresTitle" />
        </h1>
        <p>
          <Trans i18nKey="terms.securityMeasuresText" />
        </p>

        <h2 className="text-xl font-bold mb-4">
          <Trans i18nKey="terms.dosDontsTitle" />
        </h2>

        <h3 className="text-lg font-semibold text-green-600">
          <Trans i18nKey="terms.doTitle" />
        </h3>
        <ul className="list-disc list-inside mb-4">
          <li><Trans i18nKey="terms.do1" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.do2" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.do3" components={{ strong: <strong /> }} /></li>
        </ul>

        <h3 className="text-lg font-semibold text-red-600">
          <Trans i18nKey="terms.dontTitle" />
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li><Trans i18nKey="terms.dont1" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.dont2" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.dont3" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.dont4" components={{ strong: <strong /> }} /></li>
          <li><Trans i18nKey="terms.dont5" components={{ strong: <strong /> }} /></li>
          <li>
            <Trans i18nKey="terms.dont6" />
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><Trans i18nKey="terms.dont6Point1" /></li>
              <li><Trans i18nKey="terms.dont6Point2" /></li>
              <li><Trans i18nKey="terms.dont6Point3" /></li>
              <li><Trans i18nKey="terms.dont6Point4" /></li>
            </ul>
          </li>
          <li><Trans i18nKey="terms.dont7" /></li>
          <li><Trans i18nKey="terms.dont8" /></li>
          <li><Trans i18nKey="terms.dont9" /></li>
          <li><Trans i18nKey="terms.dont10" /></li>
          <li><Trans i18nKey="terms.dont11" /></li>
        </ul>
      </div>
    </div>
  );
};

export default TermsConditions;
