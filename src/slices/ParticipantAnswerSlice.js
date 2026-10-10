/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  saveParticipantReplyV2Api,
  participantFailedInScreenersV2Api,
  checkScreenerForQuotaRouterV2Api,
  getRandomQuestionApi,
  submitRandomQuestionApi,
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

const markPending = (state) => {
  state.pendingRequests += 1;
  state.loading = true;
};

const markSettled = (state) => {
  state.pendingRequests = Math.max(0, state.pendingRequests - 1);
  state.loading = state.pendingRequests > 0;
};

const participantAnswerSlice = createSlice({
  name: 'participantAnswer',
  initialState: {
    response: '',
    loading: false,
    pendingRequests: 0,
    participantFailedInScreenersResponse: '',
    RandomQuestionResponse: '',
    submitRandomQuestionAnswerResponse: '',
  },
  extraReducers: {
    [participantFailedInScreeners.pending]: (state) => {
      markPending(state);
    },
    [participantFailedInScreeners.fulfilled]: (state, action) => {
      markSettled(state);
      state.participantFailedInScreenersResponse = action.payload;
    },
    [participantFailedInScreeners.rejected]: (state) => {
      markSettled(state);
    },
    [checkScreenerForQuota.pending]: (state) => {
      markPending(state);
    },
    [checkScreenerForQuota.fulfilled]: (state, action) => {
      markSettled(state);
      state.participantFailedInScreenersResponse = action.payload;
    },
    [checkScreenerForQuota.rejected]: (state) => {
      markSettled(state);
    },
    [getRandomAIQuestion.pending]: (state) => {
      markPending(state);
    },
    [getRandomAIQuestion.fulfilled]: (state, action) => {
      markSettled(state);
      state.RandomQuestionResponse = action.payload;
    },
    [getRandomAIQuestion.rejected]: (state) => {
      markSettled(state);
    },
    [submitRandomQuestionAnswer.pending]: (state) => {
      markPending(state);
    },
    [submitRandomQuestionAnswer.fulfilled]: (state, action) => {
      markSettled(state);
      state.submitRandomQuestionAnswerResponse = action.payload;
    },
    [submitRandomQuestionAnswer.rejected]: (state) => {
      markSettled(state);
    },
    [saveParticipantReply.pending]: (state) => {
      markPending(state);
    },
    [saveParticipantReply.fulfilled]: (state) => {
      markSettled(state);
    },
    [saveParticipantReply.rejected]: (state) => {
      markSettled(state);
    },
  },
});

const { reducer } = participantAnswerSlice;
export default reducer;
