/* eslint-disable no-debugger, no-param-reassign */
const fsaQid = ['6620196Demo15624043959596query15624044216941', '121220230Demo16735210057420query1673521039815', '4654', '181620218Demo16317743493531query1645176293310'];

export const setScreenerData = (createParticipantResult, setTotalQuestionsData, setPID, setOriginParticipant, isRouterClient) => {
  let myAllScreenerData = [];

  if (createParticipantResult.demographicData && createParticipantResult.demographicData.length > 0) {
    myAllScreenerData = createParticipantResult.demographicData;
  }
  if (createParticipantResult.screenerRangeData && createParticipantResult.screenerRangeData.length > 0) {
    myAllScreenerData = myAllScreenerData.concat(createParticipantResult.screenerRangeData);
  }
  if (isRouterClient === 0) {
    myAllScreenerData = [...myAllScreenerData].sort((a, b) => a.order_no - b.order_no);
  }
  setTotalQuestionsData(myAllScreenerData);
  setOriginParticipant(createParticipantResult.originParticipant);
  setPID(createParticipantResult.PID);
};

export const getDataForApi = (totalQuestionsData, currentQuestion, studyId, vendorId, userId, PID, finalArray, replyID) => {
  const data = {};
  data.sid = studyId;
  data.uid = userId;
  data.tid = vendorId;
  data.queryId = totalQuestionsData[currentQuestion]._id || totalQuestionsData[currentQuestion].id;
  data.query_text = totalQuestionsData[currentQuestion].question;
  data.lang_code = totalQuestionsData[currentQuestion].lang_code;
  data.participantId = PID;
  data.allVariables = finalArray;
  data.replyID = replyID;
  return data;
};

export const bindAnswer = (type, userAnswer, currentQuestion, userMultiSelectAnswer) => {
  switch (type) {
    case 'text':
      return fsaQid.includes(currentQuestion.queryId) ? userAnswer.trim() : userAnswer;
    case 'openended':
      return userAnswer.toString();
    case 'radio':
      return userAnswer.toString();
    case 'dropdown':
      return userAnswer.toString();
    case 'multiselect':
      return userMultiSelectAnswer.toString();
    case 'range':
      return userAnswer.toString();
    default:
      return '';
  }
};

export const bindAnswerText = (type, userAnswer, currentQuestion, userMultiSelectAnswer) => {
  if (type === 'text') {
    return fsaQid.includes(currentQuestion.queryId) ? userAnswer : userAnswer;
  }
  if (type === 'openended') {
    return userAnswer;
  }
  if (type === 'radio') {
    const findCurrentOptionText = currentQuestion.options.find((d) => d._id === userAnswer);
    return findCurrentOptionText.optionText;
  }
  if (type === 'dropdown') {
    const findCurrentOptionText = currentQuestion.options.find((d) => d._id === userAnswer);
    return findCurrentOptionText.optionText;
  }
  if (type === 'multiselect') {
    const findCurrentOptionText = currentQuestion.options.filter((d) => userMultiSelectAnswer.includes(d._id));
    return findCurrentOptionText.length > 0 ? findCurrentOptionText.map((d) => d.optionText).toString() : '';
  }
  if (type === 'range') {
    return userAnswer;
  }
  return '';
};

export const checkAnswerCorrect = (type, userAnswer, currentQuestion, userMultiSelectAnswer, studyId) => {
  if (type === 'text') {
    let correctAnswers = currentQuestion.allText;
    if (correctAnswers === '' && studyId.slice(0, 2) === 'TL' && currentQuestion.lang_code === 'En-US' && currentQuestion.queryId === '6620196Demo15624043959596query1562404421694') {
      correctAnswers = currentQuestion.option_text;
    }
    correctAnswers = correctAnswers.split(',');

    if (currentQuestion && currentQuestion?.zipValidationLimit && currentQuestion?.zipValidationLimit === true) {
      let uvalue = userAnswer;
      if (uvalue && currentQuestion?.isAllDma === false) {
        uvalue = uvalue?.replace(/%20/g, ' ').replace(/\+/g, ' ').trim();
        const UserAnsData = uvalue?.substring(0, 3);
        const fsaCodeId = correctAnswers;
        if (fsaCodeId && fsaCodeId.length) {
          const allFSA = [...new Set(fsaCodeId.map((item) => item.substring(0, 3)))].map((d) => d.toLowerCase());
          if (allFSA.includes(UserAnsData.toLowerCase())) {
            correctAnswers = allFSA;
            userAnswer = UserAnsData.toLowerCase();
          }
        }
      } else if (uvalue && currentQuestion?.isAllDma === true && currentQuestion?.allStudyDma && currentQuestion?.allStudyDma.length) {
        const allStudyDma = currentQuestion?.allStudyDma;
        const allZip = currentQuestion?.allZip;
        const userAns = allZip.find((d) => d.zip.toString() === uvalue.toString());
        const userDma = userAns && userAns?.oid_dma ? userAns?.oid_dma : null;
        if (allStudyDma?.includes(userDma)) {
          correctAnswers = allStudyDma;
          userAnswer = userDma;
        }
      }
    }

    const findCurrentAnswer = correctAnswers.filter((d) => d.replace(/\s/g, '').toLowerCase() === userAnswer.replace(/\s/g, '').toLowerCase());
    return findCurrentAnswer.length > 0;
  }
  if (type === 'openended') {
    return true;
  }
  if (type === 'radio') {
    const correctAnswers = currentQuestion.optionId.split(',');
    const findCurrentAnswer = correctAnswers.filter((d) => d === userAnswer);
    return findCurrentAnswer.length > 0;
  }
  if (type === 'dropdown') {
    const correctAnswers = currentQuestion.optionId.split(',');
    const findCurrentAnswer = correctAnswers.filter((d) => d === userAnswer);
    return findCurrentAnswer.length > 0;
  }
  if (type === 'multiselect') {
    const correctAnswers = currentQuestion.optionId.split(',');
    const findCurrentAnswer = correctAnswers.filter((d) => userMultiSelectAnswer.includes(d));
    return findCurrentAnswer.length > 0;
  }
  if (type === 'range') {
    const correctAnswers = currentQuestion.rangeOptions;
    let isRangePassed = 1;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (Number(correctAnswers[i].ageFrom) <= userAnswer && userAnswer <= Number(correctAnswers[i].ageTo)) {
        isRangePassed = 1;
        break;
      } else {
        isRangePassed = 0;
      }
    }
    return isRangePassed;
  }
  return '';
};
