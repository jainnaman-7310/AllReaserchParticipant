import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDemoAlert } from 'slices/ParticipantSlice';

function QuestionTitle({ questionTitle }) {
  return (
    <div className='question-title'>
      <h3>{questionTitle}</h3>
    </div>
  );
}

function Input({
  type, questionTitle, questionOptions, saveUserAnswer, userAnswer, userMultiSelectAnswer, setUserMultiselectAnswer, demoError,
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
    if (demoError && (demoError.errorType === 'postal_error' || demoError.errorType === 'zip_error' || demoError.errorType === 'fsa_error')) {
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

  switch (type) {
    case 'text':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content'>
            <input type='text' className='form-control survey-text-input' value={userAnswer} placeholder='' onChange={setQuestionText} />
            {demoError && (demoError.errorType === 'postal_error' || demoError.errorType === 'zip_error' || demoError.errorType === 'fsa_error') && (
              <span className='survey-inline-error'>
                <span className='survey-inline-error-icon'>!</span>
                {getErrorMessage()}
              </span>
            )}
          </div>
        </div>
      );
    case 'openended':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content'>
            <input type='text' className='form-control survey-text-input' value={userAnswer} placeholder='' onChange={(e) => saveUserAnswer(e.target.value)} />
          </div>
        </div>
      );
    case 'radio':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content survey-option-list'>
            {questionOptions.map((item, key) => {
              const selected = item._id === userAnswer;
              return (
                <div className={`form-check survey-option ${selected ? 'survey-option-selected' : ''}`} key={key}>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='radio'
                    checked={selected}
                    value={item._id}
                    id={`flexRadioDefault${key}`}
                    onChange={(e) => saveUserAnswer(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor={`flexRadioDefault${key}`}>
                    {item.optionText}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content'>
            <select className='form-select survey-select-input' value={userAnswer} onChange={(e) => saveUserAnswer(e.target.value)}>
              <option value=''>Select</option>
              {getOptionData(questionOptions)}
            </select>
          </div>
        </div>
      );
    case 'multiselect':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content survey-option-list'>
            {questionOptions.map((item, key) => {
              const selected = userMultiSelectAnswer && Array.isArray(userMultiSelectAnswer) && userMultiSelectAnswer.includes(item._id);
              return (
                <div className={`form-check survey-option ${selected ? 'survey-option-selected' : ''}`} key={key}>
                  <input
                    className='form-check-input'
                    data-attr='check'
                    type='checkbox'
                    checked={selected}
                    data-check={selected}
                    value={item._id}
                    id={`flexRadioDefault${key}`}
                    onChange={(e) => saveMultiSelectAnswer(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor={`flexRadioDefault${key}`}>
                    {item.optionText}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    case 'range':
      return (
        <div className='question-box'>
          <QuestionTitle questionTitle={questionTitle} />
          <div className='question-content'>
            <input type='text' className='form-control survey-text-input' value={userAnswer} placeholder='' onChange={setQuestionrange} />
            {demoError && demoError.errorType === 'age_error' && (
              <span className='survey-inline-error'>
                <span className='survey-inline-error-icon'>!</span>
                {t('home.age.error')}
              </span>
            )}
          </div>
        </div>
      );
    default:
      return '';
  }
}

export default Input;
