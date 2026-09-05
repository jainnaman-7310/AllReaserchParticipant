import React from 'react';
import { useTranslation } from 'react-i18next';
import clock from '../../assets/images/clock.png';
import warning from '../../assets/warning.png';
import alertt from '../../assets/alert.png';
import bulb from '../../assets/images/bulb.png';
import lock from '../../assets/images/lock.png';
import star from '../../assets/images/star.png';

function Header() {
  const { t } = useTranslation();
  const desktopLayout = (
    <div id='desktopMaincontainer'>
      <div className='top-half'>
        <h1 className='utilheading'>{t('home.heading')}</h1>
        <p className='intro-text'>
          {t('home.introText')}
        </p>
        <div className='tips-container'>
          {/* First tip */}
          <div className='tip-box'>
            <div className='utilimage-box'>
              <img src={bulb} alt='Bulb' className='bulbimage' />
            </div>
            <div className='tip-text'>
              <h3>{t('home.tip1.heading')}</h3>
              <p>{t('home.tip1.text')}</p>
            </div>
          </div>
          {/* Second tip */}
          <div className='tip-box'>
            <div className='utilimage-box'>
              <img src={clock} alt='Zamplia' className='utilimage' />
            </div>
            <div className='tip-text'>
              <h3>{t('home.tip2.heading')}</h3>
              <p>{t('home.tip2.text')}</p>
            </div>
          </div>

          {/* Keep it Genuine */}
          <div className='tip-box'>
            <div className='utilimage-box'>
              <img src={lock} alt='Zamplia' className='lockimage' />
            </div>
            <div className='tip-text'>
              <h3>{t('home.tip3.heading')}</h3>
              <p>{t('home.tip3.text')}</p>
            </div>
          </div>

          <div className='tip-box'>
            <div className='utilimage-box'>
              <img src={star} alt='Zamplia' className='starimage' />
            </div>
            <div className='tip-text'>
              <h3>{t('home.tip4.heading')}</h3>
              <p>{t('home.tip4.text')}</p>
            </div>
          </div>
        </div>
        <div className='bottom-section'>
          <div className='footer-message'>
            <div className='footerimage-box'>
              <img src={warning} alt='Zamplia' className='warningimg' />
            </div>
            <div className='tip-text'>
              <p>{t('home.footermessage')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const mobileLayout = (
    <div id='mobileMainContainer'>
      <div className='mobileContainer'>
        <h1 className='mobileHeading'>{t('home.heading')}</h1>
        <p className='mobileIntroText'>
          {t('home.introText')}
        </p>

        <div className='mobileTipsContainer'>
          <div className='mobileTipBox'>
            <img src={bulb} alt='Bulb' className='mobBulb' />
            <h3>{t('home.tip1.mobileHeading')}</h3>
          </div>

          <div className='mobileTipBox'>
            <img src={clock} alt='Clock' className='mobClock' />
            <h3>{t('home.tip2.mobileHeading')}</h3>
          </div>

          <div className='mobileTipBox'>
            <img src={lock} alt='Stay Genuine' className='mobLock' />
            <h3>{t('home.tip3.mobileHeading')}</h3>
          </div>

          <div className='mobileTipBox'>
            <img src={star} alt='Earn More Rewards' className='mobStar' />
            <h3>{t('home.tip4.mobileHeading')}</h3>
          </div>
        </div>
        <div className='mobileFooterMessage'>
          <div className='mobileFooterimage-box'>
            <img src={alertt} alt='Zamplia' className='alertt' />
          </div>
          <p>{t('home.mobileFooterMessage')}</p>
        </div>
      </div>
    </div>
  );
  return (
    <header className='header'>
      <div className='desktopView'>{desktopLayout}</div>
      <div className='mobileView'>{mobileLayout}</div>
    </header>
  );
}

export default Header;
