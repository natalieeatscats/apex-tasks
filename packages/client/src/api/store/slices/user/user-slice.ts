import { State } from '../../../../types.ts';
import { createSlice } from '@reduxjs/toolkit';

const userSliceState: State['userState'] = {
  users: [],
  activeUser: null
};

const userSlice = createSlice({
  name: 'userState',
  initialState: userSliceState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    updateActiveUser: (state, action) => {
      state.activeUser = { ...state.activeUser, ...action.payload };
    }
  }
});

export const { setUsers, setActiveUser, updateUsers, updateActiveUser } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
