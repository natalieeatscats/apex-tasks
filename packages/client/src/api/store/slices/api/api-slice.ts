import { State } from '../../../../types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const apiSliceState: State['apiState'] = {
  isAuth: false,
  token: ''
};

const apiSlice = createSlice({
  name: 'apiState',
  initialState: apiSliceState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

export const { setAuth, setToken } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
