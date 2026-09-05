/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import detectMobileData from 'components/Utility/mobileDataDetection';
import {
  createParticipantUserEntryApi,
  getParticipantDemoStatusV2Api,
  createParticipantV3Api,
  clientRedirectUpdateApi,
  participantsDemographicsApi,
  getExposeClientParticipantDataApi,
  getAiQuestionApi,
  getAiQuestionReviewApi,
  getRouterV4AIQuestionApi,
  getRouterV4AINextQuestionApi,
} from 'services/participantService';
import { redirectToCalibr8 } from 'utils/calibr8Redirect';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const createParticipantUserEntryOnly = createAsyncThunk('paricipant/createParticipantUserEntry', async ({ vendorId, browserInfo, userLandingUrl }, { rejectWithValue }) => {
  try {
    const res = await createParticipantUserEntryApi(vendorId, browserInfo, userLandingUrl);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const createParticipantUserEntry = createAsyncThunk('paricipant/getParticipantDemoStatusV2', async ({ vendorId, browserInfo, userLandingUrl }, { rejectWithValue }) => {
  try {
    const res = await getParticipantDemoStatusV2Api(vendorId, browserInfo, userLandingUrl);
    // Server-side Calibr8 gate blocked entry: the backend requires the user to
    // complete Calibr8 first and returns its screen URL.
    if (res.data?.calibr8Required && res.data?.redirectUrl) {
      redirectToCalibr8(res.data.redirectUrl);
      return res.data;
    }
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const participantsDemographics = createAsyncThunk('paricipant/participantsDemographics', async ({ userData, userLandingUrl }, { rejectWithValue }) => {
  try {
    const participantData = JSON.stringify(userData);
    const landingUrlString = userLandingUrl;
    const newUserId = cookies.get('userId');
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.replace('-', '_');
    const updatedBrowserLang = detectMobileData(browserLang); // for mobile data detection like Iphone: 360 Browser and Android: QQ Browser
    const res = await participantsDemographicsApi(participantData, landingUrlString, newUserId, updatedBrowserLang);
    // Server-side Calibr8 gate blocked entry into the question flow: redirect to Calibr8.
    if (res.data?.calibr8Required && res.data?.redirectUrl) {
      redirectToCalibr8(res.data.redirectUrl);
      return res.data;
    }
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const createParticipant = createAsyncThunk('paricipant/createParticipant', async ({
  userData, userLandingUrl, PID, botDetectionResult,
}, { rejectWithValue }) => {
  try {
    const participantData = JSON.stringify(userData);
    const landingUrlString = userLandingUrl;
    const newUserId = cookies.get('userId');
    let browserLang = navigator.language || navigator.userLanguage;
    browserLang = browserLang.replace('-', '_');
    const updatedBrowserLang = detectMobileData(browserLang); // for mobile data detection like Iphone: 360 Browser and Android: QQ Browser and UC Browser
    const res = await createParticipantV3Api(participantData, landingUrlString, newUserId, PID, botDetectionResult, updatedBrowserLang);
    // Server-side Calibr8 gate refused survey start: the backend requires the
    // user to complete Calibr8 first and returns the Calibr8 screen URL.
    if (res.data?.calibr8Required && res.data?.redirectUrl) {
      redirectToCalibr8(res.data.redirectUrl);
      return res.data;
    }
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const updateClientAppRedirect = createAsyncThunk('paricipant/clientRedirectUpdate', async (data, { rejectWithValue }) => {
  try {
    const res = await clientRedirectUpdateApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getParticipantInitialData = createAsyncThunk('paricipant/getExposeClientParticipantData', async (data, { rejectWithValue }) => {
  try {
    const res = await getExposeClientParticipantDataApi(data);
    // Server-side Calibr8 gate blocked entry: the backend requires the user to
    // complete Calibr8 first and returns its screen URL.
    if (res.data?.calibr8Required && res.data?.redirectUrl) {
      redirectToCalibr8(res.data.redirectUrl);
      return res.data;
    }
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getAIQuestion = createAsyncThunk(
  'participant/aiQuestion',
  async (studyId, { rejectWithValue }) => {
    try {
      const res = await getAiQuestionApi(studyId);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue({ success: false, data: [], msg: 'something went wrong' });
    }
  },
);

export const getAiQuestionReviewed = createAsyncThunk(
  'participant/submit-randomquestionres',
  async (data, { rejectWithValue }) => {
    try {
      const res = await getAiQuestionReviewApi(data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue({ success: false, msg: 'something went wrong' });
    }
  },
);

export const setDemoAlert = createAsyncThunk(
  'participant/setDemoAlert',
  async (data) => data,
);

export const getRouterV4AIQuestion = createAsyncThunk('api/getRouterV4AIQuestion', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await getRouterV4AIQuestionApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getRouterV4AINextQuestion = createAsyncThunk('api/getRouterV4AINextQuestion', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await getRouterV4AINextQuestionApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

const createParticipantUserEntrySlice = createSlice({
  name: 'participantSlice',
  initialState: {
    response: '',
    loading: false,
    createParticipantResponse: '',
    getParticipantData: '',
    createParticipantUserEntry,
    createParticipantUserEntryOnly,
    requiredResponses: [],
    aiQuestionData: [],
    setDemoAlert: {},
  },
  extraReducers: {
    [createParticipant.pending]: (state, action) => {
      state.loading = true;
    },
    [createParticipant.fulfilled]: (state, action) => {
      state.loading = false;
      state.createParticipantResponse = action.payload;
    },
    [participantsDemographics.pending]: (state, action) => {
      state.loading = true;
    },
    [participantsDemographics.fulfilled]: (state, action) => {
      state.loading = false;
      state.createParticipantResponse = action.payload;
    },
    [getParticipantInitialData.pending]: (state, action) => {
      state.loading = true;
    },
    [getParticipantInitialData.fulfilled]: (state, action) => {
      state.loading = false;
      state.getParticipantData = action.payload;
      state.requiredResponses = [...state.requiredResponses, action.payload];
    },
    [createParticipantUserEntry.pending]: (state, action) => {
      state.loading = true;
    },
    [createParticipantUserEntry.fulfilled]: (state, action) => {
      state.loading = false;
      state.requiredResponses = [...state.requiredResponses, action.payload];
      state.createParticipantUserEntry = action.payload;
    },
    [createParticipantUserEntryOnly.pending]: (state, action) => {
      state.loading = true;
    },
    [createParticipantUserEntryOnly.fulfilled]: (state, action) => {
      state.loading = false;
      state.requiredResponses = [...state.requiredResponses, action.payload];
      state.createParticipantUserEntryOnly = action.payload;
    },
    [getAIQuestion.pending]: (state) => {
      state.loading = true;
    },
    [getAIQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.aiQuestionData = action.payload.data;
    },
    [getRouterV4AIQuestion.pending]: (state) => {
      state.loading = true;
    },
    [getRouterV4AIQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.getRouterV4AIQuestion = action.payload;
    },
    [getRouterV4AINextQuestion.pending]: (state) => {
      state.loading = true;
    },
    [getRouterV4AINextQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.getRouterV4AINextQuestion = action.payload;
    },
    [getAiQuestionReviewed.pending]: (state) => {
      state.loading = true;
    },
    [getAiQuestionReviewed.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [setDemoAlert.fulfilled]: (state, action) => {
      state.setDemoAlert = action.payload;
    },
  },
});

const { reducer } = createParticipantUserEntrySlice;
export default reducer;
