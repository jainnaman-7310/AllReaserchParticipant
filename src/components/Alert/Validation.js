import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ALERT_BUTTON_CLASS = [
  'mt-5 min-w-[120px] rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white',
  'shadow-[0_10px_22px_rgba(15,127,131,0.18)] transition hover:bg-teal-800',
  'focus:outline-none focus:ring-4 focus:ring-teal-700/15',
].join(' ');

export const AlertBox = (heading, message, t) => {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className='w-[min(420px,calc(100vw-32px))] rounded-2xl border border-slate-200 bg-white px-7 py-6 text-center text-slate-900 shadow-[0_28px_70px_rgba(15,23,42,0.22)]'>
        <div className='mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-red-50 text-2xl font-bold text-red-600'>!</div>
        {heading && <h1 className='mb-2 text-[20px] font-bold leading-7 text-slate-900'>{heading}</h1>}
        <p className='m-0 text-[14px] leading-6 text-slate-500'>{message}</p>
        <button
          type='button'
          className={ALERT_BUTTON_CLASS}
          onClick={() => {
            onClose();
          }}
        >
          {t('home.alert.ok')}
        </button>
      </div>
    ),
  });
};
