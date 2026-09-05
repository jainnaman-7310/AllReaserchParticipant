import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function Questionsec1({
  question,
  type,
  options = [],
  activities = [],
  progress,
  onNext,
  isExclusive,
  questionId,
  dataType,
}) {
  const [_options, setOptions] = useState([]);
  const [textAnswer, setTextAnswer] = useState('');
  const [noneSelected, setNoneSelected] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const op = options.map((item) => {
      item.selected = false;
      item.level = '';
      return item;
    });
    setOptions(op);
  }, [options]);

  const validateAnswer = (inputType) => {
    if (inputType === 'input' && dataType === 'NUMBER') {
      let isValidValue = textAnswer !== '' && Number(textAnswer) >= 0;

      // Custom validations based on question ID
      switch (questionId) {
        case 4: // % of name-brand products
        case 13: // Added same validation as question 4
          isValidValue = textAnswer !== '' && Number(textAnswer) >= 0 && Number(textAnswer) <= 100;
          break;

        case 5: // Internet usage hours
        case 11: // Added same validation as question 4
          isValidValue = textAnswer !== '' && Number(textAnswer) >= 0 && Number(textAnswer) <= 168;
          break;

        case 20: // Gaming hours
        case 21: // Added same validation as question 4
          isValidValue = textAnswer !== '' && Number(textAnswer) >= 0 && Number(textAnswer) <= 168;
          break;

        default:
          // default check (for other numeric questions)
          isValidValue = textAnswer !== '' && Number(textAnswer) > 0;
          break;
      }
      setIsValid(isValidValue);
    } else if (inputType === 'input' && dataType === 'TEXT') {
      setIsValid(textAnswer !== '');
    } else if (inputType === 'checkbox-radio') {
      const isSelected = _options.find((item) => item.selected);
      if (isExclusive && isSelected && isSelected.answer === 'None of these') {
        setIsValid(textAnswer !== '');
      } else {
        setIsValid(isSelected !== undefined);
      }
    } else if (inputType === 'frequency-radio') {
      const isSelected = _options.filter((item) => item.selected);
      if (isSelected.length === _options.length) {
        setIsValid(true);
      }
    }
  };

  useEffect(() => {
    validateAnswer('input');
  }, [textAnswer]);

  const handleOptionSelect = (option) => {
    if (type === 'RADIO-0') {
      setOptions(_options.map((item) => {
        if (item.id === option.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      }));
      if (isExclusive && option.answer === 'None of these') {
        setNoneSelected(true);
      } else {
        setNoneSelected(false);
      }
    } else if (type === 'CHECKBOX-0') {
      setOptions(_options.map((item) => {
        if (item.selected && item.id === option.id) {
          item.selected = false;
        } else if (item.id === option.id) {
          item.selected = true;
        }
        return item;
      }));
      if (option.answer === 'None of these' && isExclusive) {
        setOptions(_options.map((item) => {
          if (item.id === option.id) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        }));
        setNoneSelected(true);
      } else if (option.answer === 'None of these') {
        setOptions(_options.map((item) => {
          if (item.id === option.id) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        }));
        setNoneSelected(true);
      } else {
        setOptions(_options.map((item) => {
          if (item.answer === 'None of these' && item.selected) {
            item.selected = false;
          }
          return item;
        }));
        setNoneSelected(false);
      }
    }
    validateAnswer('checkbox-radio');
  };

  const handleFrequencyRadio = (activity, option) => {
    const op = _options.map((item) => {
      if (item.id === option.id) {
        item.selected = true;
        item.level = activity;
      }
      return item;
    });
    setOptions(op);
    validateAnswer('frequency-radio');
  };

  const handleTextChange = (event) => {
    const value = event.target.value.trim();
    setTextAnswer(value);
    setErrorMessage(false);

    if (dataType === 'NUMBER') {
      let valid = true;
      let message = '';

      // Empty value
      if (value === '') {
        valid = false;
        message = 'This field is required.';
      } else {
        const num = Number(value);

        // If not a number
        if (Number.isNaN(num)) {
          valid = false;
          message = 'Please enter a valid number.';
        } else {
          // Custom validation per question
          switch (questionId) {
            case 4: // % of name-brand products
            case 13: // Added same validation as question 4
              if (num < 0 || num > 100) {
                valid = false;
                message = 'Please enter a percentage between 0 and 100.';
              }
              break;

            case 5: // Internet usage hours
            case 11: // Added same validation as question 4
              if (num < 0 || num > 168) {
                valid = false;
                message = 'Please enter hours between 0 and 168.';
              }
              break;

            case 20: // Gaming hours
            case 21: // Added same validation as question 4
              if (num < 0 || num > 168) {
                valid = false;
                message = 'Please enter hours between 0 and 168.';
              }
              break;

            default:
              if (num <= 0) {
                valid = false;
                message = 'Please enter a value greater than 0.';
              }
              break;
          }
        }
      }

      setIsValid(valid);
      setErrorMessage(message);
    }
  };

  const renderOptions = () => {
    switch (type) {
      case 'RADIO-0':
        return (
          <div>
            {_options.map((option, index) => (
              <label key={index} className='flex items-center bg-[#F0F5F7] p-2 rounded-xl mt-11'>
                <input
                  type='radio'
                  name='option'
                  className='form-radio md:h-5 md:w-5'
                  checked={option.selected}
                  onChange={() => handleOptionSelect(option)}
                  id={`flexRadioDefault${index}`}
                />
                <span className='ml-2 text-gray-700'>
                  {option.answer}
                </span>
              </label>
            ))}
          </div>
        );
      case 'CHECKBOX-0':
        return _options.map((option, index) => (
          <label key={index} className='flex items-center bg-[#F0F5F7] p-2 rounded-xl h-[50px] mt-11'>
            <input
              type='checkbox'
              className='form-checkbox h-5 w-5'
              checked={option.selected}
              onChange={() => handleOptionSelect(option)}
            />
            <span className='ml-2 text-gray-700'>{option.answer}</span>
          </label>
        ));
      case 'INPUT-0':
        return (
          <div className='flex flex-col space-y-4 font-poppins mt-11'>
            <input
              type={dataType && dataType === 'NUMBER' ? 'number' : 'text'}
              className='w-full px-2 py-3 border border-gray-300 rounded-xl'
              value={textAnswer}
              onChange={handleTextChange}
              min={0}
              max={100}
            />
            {errorMessage && (
              <div className='w-full flex justify-center md:justify-start'>
                <span className='text-red-500'>{errorMessage}</span>
              </div>
            )}
          </div>
        );
      case 'SINGLEGRID-5':
        return (
          <div className='relative w-[800px] md:w-full'>
            <div className='relative top-0 z-10 rounded-xl '>
              <div
                className='grid gap-2 text-gray-700 p-2 min-h-[70px]'
                style={{ gridTemplateColumns: `repeat(${activities.length + 1}, minmax(0, 1fr))` }}
              >
                <div className='font-semibold text-left'>{' '}</div>

                {activities.map((option, index) => (
                  <div
                    key={index}
                    className='text-center md:text-sm font-semibold'
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-4 max-h-[calc(100vh-70px)] overflow-y-auto'>
              {_options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className='grid gap-2 bg-[#F0F5F7] p-2 rounded-xl min-h-[70px] items-center'
                  style={{ gridTemplateColumns: `repeat(${activities.length + 1}, minmax(0, 1fr))` }}
                >
                  <span className='text-gray-700 font-semibold'>
                    {option.answer}
                  </span>

                  {activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className='flex justify-center items-center'
                    >
                      <input
                        type='radio'
                        name={`${activityIndex}-${optionIndex}`}
                        className='form-radio h-5 w-5'
                        checked={option.selected && option.level === activity}
                        onChange={() => handleFrequencyRadio(activity, option)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      case 'SINGLEGRID-4':
        return (
          <div className='relative w-[800px] md:w-full'>
            <div className='relative top-0 z-10 rounded-xl'>
              <div className='flex justify-end text-gray-700 p-2 min-h-[70px] max-h-auto'>
                {activities.map((option, index) => (
                  <div
                    key={index}
                    className='w-[120px] md:w-[90px] xl:w-[120px] text-center md:text-sm font-semibold'
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className='space-y-4 max-h-[calc(100vh-70px)] overflow-y-auto mt-3'>
              {_options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className='flex items-center bg-[#F0F5F7] p-2 rounded-xl min-h-[70px]'
                >
                  <span className='w-1/3 text-gray-700 font-semibold'>
                    {option.answer}
                  </span>
                  {activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className='w-[120px] md:w-[90px] xl:w-[120px] text-center'
                    >
                      <input
                        type='radio'
                        name={`${activityIndex}-${optionIndex}`}
                        className='form-radio h-5 w-5'
                        checked={option.selected && option.level === activity}
                        onChange={() => handleFrequencyRadio(activity, option)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      case 'SINGLEGRID-3':
        return (
          <div className='relative w-[800px] md:w-full'>
            <div className='sticky top-0 z-10 bg-slate-200'>
              <div className='flex justify-end text-gray-700 min-h-[70px] max-h-auto pr-6 lg:pr-4 xl:pr-0 2xl:pr-8'>
                <div className='flex space-x-[84px] md:space-x-[77px] lg:space-x-10 xl:space-x-12 2xl:space-x-20'>
                  {activities.map((option, index) => (
                    <div key={index} className='text-center'>
                      <div className='break-words w-[100px] md:w-[80px] xl:w-[100px] text-center md:text-sm'>{option}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              {_options.map((option, optionIndex) => (
                <div key={optionIndex} className='flex items-center space-x-20 lg:space-x-16 xl:space-x-24 bg-[#F0F5F7] p-2 rounded-xl min-h-[70px] max-h-auto'>
                  <span className='w-1/3 text-gray-700 font-semibold'>{option.answer}</span>
                  {activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className='flex-1'>
                      <input
                        type='radio'
                        name={`${activityIndex}-${optionIndex}`}
                        className='form-radio h-5 w-7'
                        checked={option.selected && option.level === activity}
                        onChange={() => handleFrequencyRadio(activity, option)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col justify-center items-center rounded-r-3xl'>
      <div className='w-full px-4 lg:py-2 pt-6 pb-3'>
        <ProgressBar progress={progress} />
        <div className='text-lg font-semibold text-gray-800 font-poppins lg:pl-0 pl-2 mb-2'>
          {question}
        </div>
        <div className='flex flex-col space-y-4 font-poppins overflow-y-auto lg:overflow-y-visible'>
          {renderOptions()}
          {(noneSelected && isExclusive) && (
            <div className='mt-4'>
              <input
                type='text'
                placeholder='Please specify'
                className='w-full px-2 py-3 border border-gray-300 rounded-xl'
                onChange={handleTextChange}
                value={textAnswer}
                required
              />
            </div>
          )}
        </div>
        <div className='relative'>
          <div className='flex lg:justify-end md:justify-end justify-center lg:absolute lg:right-0'>
            <button
              type='button'
              className={`mt-4 bg-[#0974A3] text-white rounded-full px-6 py-2.5 mb-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                const ansIds = [];
                const levels = [];
                _options.map((item) => {
                  if (item.selected) {
                    ansIds.push(item.id);
                    if (item.level.length > 0) {
                      levels.push(item.level);
                    }
                  }
                  return item;
                });
                onNext({
                  question_id: questionId,
                  answer: type === 'INPUT-0' ? textAnswer : ansIds.toString(),
                  levels: levels.toString(),
                });
                setOptions([]);
                setTextAnswer('');
                setNoneSelected(false);
                setIsValid(false);
              }}
              disabled={!isValid}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionsec1;
