/* eslint-disable no-nested-ternary */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, {
  lazy, Suspense, useEffect, useMemo, useState,
} from 'react';
import { setBrowserData, redirectToUrl } from 'utils/utils';
import { requestData } from 'utils/helpers';
import * as rdd from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { botDetector, browserFingerprints } from 'sentinel-guard.js';
import Cookies from 'universal-cookie';
import {
  createParticipantUserEntry,
  createParticipantUserEntryOnly,
  createParticipant,
  updateClientAppRedirect,
  participantsDemographics,
  getParticipantInitialData,
  getAIQuestion,
  getRouterV4AIQuestion,
  getRouterV4AINextQuestion,
} from 'slices/ParticipantSlice';
import { getRandomAIQuestion, submitRandomQuestionAnswer } from 'slices/ParticipantAnswerSlice';
import { setScreenerData } from 'utils/screenerData';
import CustomLoader from 'components/Utility/CustomLoader';
import { useTranslation } from 'react-i18next';
import { AlertBox } from 'components/Alert/Validation';
import {
  PASS,
  SPLENDED,
  UNIMARKETV2,
  MARKETMIRROR,
  MARKETXCEL,
  HALLAT,
  // FUN,
  // SUNSHINE,
  PANGEAFORUM,
  KYA,
  // DIVERGENT,
  // GNL,
  // BIG_WAVE,
  // ADVUEMEDIA,
  RASIK,
  TOLUNA,
} from 'config/constants';

const START_SURVEY_BUTTON_CLASS = [
  'inline-flex h-12 min-w-[210px] items-center justify-center gap-2 rounded-xl bg-teal-700 px-6',
  'text-[15px] font-semibold text-white shadow-[0_10px_22px_rgba(15,127,131,0.18)] transition',
  'hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/15',
].join(' ');

const Question = lazy(() => import('./Partials/Question'));
const RandomQuestionPage = lazy(() => import('../RandomQuestionAsked/index'));
const AiQuestion = lazy(() => import('./Partials/AiQuestion'));

const cookies = new Cookies();

const EXCLUDED_VENDOR_IDS = [
  PASS,
  SPLENDED,
  UNIMARKETV2,
  MARKETMIRROR,
  MARKETXCEL,
  HALLAT,
  PANGEAFORUM,
  KYA,
  RASIK,
  TOLUNA,
];

function SurveyModuleFallback() {
  return (
    <div className='flex min-h-[55vh] items-center justify-center'>
      <div className='flex items-center gap-3 text-sm font-medium text-slate-500'>
        <span className='h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700' />
        Preparing survey...
      </div>
    </div>
  );
}
// import { getData } from 'slices/TestSlice';
// comment added for test

