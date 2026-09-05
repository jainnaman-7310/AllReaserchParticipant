import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setDemoAlert } from 'slices/ParticipantSlice';

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
      // Check if we've reached the maximum limit
      // if (userMultiSelectAnswer.length < maxSelections) {
      setUserMultiselectAnswer([val, ...userMultiSelectAnswer]);
      // } else {

      // }
    } else {
      // No limit for other question counts
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
          <div className='question-title'>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            <input type='text' className='form-control' value={userAnswer} placeholder='' onChange={setQuestionText} />
            {demoError && (demoError.errorType === 'postal_error' || demoError.errorType === 'zip_error' || demoError.errorType === 'fsa_error') && (
              <span className='text-danger text-sm mt-1'>
                {getErrorMessage()}
              </span>
            )}
          </div>
        </div>
      );
    case 'openended':
      return (
        <div className='question-box'>
          <div className='question-title'>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            <input type='text' className='form-control' value={userAnswer} placeholder='' onChange={(e) => saveUserAnswer(e.target.value)} />
          </div>
        </div>
      );
    case 'radio':
      return (
        <div className='question-box'>
          <div className='question-title' style={{ textWrap: 'wrap' }}>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            {questionOptions.map((item, key) => (
              <div className='form-check' key={key}>
                <input
                  className='form-check-input'
                  type='radio'
                  name='radio'
                  checked={item._id === userAnswer}
                  value={item._id}
                  id={`flexRadioDefault${key}`}
                  onChange={(e) => saveUserAnswer(e.target.value)}
                />
                <label className='form-check-label' htmlFor={`flexRadioDefault${key}`}>
                  {item.optionText}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <div className='question-box'>
          <div className='question-title'>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            <select className='form-select' value={userAnswer} onChange={(e) => saveUserAnswer(e.target.value)}>
              <option value=''>Select</option>
              {getOptionData(questionOptions)}
            </select>
          </div>
        </div>
      );
    case 'multiselect':
      return (
        <div className='question-box'>
          <div className='question-title'>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            {questionOptions.map((item, key) => (
              <div className='form-check' key={key}>
                <input
                  className='form-check-input'
                  data-attr='check'
                  type='checkbox'
                  checked={userMultiSelectAnswer && Array.isArray(userMultiSelectAnswer) && userMultiSelectAnswer.includes(item._id)}
                  data-check={userMultiSelectAnswer && Array.isArray(userMultiSelectAnswer) && userMultiSelectAnswer.includes(item._id)}
                  value={item._id}
                  id={`flexRadioDefault${key}`}
                  onChange={(e) => saveMultiSelectAnswer(e.target.value)}
                />
                <label className='form-check-label' htmlFor={`flexRadioDefault${key}`}>
                  {item.optionText}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    case 'range':
      return (
        <div className='question-box'>
          <div className='question-title'>
            <h3>{questionTitle}</h3>
          </div>
          <div className='question-content mt-4'>
            <input type='text' className='form-control' value={userAnswer} placeholder='' onChange={setQuestionrange} />
            {demoError && demoError.errorType === 'age_error' && (
              <span className='text-danger text-sm mt-1'>
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
