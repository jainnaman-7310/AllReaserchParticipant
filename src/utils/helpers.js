/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
export const requestData = (window) => {
  const queryString = window.location.search;
  const queryOrigion = window.location.origin;
  const queryPathname = window.location.pathname;
  let finalArray = [];
  const idsArray = [];
  const quetionCheckArray = [];
  let isParticipantRouterStudy = 0;
  let originParticipantData = '';
  let isAutoCreatedSurvey = false;
  let isTestParticipant = false;
  let isInitialParticipant = 1;
  let pidForDisqo = '';
  let sidForDisqo = '';
  let testdata = '';
  let origionNotHttp1 = '';
  let sidForDisqoToUpdate = '';
  let pidForDisqoToUpdate = '';
  let hash = '';
  let vendorIdBasedOnVidData = '';
  let isTargetedUser = false;
  let isPollTerminate = false;
  let cid = 0;
  let isGuestUser = false;
  let isCalibar8 = false;

  if (queryString !== '') {
    testdata = queryString.split('?')[1].split('&');
    for (let i = 0; i < testdata.length; i++) {
      const objectArrayOfId = {};
      objectArrayOfId[0] = testdata[i].split('=')[0];
      objectArrayOfId[1] = testdata[i].split('=')[1];
      idsArray.push(objectArrayOfId);

      quetionCheckArray.push(testdata[i].split('=')[0]);

      if (testdata[i].split('=')[0] === 'vid') {
        vendorIdBasedOnVidData = testdata[i].split('=')[1];
      }

      if (testdata[i].split('=')[0] === 'hash') {
        hash = testdata[i].split('=')[1];
      }

      if (testdata[i].split('=')[0] === 'isParticipantRouter') {
        isParticipantRouterStudy = 1;
        isInitialParticipant = 0;
      }
      if (testdata[i].split('=')[0] === 'originParticipant') {
        originParticipantData = testdata[i].split('=')[1];
      }

      if (testdata[i].split('=')[0] === 'isAutoCreatedSurvey') {
        isAutoCreatedSurvey = true;
      }

      if (testdata[i].split('=')[0] === 'isTest') {
        isTestParticipant = true;
      }

      if (testdata[i].split('=')[0] === 'isPollTerminate') {
        isPollTerminate = true;
      }

      if (testdata[i].split('=')[0] === 'cid') {
        cid = testdata[i].split('=')[1];
        if (Number(cid) === 9) {
          isPollTerminate = true;
        }
      }

      if (testdata[i].split('=')[0] === 'isTargetedUser' && testdata[i].split('=')[1] === 'true') {
        isTargetedUser = true;
      }

      if (testdata[i].split('=')[0] === 'isGuestUser' && testdata[i].split('=')[1] === 'true') {
        isGuestUser = true;
      }
      if (testdata[i].split('=')[0] === 'isCalibar8' && testdata[i].split('=')[1] === 'true') {
        isCalibar8 = true;
      }
      if (window.location.search.includes('12201910VENDOR1573540098491') || window.location.search.includes('7202011VENDOR1607322060230')) {
        if (testdata[i].split('=')[0] === 'pid') {
          pidForDisqo = testdata[i].split('=')[1];
        }
        if (testdata[i].split('=')[0] === 'projectId') {
          sidForDisqo = testdata[i].split('=')[1];
        }
      }
    }

    if (isParticipantRouterStudy === 1) {
      const objectArrayOfId = {};
      objectArrayOfId[0] = 'isParticipantRouter';
      objectArrayOfId[1] = '1';
      idsArray.push(objectArrayOfId);
    }
    if (originParticipantData !== '') {
      const objectArrayOfId = {};
      objectArrayOfId[0] = 'originParticipant';
      objectArrayOfId[1] = originParticipantData;
      idsArray.push(objectArrayOfId);
    }

    const origionNotHttp = queryOrigion.replace(/(^\w+:|^)\/\//, '');
    finalArray = idsArray;
    origionNotHttp1 = origionNotHttp + queryPathname + queryString;
    sidForDisqoToUpdate = '';
    pidForDisqoToUpdate = '';
    const array_final = finalArray;
    let isSidFound = false;
    let isTerminate = false;

    for (let y = 0; y < array_final.length; y++) {
      if (array_final[y][0].toUpperCase() === 'SID') {
        isSidFound = true;
      }
      if (array_final[y][0] === 'isTerminate') {
        isTerminate = true;
      }
    }

    if (window.location.search.includes('12201910VENDOR1573540098491') || window.location.search.includes('7202011VENDOR1607322060230')) {
      if (sidForDisqo !== '') {
        sidForDisqoToUpdate = sidForDisqo;
      } else {
        sidForDisqoToUpdate = finalArray[1][1];
      }

      if (pidForDisqo !== '') {
        pidForDisqoToUpdate = pidForDisqo;
      } else {
        pidForDisqoToUpdate = finalArray[2][1];
      }
    } else {
      for (let i = 0; i < finalArray.length; i++) {
        const index = finalArray[i];
        if (index[0] === 'sid' || index[0] === 'SID') {
          sidForDisqoToUpdate = index[1];
        }
        if (index[0] === 'uid' || index[0] === 'UID' || index[0] === 'token') {
          pidForDisqoToUpdate = index[1];
        }
        if (window.location.search.includes('8202510VENDOR1762604350428') || vendorIdBasedOnVidData.includes('2098')) {
          if (index[0] === 'pid') {
            sidForDisqoToUpdate = index[1];
          }
        }
      }
    }
  }

  return {
    userLandingUrl: origionNotHttp1,
    studyId: sidForDisqoToUpdate,
    vendorId: queryString !== '' ? vendorIdBasedOnVidData : '',
    userId: pidForDisqoToUpdate,
    finalArray,
    isTestParticipant,
    isAutoCreatedSurvey,
    isInitialParticipant,
    hash,
    isPollTerminate,
    isTargetedUser,
    cid,
    isGuestUser,
    isCalibar8,
  };
};
