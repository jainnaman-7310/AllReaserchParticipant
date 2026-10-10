/* eslint-disable no-debugger */
/* eslint-disable */
import { AlertBox } from 'components/Alert/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getDataForApi, bindAnswer, bindAnswerText, checkAnswerCorrect,
} from 'utils/screenerData';
import {
  saveParticipantReply, participantFailedInScreeners, checkScreenerForQuota,
} from 'slices/ParticipantAnswerSlice';
import { setDemoAlert } from 'slices/ParticipantSlice';
import Input from './Input';
import * as ZIP_RULES from '../zip_config/index';
import { getValidatePostalCodeApi } from 'services/participantService';
import { useState } from 'react';

const QUESTION_ACTION_BUTTON_CLASS = [
  'inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5',
  'text-sm font-semibold text-white shadow-[0_9px_20px_rgba(15,127,131,0.15)] transition',
  'hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/15 sm:w-auto sm:min-w-[132px]',
].join(' ');

function Question({
  totalQuestionsData,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  saveUserAnswer,
  userAnswer,
  studyId,
  vendorId,
  userId,
  PID,
  finalArray,
  isRouterClient,
  addParticipant,
  setUserMultiselectAnswer,
  userMultiSelectAnswer,
  apiClientId,
  addParticipantAiQuestion,
  isCatQuestionAsked,
  askNextAiCatQuestion,
  isAskNextAiCatQuestion,
  aiCatQuestionCount, 
  setAiCatQuestionCount,
  totalAiCatQuestionCount,
  totalAiCatQuestionAskedCount,
  totalAiCatQuestionWeAskedCount, 
  setTotalAiCatQuestionWeAskedCount,
  isCategoryQuestion,
  replyID
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [postalWarning, setPostalWarning] = useState({
  value: "",
  type: "",
  acknowledged: false,
});
  const setDemo = useSelector((particpantState) => particpantState.ParticipantSlice.setDemoAlert);

  // console.log(totalQuestionsData);
  //   console.log(currentQuestionIndex);
  const getCurrentQuestion = totalQuestionsData[currentQuestionIndex];
  // console.log(getCurrentQuestion);
  function isValidCanadianPostalCode(postalCode) {
    const postalRegex = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;
    return postalRegex.test(postalCode);
  }
  function isValidUSZipCode(zip) {
    return typeof zip === 'string' && /^\d{5}(-\d{4})?$/.test(zip);
  }
  // New Zealand postal codes are typically 4 digits long
  function isValidNZZipCode(zip) {
  return typeof zip === 'string' && /^\d{4}$/.test(zip);
  }

  const getCountryCode = (langCode = '') => {
    const parts = langCode.split('-');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : null;
  };

  function isFsaValid(fsa) { 
    let fsaRegex = /^[A-Za-z]\d[A-Za-z]$/;
    return fsaRegex.test(fsa);
  }
  const answerSaveHandler = async () => {
    let answerValidateString = userAnswer && userAnswer !== '' && userAnswer !== 'undefined';
    if (getCurrentQuestion.queryType === 'multiselect') {
      if (isCategoryQuestion && userMultiSelectAnswer.length < 3) {
        answerValidateString = ''
      } else{
        answerValidateString = userMultiSelectAnswer && userMultiSelectAnswer !== 'undefined' && userMultiSelectAnswer.length > 0;
      }
    }
    if (answerValidateString) {
      const validatePostalWarning = async ({
        value,
        countryCode,
        isFSA = false,
        errorMessage,
        errorType,
      }) => {
        const currentValue = value.trim();

        if (
          postalWarning.acknowledged &&
          postalWarning.value === currentValue &&
          postalWarning.type === errorType
        ) {
          return true;
        }
        if (currentValue === "") {
          dispatch(
            setDemoAlert({
              message: errorMessage,
              errorType,
            })
          );
          return false;
        }

        const result = await getValidatePostalCodeApi({
          countryCode,
          postalCode: currentValue,
          isFSA,
        });

        if (!result.data.valid) {
          dispatch(
            setDemoAlert({
              message: errorMessage,
              errorType,
            })
          );

          setPostalWarning({
            value: currentValue,
            type: errorType,
            acknowledged: true,
          });

          return false;
        }

        setPostalWarning({
          value: "",
          type: "",
          acknowledged: false,
        });

        return true;
      };
      const data = getDataForApi(totalQuestionsData, currentQuestionIndex, studyId, vendorId, userId, PID, finalArray, replyID);
      data.selectedData = bindAnswer(getCurrentQuestion.queryType, userAnswer, getCurrentQuestion, userMultiSelectAnswer);
      data.option_text = bindAnswerText(getCurrentQuestion.queryType, userAnswer, getCurrentQuestion, userMultiSelectAnswer);
      let correctAnswers = 1;
      const langCode = data?.lang_code; // getting project language code to validate zip code 
      const countryCode = getCountryCode(langCode);
      if (ZIP_RULES.ZIP_DEMO_IDS.includes(getCurrentQuestion.demographicId) && getCurrentQuestion.queryType === 'text') {

        if (ZIP_RULES.DB_POSTAL_COUNTRIES.includes(countryCode)) {
          const isValid = await validatePostalWarning({
            value: data.option_text,
            countryCode,
            errorMessage:
              ZIP_RULES.POSTAL_CODE_RULES[countryCode]?.errorKey || "app.zip_error",
            errorType: "zip_error",
          });

          if (!isValid) {
            return ;
          }
        }
        // dispatch(setDemoAlert(langCode === 'English-NZ' ? { message: '4_digit_home.zip.error', errorType: 'zip_error' } : { message: 'home.zip.error', errorType: 'zip_error' }));
        // return;
      }
      // eslint-disable-next-line max-len
      const requiresPostalValidation = (
        getCurrentQuestion.queryId === '6620196Demo15624043959596query15624044216941'
        || getCurrentQuestion._id === '6620196Demo15624043959596query15624044216941'
        || getCurrentQuestion.queryId === '4654'
      );
      if (getCurrentQuestion.queryType === 'text' && requiresPostalValidation && (String(getCurrentQuestion.qid) === '1095' || String(getCurrentQuestion.qid) === '4654')) {
        const isValid = await validatePostalWarning({
          value: data.option_text,
          countryCode,
          errorMessage: "home.postal.error",
          errorType: "postal_error",
        });

        if (!isValid) {
          return;
        }
      }
      if (getCurrentQuestion.queryType === 'range' && getCurrentQuestion.demographicId === '1520196Demo1563257915329') {
        const age = Number(data.option_text);
        if (Number.isNaN(age) || age < 13 || age > 120) {
          dispatch(setDemoAlert({ message: 'home.age.error', errorType: 'age_error' }));
          return;
        }
      }
      if ((getCurrentQuestion._id === '161620218Demo16317743493538query1631774464557' || getCurrentQuestion.queryId === '181620218Demo16317743493531query1645176293310')) {
        const isValid = await validatePostalWarning({
          value: data.option_text,
          countryCode,
          isFSA: true,
          errorMessage: "home.fsa.error",
          errorType: "fsa_error",
        });

        if (!isValid) {
          return;
        }
      }
      if (isRouterClient === 0) {
        correctAnswers = checkAnswerCorrect(getCurrentQuestion.queryType, userAnswer, getCurrentQuestion, userMultiSelectAnswer, studyId);
      }
      data.is_correct = Number(correctAnswers);
      
      if (correctAnswers) {
        if (apiClientId && apiClientId == 46) {
          if(isCatQuestionAsked && totalAiCatQuestionAskedCount === totalAiCatQuestionWeAskedCount + 1){
            addParticipantAiQuestion(true);
            setAiCatQuestionCount(aiCatQuestionCount + 1);
            dispatch(saveParticipantReply(data));
          } else if (isAskNextAiCatQuestion) {
            dispatch(saveParticipantReply(data));
            askNextAiCatQuestion(true);
            setAiCatQuestionCount(aiCatQuestionCount + 1);
          } else {
            dispatch(saveParticipantReply(data));
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            saveUserAnswer('');
            setUserMultiselectAnswer([]);
            setAiCatQuestionCount(aiCatQuestionCount + 1);
            setTotalAiCatQuestionWeAskedCount(totalAiCatQuestionWeAskedCount + 1);
          }
        } else if (currentQuestionIndex === totalQuestionsData.length - 1) {
          if (isRouterClient === 0) {
            // if this not a router client then call below api
            dispatch(checkScreenerForQuota(data));
          } else {
            // if this is a router client then call below api
            dispatch(saveParticipantReply(data));
            // eslint-disable-next-line no-undef
              addParticipant(true); 
          }
        } else {
          dispatch(saveParticipantReply(data));
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          saveUserAnswer('');
          setUserMultiselectAnswer([]);
        }
      } else {
        dispatch(participantFailedInScreeners(data));
      }
    } else if (getCurrentQuestion.queryType === 'text' || getCurrentQuestion.queryType === 'openended') {
      AlertBox(t('home.alert.title'), t('home.alert.enterAnswer'), t);
    } else {
      if (isCategoryQuestion) {
        AlertBox(t('home.alert.title'), 'Please select at least 3', t);
      } else {
        AlertBox(t('home.alert.title'), t('home.alert.selectAnswer'), t);
      }
    }
  };
  const displayedCurrent = apiClientId && apiClientId == 46 ? aiCatQuestionCount : currentQuestionIndex + 1;
  const displayedTotal = apiClientId && apiClientId == 46 ? totalAiCatQuestionCount : totalQuestionsData.length;
  const progressPercent = displayedTotal > 0 ? Math.min(100, Math.max(0, (displayedCurrent / displayedTotal) * 100)) : 0;

  return (
    <div className='w-full'>
      <div className='mx-auto w-full max-w-[880px]'>
        <div className='mb-3 flex items-center gap-3.5'>
          <div className='relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200' aria-hidden='true'>
            <span className='block h-full rounded-full bg-teal-700 transition-[width] duration-300' style={{ width: `${progressPercent}%` }} />
          </div>
          <span className='min-w-[54px] text-right text-xs font-bold text-slate-600'>
            {displayedCurrent}
            {' / '}
            {displayedTotal}
          </span>
        </div>

        <div className='min-h-[280px] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(16,24,40,0.08)] sm:min-h-[300px]'>
          <div className='px-4 py-6 sm:px-7 sm:py-8 lg:px-10'>
            {getCurrentQuestion && (
              <Input
                type={getCurrentQuestion.queryType}
                questionTitle={getCurrentQuestion.question}
                questionOptions={getCurrentQuestion.options}
                saveUserAnswer={saveUserAnswer}
                userAnswer={userAnswer}
                userMultiSelectAnswer={userMultiSelectAnswer}
                setUserMultiselectAnswer={setUserMultiselectAnswer}
                demoError={setDemo}
                isCatQuestionAsked={isCatQuestionAsked}
                isCategoryQuestion={isCategoryQuestion}
              />
            )}
          </div>
        </div>

        <div className='mt-4 flex justify-end'>
          <button
            type='submit'
            className={QUESTION_ACTION_BUTTON_CLASS}
            onClick={answerSaveHandler}
          >
            {(apiClientId && apiClientId === 46)
              ? totalAiCatQuestionCount === aiCatQuestionCount
                ? t('home.question.submit')
                : t('home.question.next')
              : currentQuestionIndex === totalQuestionsData.length - 1
                ? t('home.question.submit')
                : t('home.question.next')}
            <span className='text-base leading-none'>→</span>
          </button>
        </div>
      </div>
    </div>
  );

}

export default Question;
