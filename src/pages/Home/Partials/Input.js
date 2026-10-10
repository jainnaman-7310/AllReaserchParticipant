import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDemoAlert } from 'slices/ParticipantSlice';

const INPUT_CLASS = [
  'w-full max-w-[600px] rounded-xl border border-slate-300 bg-white px-4 py-3',
  'text-[15px] text-slate-900 outline-none transition focus:border-teal-700',
  'focus:ring-4 focus:ring-teal-700/10',
].join(' ');

function QuestionTitle({ questionTitle }) {
  return (
    <div className='max-w-3xl'>
      <h3 className='m-0 break-words text-[18px] font-bold leading-7 tracking-[-0.01em] text-slate-900 sm:text-[20px] lg:text-[21px]'>
        {questionTitle}
      </h3>
    </div>
  );
}

function Input({
  type,
  questionTitle,
  questionOptions,
  saveUserAnswer,
  userAnswer,
  userMultiSelectAnswer,
  setUserMultiselectAnswer,
  demoError,
  isCategoryQuestion,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const saveMultiSelectAnswer = (val) => {
    const isFound = userMultiSelectAnswer.find((element) => element === val);
    if (isFound) {
      const currentIds = userMultiSelectAnswer.filter((data) => data !== val);
      setUserMultiselectAnswer(currentIds);
    } else if (isCategoryQuestion) {
      setUserMultiselectAnswer([val, ...userMultiSelectAnswer]);
    } else {
      setUserMultiselectAnswer([val, ...userMultiSelectAnswer]);
    }
  };

  const getOptionData = (opData) => {
    const returnData = [];
    if (opData && opData.length > 0) {
      opData.map((item, key) => returnData.push(
        <option value={item._id} key={key}>
          {item.optionText}
        </option>,
      ));
    }
    return returnData;
  };

  const setQuestionrange = (e) => {
    saveUserAnswer(e.target.value);
    if (demoError && demoError.errorType === 'age_error') {
      dispatch(setDemoAlert({}));
    }
  };

  const setQuestionText = (e) => {
    saveUserAnswer(e.target.value);
    if (
      demoError
      && (demoError.errorType === 'postal_error'
        || demoError.errorType === 'zip_error'
        || demoError.errorType === 'fsa_error')
    ) {
      dispatch(setDemoAlert({}));
    }
  };

  const getErrorMessage = () => {
    switch (demoError.errorType) {
      case 'zip_error':
        return t(`${demoError.message}`);
      case 'fsa_error':
        return t('home.fsa.error');
      default:
        return t('home.postal.error');
    }
  };

  const inputClass = INPUT_CLASS;
  const errorClass = 'mt-2 flex w-full max-w-[600px] items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] leading-5 text-red-700';
  const optionBase = 'flex min-h-[50px] cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition';

  const renderError = (message) => (
    <span className={errorClass}>
      <span className='grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-red-600 text-[11px] font-bold text-white'>!</span>
      <span>{message}</span>
    </span>
  );

  switch (type) {
    case 'text':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 max-h-[54vh] overflow-y-auto pr-1'>
            <input type='text' className={inputClass} value={userAnswer} placeholder='' onChange={setQuestionText} />
            {demoError && (demoError.errorType === 'postal_error' || demoError.errorType === 'zip_error' || demoError.errorType === 'fsa_error') && renderError(getErrorMessage())}
          </div>
        </div>
      );
    case 'openended':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 max-h-[54vh] overflow-y-auto pr-1'>
            <input type='text' className={inputClass} value={userAnswer} placeholder='' onChange={(e) => saveUserAnswer(e.target.value)} />
          </div>
        </div>
      );
    case 'radio':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 grid max-h-[54vh] gap-2.5 overflow-y-auto pr-1'>
            {questionOptions.map((item, key) => {
              const selected = item._id === userAnswer;
              return (
                <label
                  className={`${optionBase} ${selected ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}`}
                  key={key}
                  htmlFor={`flexRadioDefault${key}`}
                >
                  <input
                    className='mt-0.5 h-[18px] w-[18px] shrink-0 accent-teal-700'
                    type='radio'
                    name='radio'
                    checked={selected}
                    value={item._id}
                    id={`flexRadioDefault${key}`}
                    onChange={(e) => saveUserAnswer(e.target.value)}
                  />
                  <span className='min-w-0 flex-1 break-words text-[14px] font-medium leading-6 text-slate-700'>{item.optionText}</span>
                </label>
              );
            })}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 max-h-[54vh] overflow-y-auto pr-1'>
            <select className={inputClass} value={userAnswer} onChange={(e) => saveUserAnswer(e.target.value)}>
              <option value=''>Select</option>
              {getOptionData(questionOptions)}
            </select>
          </div>
        </div>
      );
    case 'multiselect':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 grid max-h-[54vh] gap-2.5 overflow-y-auto pr-1'>
            {questionOptions.map((item, key) => {
              const selected = userMultiSelectAnswer && Array.isArray(userMultiSelectAnswer) && userMultiSelectAnswer.includes(item._id);
              return (
                <label
                  className={`${optionBase} ${selected ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}`}
                  key={key}
                  htmlFor={`flexRadioDefault${key}`}
                >
                  <input
                    className='mt-0.5 h-[18px] w-[18px] shrink-0 accent-teal-700'
                    data-attr='check'
                    type='checkbox'
                    checked={selected}
                    data-check={selected}
                    value={item._id}
                    id={`flexRadioDefault${key}`}
                    onChange={(e) => saveMultiSelectAnswer(e.target.value)}
                  />
                  <span className='min-w-0 flex-1 break-words text-[14px] font-medium leading-6 text-slate-700'>{item.optionText}</span>
                </label>
              );
            })}
          </div>
        </div>
      );
    case 'range':
      return (
        <div>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='mt-5 max-h-[54vh] overflow-y-auto pr-1'>
            <input type='text' className={inputClass} value={userAnswer} placeholder='' onChange={setQuestionrange} />
            {demoError && demoError.errorType === 'age_error' && renderError(t('home.age.error'))}
          </div>
        </div>
      );
    default:
      return '';
  }
}

export default Input;