function Home({ setHeaderState }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const request = useMemo(() => requestData(window), []);
  const browserData = useMemo(() => setBrowserData(rdd, request), [request]);
  const [browserInfo, setBrowserInfo] = useState(browserData);
  const [userLandingUrl, setUserLandingUrl] = useState(request.userLandingUrl);
  const [studyId, setStudyId] = useState(request.studyId);
  const [finalArray, setFinalArray] = useState(request.finalArray);
  const [botDetectionResult, setBotDetectionResult] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [randomQuestion, setRandomQuestion] = useState(false);
  // const [isTestParticipant, setIsTestParticipant] = useState(request.isTestParticipant);
  // const [isAutoCreatedSurvey, setIsAutoCreatedSurvey] = useState(request.isAutoCreatedSurvey);
  const [cid, setcid] = useState(request.cid);
  const [PID, setPID] = useState();
  const [vendorId, setVendorId] = useState(request.vendorId);
  const [totalQuestionsData, setTotalQuestionsData] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isClientAppCalled, setIsClientAppCalled] = useState(false);
  const [originParticipant, setOriginParticipant] = useState();
  const [userId, setUserId] = useState(request.userId);
  const [userAnswer, saveUserAnswer] = useState('');
  const [userMultiSelectAnswer, setUserMultiselectAnswer] = useState([]);
  const [isAskQuestion, setAskQuestion] = useState(0);
  const [isRouterClient, setRouterClient] = useState(0);
  const [isValidUrl, setValidUrl] = useState(0);
  const [content, setContent] = useState('');
  const [isLoading, setLoding] = useState(false);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [replyID, setReplyID] = useState(null);
  const [showRandomQuestions, setShowRandomQuestions] = useState(false);
  const [isRandomQuestionCalled, setIsRandomQuestionCalled] = useState(false);
  const [aiQuestion, setAiQuestion] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [apiClientId, setApiClientId] = useState(null);
  const [isCatQuestionAsked, setIsCatQuestionAsked] = useState(true);
  const [isAskNextAiCatQuestion, setIsAskNextAiCatQuestion] = useState(false);

  const [aiCatQuestionCount, setAiCatQuestionCount] = useState(1);
  const [totalAiCatQuestionCount, setTotalAiCatQuestionCount] = useState(8);
  const [isAiQuestionAksedFirstTime, setIsAiQuestionAksedFirstTime] = useState(false);
  const [isAiQuestionAksedSecondTime, setIsAiQuestionAksedSecondTime] = useState(false);
  const [routerV4AINextFirstTime, setRouterV4AINextFirstTime] = useState(false);
  const [totalAiCatQuestionAskedCount, setTotalAiCatQuestionAskedCount] = useState(0);
  const [totalAiCatQuestionWeAskedCount, setTotalAiCatQuestionWeAskedCount] = useState(0);
  const [isCategoryQuestion, setIsCategoryQuestion] = useState(false);

  // const [participantApiData, setParticipantApiData] = useState(false);
  const getParticipantData = useSelector((particpantState) => particpantState.ParticipantSlice.getParticipantData);
  const createParticipantResult = useSelector((particpantState) => particpantState.ParticipantSlice.createParticipantResponse);
  const createParticipantResultLoading = useSelector((particpantState) => particpantState.ParticipantSlice.loading);
  const participantFailedInScreenersResult = useSelector((participantAnswerState) => participantAnswerState.ParticipantAnswerSlice.participantFailedInScreenersResponse);
  const participantFailedInScreenersResultLoading = useSelector((participantAnswerState) => participantAnswerState.ParticipantAnswerSlice.loading);

  const RandomQuestionAskedResponse = useSelector((randomQuestionState) => randomQuestionState.ParticipantAnswerSlice.RandomQuestionResponse);
  const participantAnswerLoading = useSelector((participantAnswerState) => participantAnswerState.ParticipantAnswerSlice.loading);
  const getAIQuestionResponse = useSelector((participantAnswerState) => participantAnswerState.ParticipantAnswerSlice.submitRandomQuestionAnswerResponse);
  const requiredResponses = useSelector((particpantState) => particpantState.ParticipantSlice.requiredResponses);

  const categoryRouterV4AIQuestion = useSelector((particpantState) => particpantState.ParticipantSlice.getRouterV4AIQuestion);
  const routerV4AINextQuestion = useSelector((particpantState) => particpantState.ParticipantSlice.getRouterV4AINextQuestion);
  const participantsDemographicsData = useSelector((particpantState) => particpantState.ParticipantSlice.participantsDemographics);
  const currentURL = window.location.href;

  useEffect(() => {
    let idleId;
    let timerId;
    let cancelled = false;

    const detectBot = async () => {
      try {
        const result = await botDetector();
        if (!cancelled) setBotDetectionResult(result);
      } catch (error) {
        // Non-critical: participant flow continues if bot detection is unavailable.
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(detectBot, { timeout: 300 });
    } else {
      timerId = window.setTimeout(detectBot, 0);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  const updateClientAppRedirectHandler = (clientDataToUpdate) => {
    try {
      setLoding(true);
      setTimeout(() => {
        try {
          window.location.href = clientDataToUpdate.redirectUrl;
        } catch (e) {
          if (isClientAppCalled === false) {
            clientDataToUpdate.codeComing = 3;
            dispatch(updateClientAppRedirect(clientDataToUpdate));
            setIsClientAppCalled(true);
          }
        }
      }, 1000);
      if (isClientAppCalled === false) {
        clientDataToUpdate.codeComing = 1;
        dispatch(updateClientAppRedirect(clientDataToUpdate));
        setIsClientAppCalled(true);
      }
    } catch (e) {
      if (isClientAppCalled === false) {
        clientDataToUpdate.codeComing = 2;
        dispatch(updateClientAppRedirect(clientDataToUpdate));
        setIsClientAppCalled(true);
      }
    }
  };

  // Initial participant bootstrap. The three existing API calls intentionally
  // remain parallel; only the duplicate fingerprint calculation is removed.
  useEffect(() => {
    let cancelled = false;

    const initializeParticipant = async () => {
      if (vendorId && browserInfo && userLandingUrl) {
        let cookieUserIds = uniqueId;
        if (!cookieUserIds) {
          cookieUserIds = await browserFingerprints();
          if (cancelled) return;
          setUniqueId(cookieUserIds);
        }

        const particiapntInitialDataParams = {
          vid: vendorId,
          hash: '',
          userLandingUrl,
          cookieUserid: cookieUserIds || cookies.get('userId'),
          userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
        };

        dispatch(getParticipantInitialData(particiapntInitialDataParams));
        dispatch(createParticipantUserEntry({ vendorId, browserInfo, userLandingUrl }));
        dispatch(createParticipantUserEntryOnly({ vendorId, browserInfo, userLandingUrl }));
      }
    };

    initializeParticipant();

    return () => {
      cancelled = true;
    };
  }, [vendorId, browserInfo, userLandingUrl]);

  const addParticipant = async (isRouterSubmitted = false) => {
    if (!EXCLUDED_VENDOR_IDS.includes(vendorId) && !isRandomQuestionCalled) {
      setIsRandomQuestionCalled(true);
      dispatch(
        getRandomAIQuestion({
          study_id: studyId,
          TID: vendorId,
          userUrl: userLandingUrl,
          userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
        }),
      );
    } else if (isAskQuestion && !isRouterSubmitted) {
      // router client have some question then call below api
      dispatch(participantsDemographics({ userData: finalArray, userLandingUrl }));
    } else {
      const result = await dispatch(getAIQuestion(studyId));
      // if the Ai Question is present then set Ai data otherwise call the Screener Api
      if (result.payload.success && result.payload.data.length > 0) {
        setAiQuestion(result.payload.data);
      } else {
        dispatch(
          createParticipant({
            userData: finalArray,
            userLandingUrl,
            PID: PID || '',
            botDetectionResult,
          }),
        );
      }
      // setTimeout(() => {
      // if router client haven't any question and pulling client, manually projects type's client then call below api
      // dispatch(
      //   createParticipant({
      //     userData: finalArray,
      //     userLandingUrl,
      //     PID: PID || '',
      //     botDetectionResult,
      //   }),
      // );
      // }, 500);
    }
  };
  const openModal = (key) => {
    setModalContent(key);
  };
  const closeModel = () => {
    setModalContent(null);
  };

  // if Ai Question is Present then the createParticipant Api call on the last AI Question Submit Button
  const getScreener = async () => {
    await dispatch(
      createParticipant({
        userData: finalArray,
        userLandingUrl,
        PID: PID || '',
        botDetectionResult,
      }),
    );
    setAiQuestion([]);
  };

  // get initial participant api data..
  useEffect(() => {
    if (vendorId && browserInfo && userLandingUrl && getParticipantData && getParticipantData.success) {
      if (Object.prototype.hasOwnProperty.call(getParticipantData, 'isRedirect') && getParticipantData.isRedirect) {
        redirectToUrl(getParticipantData.redirectUrl);
      } else {
        if (getParticipantData.isRouterClient && getParticipantData.isAskQuestion) {
          setAskQuestion(1);
          setRouterClient(1);
          setApiClientId(getParticipantData.apiClientId);
        }
        cookies.set('userId', getParticipantData.userId, { path: '/' });
        setValidUrl(1);
        // setParticipantApiData(true);
      }
    }
  }, [vendorId, browserInfo, userLandingUrl, getParticipantData]);
  // useEffect(() => {
  //   if (participantApiData) {
  //     setTimeout(() => {
  //       addParticipant();
  //     }, 500);
  //   }
  // }, [participantApiData]);

  const addParticipantAiQuestion = () => {
    const data = {};
    data.studyId = studyId;
    data.uniqueId = uniqueId;
    data.vid = vendorId;
    data.userSpId = localStorage.getItem('spfjkshdfjbnvcbj');
    dispatch(getRouterV4AIQuestion(data));
  };

  useEffect(() => {
    if (getAIQuestionResponse && getAIQuestionResponse !== '') {
      // eslint-disable-next-line no-prototype-builtins
      if (getAIQuestionResponse.success && getAIQuestionResponse.hasOwnProperty('isRedirect') && getAIQuestionResponse.redirectUrl) {
        redirectToUrl(getAIQuestionResponse.redirectUrl);
      } else {
        addParticipant();
        setShowRandomQuestions(false);
      }
    }
  }, [getAIQuestionResponse]);

  useEffect(() => {
    if (RandomQuestionAskedResponse && RandomQuestionAskedResponse !== '') {
      if (RandomQuestionAskedResponse.success) {
        setIsRandomQuestionCalled(true);
        setShowRandomQuestions(RandomQuestionAskedResponse);
        setRandomQuestion(RandomQuestionAskedResponse?.result);
      } else {
        addParticipant();
      }
    }
  }, [RandomQuestionAskedResponse]);

  useEffect(() => {
    if (isValidUrl) {
      // Landing state: keep the welcome header visible until the user starts the survey.
      setHeaderState(false);
      setContent(
        <div className='flex flex-col items-center gap-3 px-5 pb-5 text-center'>
          <button
            type='submit'
            className={START_SURVEY_BUTTON_CLASS}
            onClick={() => {
              setSurveyStarted(true);
              setHeaderState(true);
              addParticipant();
            }}
          >
            {t('home.continue')}
            <span className='text-base'>→</span>
          </button>
          <div className='mt-1 flex flex-wrap justify-center gap-4'>
            <button className='border-0 bg-transparent p-0 text-[11px] text-slate-500 hover:text-teal-700 hover:underline' type='button' onClick={() => openModal('home.privacyPolicy')}>
              {t('home.privacyPolicy')}
            </button>
            <button className='border-0 bg-transparent p-0 text-[11px] text-slate-500 hover:text-teal-700 hover:underline' type='button' onClick={() => openModal('home.termsAndConditions')}>
              {t('home.termsAndConditions')}
            </button>
            <button className='border-0 bg-transparent p-0 text-[11px] text-slate-500 hover:text-teal-700 hover:underline' type='button' onClick={() => openModal('home.cookiesPolicy')}>
              {t('home.cookiesPolicy')}
            </button>
          </div>
        </div>,
      );
    }
  }, [isValidUrl]);

  // get particiapnt result
  useEffect(() => {
    if (createParticipantResult && createParticipantResult !== '') {
      if (createParticipantResult.success) {
        setHeaderState(true);
        if (createParticipantResult.isRedirect && Object.prototype.hasOwnProperty.call(createParticipantResult, 'isFirstPartyRedirect')) {
          const data = {
            studyId: createParticipantResult.SID,
            pid: createParticipantResult.PID,
            redirectUrl: createParticipantResult.redirectUrl,
          };
          setPID(createParticipantResult.PID.toString());
          setStudyId(createParticipantResult.SID);
          updateClientAppRedirectHandler(data);
        } else if (createParticipantResult.isRedirect) {
          redirectToUrl(createParticipantResult.redirectUrl);
        } else if (!createParticipantResult.isRedirect) {
          // set screener data
          if (Object.prototype.hasOwnProperty.call(createParticipantResult, 'isScreener')) {
            if (createParticipantResult.demographicData.length === 0 && createParticipantResult.screenerRangeData.length === 0 && isAskQuestion) {
              setPID(createParticipantResult.PID);

              if (apiClientId && apiClientId === 46 && isAiQuestionAksedFirstTime === false) {
                addParticipantAiQuestion();
                setTotalAiCatQuestionCount(5);
                setAiCatQuestionCount(1);
                setIsAiQuestionAksedFirstTime(true);
              } else {
                dispatch(createParticipant({ userData: finalArray, userLandingUrl, PID: createParticipantResult.PID || '' }));
              }
            } else {
              if (Object.prototype.hasOwnProperty.call(createParticipantResult, 'replyID')) {
                setReplyID(createParticipantResult.replyID);
              }
              setTotalAiCatQuestionCount(5 + createParticipantResult.demographicData.length);
              setTotalAiCatQuestionAskedCount(createParticipantResult.demographicData.length);
              setScreenerData(createParticipantResult, setTotalQuestionsData, setPID, setOriginParticipant, isRouterClient);
            }
          }
        }
      } else if (!createParticipantResult.success) {
        AlertBox(t('home.alert.title'), t('home.alert.somethingWentWrong'), t);
      }
    }
  }, [createParticipantResult]);

  // when user in screener failed then return to vendor back
  useEffect(() => {
    if (participantFailedInScreenersResult && participantFailedInScreenersResult !== '') {
      if (participantFailedInScreenersResult.success) {
        if (participantFailedInScreenersResult.isRedirect && Object.prototype.hasOwnProperty.call(participantFailedInScreenersResult, 'isFirstPartyRedirect')) {
          const data = {
            studyId: participantFailedInScreenersResult.SID,
            pid: participantFailedInScreenersResult.PID,
            redirectUrl: participantFailedInScreenersResult.redirectUrl,
          };
          updateClientAppRedirectHandler(data);
        } else if (participantFailedInScreenersResult.isRedirect) {
          redirectToUrl(participantFailedInScreenersResult.redirectUrl);
        }
      }
    }
  }, [participantFailedInScreenersResult]);

  const submitRandomQuestion = (data) => {
    data.userId = userId;
    data.userLandingUrl = userLandingUrl;
    data.userSpId = localStorage.getItem('spfjkshdfjbnvcbj');
    dispatch(submitRandomQuestionAnswer(data));
  };

  useEffect(() => {
    if (requiredResponses.length >= 3) {
      if (EXCLUDED_VENDOR_IDS.includes(vendorId)) {
        addParticipant(true);
      }
    }
  }, [requiredResponses]);

  const askNextAiCatQuestion = () => {
    const questionOptions = categoryRouterV4AIQuestion?.data?.options;
    const sessionId = categoryRouterV4AIQuestion?.data?.session_id;

    const filteredOptions = questionOptions.filter((option) => userMultiSelectAnswer.includes(option._id));

    const data = {};

    if (routerV4AINextQuestion && routerV4AINextQuestion.success && routerV4AINextQuestion.data) {
      let optionText = '';
      let optionData = routerV4AINextQuestion?.data?.options ? routerV4AINextQuestion.data.options : [];
      if (routerV4AINextQuestion.data.queryType === 'multiselect') {
        const filteredOptions1 = optionData.filter((option) => userMultiSelectAnswer.includes(option._id));
        optionText = filteredOptions1.map((option) => option.optionText).join(', ');
      } else if (optionData && optionData.length > 0) {
        optionData = optionData.find((d) => d._id === userAnswer);
        optionText = optionData.optionText;
      } else {
        optionText = userAnswer;
      }

      const returnData = routerV4AINextQuestion.data.result;
      data.answer = optionText;
      data.question_number = returnData.question_number;
      data.question_text = returnData.question_text;
      data.question_id = returnData.question_id;
      data.selected_categories = returnData.selected_categories;
    } else {
      data.answer = null;
      data.question_number = 4;
      data.question_text = null;
      data.question_id = null;
      data.selected_categories = filteredOptions;
    }

    data.studyId = studyId;
    data.uniqueId = uniqueId;
    data.session_id = sessionId;
    setIsCatQuestionAsked(false);
    setIsAskNextAiCatQuestion(true);
    setIsCategoryQuestion(false);
    dispatch(getRouterV4AINextQuestion(data));
  };

  useEffect(() => {
    if (categoryRouterV4AIQuestion && categoryRouterV4AIQuestion.success && categoryRouterV4AIQuestion.data) {
      setTotalQuestionsData([categoryRouterV4AIQuestion.data]);
      setCurrentQuestionIndex(0);
      setIsCatQuestionAsked(false);
      setIsAskNextAiCatQuestion(true);
      setIsCategoryQuestion(true);
    } else if (categoryRouterV4AIQuestion && !categoryRouterV4AIQuestion.success && isAiQuestionAksedSecondTime === false) {
      addParticipantAiQuestion();
      setTotalAiCatQuestionCount(5);
      setAiCatQuestionCount(1);
      setIsAiQuestionAksedSecondTime(true);
    } else if (categoryRouterV4AIQuestion && !categoryRouterV4AIQuestion.success && isAiQuestionAksedSecondTime) {
      dispatch(
        createParticipant({
          userData: finalArray,
          userLandingUrl,
          PID: PID || '',
          botDetectionResult,
        }),
      );
    }
  }, [categoryRouterV4AIQuestion]);

  useEffect(() => {
    if (routerV4AINextQuestion && routerV4AINextQuestion.success && routerV4AINextQuestion.data) {
      if (routerV4AINextQuestion.data.is_all_question_asked) {
        const obj = {
          0: 'session_id',
          1: routerV4AINextQuestion.data.session_id,
        };
        finalArray.push(obj);
        dispatch(
          createParticipant({
            userData: finalArray,
            userLandingUrl,
            PID: PID || '',
            botDetectionResult,
          }),
        );
      } else {
        saveUserAnswer('');
        setUserMultiselectAnswer([]);
        setTotalQuestionsData([routerV4AINextQuestion.data]);
        setCurrentQuestionIndex(0);
        setIsAskNextAiCatQuestion(true);
      }
    } else if (routerV4AINextQuestion && !routerV4AINextQuestion.success && routerV4AINextFirstTime === false) {
      askNextAiCatQuestion();
      setRouterV4AINextFirstTime(true);
    } else if (routerV4AINextQuestion && !routerV4AINextQuestion.success && routerV4AINextFirstTime) {
      dispatch(
        createParticipant({
          userData: finalArray,
          userLandingUrl,
          PID: PID || '',
          botDetectionResult,
        }),
      );
    }
  }, [routerV4AINextQuestion]);

  const showActiveLoader = isLoading || (surveyStarted && (createParticipantResultLoading || participantFailedInScreenersResultLoading || participantAnswerLoading));

  return (
    <CustomLoader show={showActiveLoader}>
      <Suspense fallback={<SurveyModuleFallback />}>
        {showRandomQuestions ? (
          <RandomQuestionPage
            questionData={randomQuestion}
            studyId={studyId}
            vendorId={vendorId}
            submitRandomQuestion={submitRandomQuestion}
          />
        ) : (
          <div className='mx-auto w-full max-w-4xl pb-5'>
            {aiQuestion.length > 0 ? (
              <AiQuestion
                userId={userId}
                userLandingUrl={userLandingUrl}
                studyId={studyId}
                vendorId={vendorId}
                aiQuestion={aiQuestion}
                moveToScreener={getScreener}
                PID={PID}
              />
            ) : totalQuestionsData && totalQuestionsData.length > 0 ? (
              <Question
                totalQuestionsData={totalQuestionsData}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                saveUserAnswer={saveUserAnswer}
                userAnswer={userAnswer}
                studyId={studyId}
                vendorId={vendorId}
                userId={userId}
                PID={PID}
                finalArray={finalArray}
                isRouterClient={isRouterClient}
                addParticipant={addParticipant}
                setUserMultiselectAnswer={setUserMultiselectAnswer}
                userMultiSelectAnswer={userMultiSelectAnswer}
                apiClientId={apiClientId}
                addParticipantAiQuestion={addParticipantAiQuestion}
                isCatQuestionAsked={isCatQuestionAsked}
                isAskNextAiCatQuestion={isAskNextAiCatQuestion}
                askNextAiCatQuestion={askNextAiCatQuestion}
                aiCatQuestionCount={aiCatQuestionCount}
                setAiCatQuestionCount={setAiCatQuestionCount}
                totalAiCatQuestionCount={totalAiCatQuestionCount}
                totalAiCatQuestionAskedCount={totalAiCatQuestionAskedCount}
                totalAiCatQuestionWeAskedCount={totalAiCatQuestionWeAskedCount}
                setTotalAiCatQuestionWeAskedCount={setTotalAiCatQuestionWeAskedCount}
                isCategoryQuestion={isCategoryQuestion}
                replyID={replyID}
              />
            ) : (
              content
            )}
          </div>
        )}
      </Suspense>
    </CustomLoader>
  );
}

export default Home;
