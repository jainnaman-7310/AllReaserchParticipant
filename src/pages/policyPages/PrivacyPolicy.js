/* eslint-disable */
import {Trans, useTranslation } from 'react-i18next';
const PrivacyPolicy = () => {
    const {t} = useTranslation();
    return (
        <div className="max-w-[794px] w-full max-h-[90vh] p-6">
            <h2 className="text-2xl font-bold text-start mb-4">{t('privacy.introductionTitle')}</h2>
            <div className="text-gray-700 space-y-4">
                <p> {t('privacy.intro1')} </p>
                <p> {t('privacy.intro2')} </p>
                <p> {t('privacy.intro3')} </p>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.collectionTitle')}</h3>
                <p> {t('privacy.collectionIntro')} </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>{t('privacy.collectionPoint1')}</li>
                    <li>{t('privacy.collectionPoint2')}</li>
                    <li>{t('privacy.collectionPoint3')}</li>
                    <li>{t('privacy.collectionPoint4')}</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.useTitle')}</h3>
                <p> {t('privacy.useIntro')} </p>
                <p className="font-semibold">{t('privacy.useSubtitle')}</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>{t('privacy.usePoint1')}</li>
                    <li>{t('privacy.usePoint2')}</li>
                    <li>{t('privacy.usePoint3')}</li>
                    <li>{t('privacy.usePoint4')}</li>
                    <li>{t('privacy.usePoint5')}</li>
                    <li>{t('privacy.usePoint6')}</li>
                    <li>{t('privacy.usePoint7')}</li>
                    <li>{t('privacy.usePoint8')}</li>
                    <li>{t('privacy.usePoint9')}</li>
                    
                </ul>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.consentTitle')}</h3>
                <p> <Trans i18nKey="privacy.consentText" /> </p>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.sensitiveTitle')}</h3>
                <p> <Trans i18nKey="privacy.sensitiveText" /> </p>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.sharingTitle')}</h3>
                <p> {t('privacy.sharingIntro')} </p>
                <ul className="list-disc list-inside space-y-2">
                    <li> {t('privacy.sharingPoint1')} </li>
                    <li> {t('privacy.sharingPoint2')} </li>
                    <li> {t('privacy.sharingPoint3')} </li>
                    <li> {t('privacy.sharingPoint4')} </li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.securityTitle')}</h3>
                <p> {t('privacy.securityText')} </p>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.deviceTitle')}</h3>
                <p> {t('privacy.deviceText')} </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>{t('privacy.devicePoint1')}</li>
                    <li>{t('privacy.devicePoint2')}</li>
                    <li>{t('privacy.devicePoint3')}</li>
                    
                </ul>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.dataUseTitle')}</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>{t('privacy.dataUsePoint1')}</li>
                    <li>{t('privacy.dataUsePoint2')}</li>
                    <li>{t('privacy.dataUsePoint3')}</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">{t('privacy.rightTitle')}</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>{t('privacy.rightPoint1')}</li>
                    <li>{t('privacy.rightPoint2')}</li>
                </ul>
            </div>
        </div>
    )
}

export default PrivacyPolicy