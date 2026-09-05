/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  saveParticipantReplyV2Api, participantFailedInScreenersV2Api, checkScreenerForQuotaRouterV2Api, getCMQuestionnaireApi, saveCMResponseApi, getRandomQuestionApi, submitRandomQuestionApi,
} from 'services/participantService';
import { redirectToCalibr8 } from 'utils/calibr8Redirect';
import Cookies from 'universal-cookie';
import SimpleCrypto from 'simple-crypto-js';

const cookies = new Cookies();

export const saveParticipantReply = createAsyncThunk('paricipant/saveParticipantReply', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookieUserid = newUserId;
    const _secretKey = 'zebra';
    const simpleCrypto = new SimpleCrypto(_secretKey);
    const selectData = simpleCrypto.encrypt(data.selectedData);
    const queryText = simpleCrypto.encrypt(data.query_text);
    const optionText = simpleCrypto.encrypt(data.option_text);
    data.selectedData = selectData;
    data.query_text = queryText;
    data.option_text = optionText;
    data.userSpId = localStorage.getItem('spfjkshdfjbnvcbj');
    const res = await saveParticipantReplyV2Api(data);

    // Server-side Calibr8 gate blocked this step: the backend requires the user
    // to complete Calibr8 before continuing the question flow.
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

export const participantFailedInScreeners = createAsyncThunk('paricipant/participantFailedInScreeners', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookieUserid = newUserId;
    const _secretKey = 'zebra';
    const simpleCrypto = new SimpleCrypto(_secretKey);
    const selectData = simpleCrypto.encrypt(data.selectedData);
    const queryText = simpleCrypto.encrypt(data.query_text);
    const optionText = simpleCrypto.encrypt(data.option_text);
    data.selectedData = selectData;
    data.query_text = queryText;
    data.option_text = optionText;
    data.userSpId = localStorage.getItem('spfjkshdfjbnvcbj');
    const res = await participantFailedInScreenersV2Api(data);

    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const checkScreenerForQuota = createAsyncThunk('paricipant/checkScreenerForQuota', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookieUserid = newUserId;
    const _secretKey = 'zebra';
    const simpleCrypto = new SimpleCrypto(_secretKey);
    const selectData = simpleCrypto.encrypt(data.selectedData);
    const queryText = simpleCrypto.encrypt(data.query_text);
    const optionText = simpleCrypto.encrypt(data.option_text);
    data.selectedData = selectData;
    data.query_text = queryText;
    data.option_text = optionText;
    data.userSpId = localStorage.getItem('spfjkshdfjbnvcbj');
    const res = await checkScreenerForQuotaRouterV2Api(data);

    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getCMQuestionnaire = createAsyncThunk('paricipant/CMQuestionnaire', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await getCMQuestionnaireApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const saveCMQuestionnaire = createAsyncThunk('paricipant/saveCMQuestionnaireResponse', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await saveCMResponseApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const getRandomAIQuestion = createAsyncThunk('paricipant/getrandomQuestion', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await getRandomQuestionApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

export const submitRandomQuestionAnswer = createAsyncThunk('paricipant/submit-random-question', async (data, { rejectWithValue }) => {
  try {
    const newUserId = cookies.get('userId');
    data.cookie_id = newUserId;
    const res = await submitRandomQuestionApi(data);
    return res.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
});

const participantAnswerSlice = createSlice({
  name: 'participantAnswer',
  initialState: {
    response: '', loading: false, participantFailedInScreenersResponse: '', CMQuestionnaireResponse: '', RandomQuestionResponse: '', submitRandomQuestionAnswerResponse: '',
  },
  extraReducers: {
    [participantFailedInScreeners.pending]: (state, action) => {
      state.loading = true;
    },
    [participantFailedInScreeners.fulfilled]: (state, action) => {
      state.loading = false;
      state.participantFailedInScreenersResponse = action.payload;
    },
    [checkScreenerForQuota.pending]: (state, action) => {
      state.loading = true;
    },
    [checkScreenerForQuota.fulfilled]: (state, action) => {
      state.loading = false;
      state.participantFailedInScreenersResponse = action.payload;
    },
    [getCMQuestionnaire.pending]: (state, action) => {
      state.loading = true;
    },
    [getCMQuestionnaire.fulfilled]: (state, action) => {
      state.loading = false;
      state.CMQuestionnaireResponse = action.payload;
    },
    [saveCMQuestionnaire.pending]: (state, action) => {
      state.loading = true;
    },
    [saveCMQuestionnaire.fulfilled]: (state, action) => {
      state.loading = false;
      state.saveCMQuestionnaireResponse = action.payload;
    },
    [getRandomAIQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [getRandomAIQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.RandomQuestionResponse = action.payload;
    },
    [submitRandomQuestionAnswer.pending]: (state, action) => {
      state.loading = true;
    },
    [submitRandomQuestionAnswer.fulfilled]: (state, action) => {
      state.loading = false;
      state.submitRandomQuestionAnswerResponse = action.payload;
    },
    [saveParticipantReply.pending]: (state, action) => {
      state.loading = true;
    },
    [saveParticipantReply.fulfilled]: (state, action) => {
      state.loading = false;
    },

  },
});

const { reducer } = participantAnswerSlice;
export default reducer;
