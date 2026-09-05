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
      debugger;
      if (ZIP_RULES.ZIP_DEMO_IDS.includes(getCurrentQuestion.demographicId) && getCurrentQuestion.queryType === 'text') {
      // if (getCurrentQuestion.queryType === 'text' && getCurrentQuestion.demographicId === '620196Demo1562404395959' && (langCode === 'English-NZ' ? !isValidNZZipCode(String(data.option_text)) : !isValidUSZipCode(String(data.option_text)))) {

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
      const requiresPostalValidation = getCurrentQuestion.queryId === '6620196Demo15624043959596query15624044216941' || getCurrentQuestion._id === '6620196Demo15624043959596query15624044216941' || getCurrentQuestion.queryId === '4654';
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
  return (
    <>
      <div className='question-wrap'>
        <div className='row'>
          <div className='col-12 col-md-10 col-sm-12 col-lg-10 order-2 order-md-1'>
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
          <div className='col-12 col-md-2 col-sm-12 col-lg-2 order-1 order-md-2'>
            <div className='question-index'>
              {apiClientId && apiClientId == 46 ? <span>
                {aiCatQuestionCount}
                /
                {totalAiCatQuestionCount}
              </span> :
               <span>
                {currentQuestionIndex + 1}
                /
                {totalQuestionsData.length}
              </span>
               }
            </div>
          </div>
        </div>
      </div>
      <div className='question-footer py-4 '>
        <div className='row'>
          <div className='col-12'>
            <button type='submit' className='btn btn-primary float-end' onClick={answerSaveHandler}>
              {/* { apiClientId && apiClientId == 46 ? totalAiCatQuestionCount == aiCatQuestionCount ? t('home.question.submit') : t('home.question.next') :
              currentQuestionIndex === totalQuestionsData.length - 1 ? t('home.question.submit') : t('home.question.next')} */}
              {(apiClientId && apiClientId === 46)
                ? totalAiCatQuestionCount === aiCatQuestionCount
                  ? t('home.question.submit')
                  : t('home.question.next')
                : currentQuestionIndex === totalQuestionsData.length - 1
                  ? t('home.question.submit')
                  : t('home.question.next')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
