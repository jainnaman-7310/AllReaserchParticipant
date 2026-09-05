import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css';

export const AlertBox = (heading, message, t) => {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className='alert-custom-ui'>
        {heading && <h1>{heading}</h1>}

        <p>{message}</p>
        <button
          type='button'
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
