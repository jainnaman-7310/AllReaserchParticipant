import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const testSlice = createSlice({
  name: 'testData',
  initialState,
  reducers: {
    getData: (state) => {
      state.push('Apple');
    },
  },
  extraReducers: {},
});

export const { getData } = testSlice.actions;
const { reducer } = testSlice;
export default reducer;
