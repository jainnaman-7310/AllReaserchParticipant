/* eslint-disable import/no-unresolved */

const DQC_PREFIX = 'dqc_data_';

export const initializeDQC = async (sid) => {
  try {
    const storageKey = `${DQC_PREFIX}${sid}`;
    let isCached =  false;
    // 1. Check session storage first to prevent duplicate DQC calls/inserts for the same user
    const cached = sessionStorage.getItem(storageKey);
    if (cached) {
      isCached = true;
      return { dqc: JSON.parse(cached), isCached };
    }

    // 2. LOAD SDK
    const { DQCToolBox } = await import(
      /* webpackIgnore: true */
      'https://api.dqco-op.com/tools/toolbox/0fced6c68ac9783b62f294270034a0ec71b827b8'
    );
    // 3. CALL DQC
    const dqc = await DQCToolBox.getIdentity({
      surveyId: sid,
    });

    // 4. STORE user session data if not found
    sessionStorage.setItem(storageKey, JSON.stringify(dqc));

    return { dqc, isCached };
  } catch (error) {
    return { dqc: null, isCached: true };
  }
};
