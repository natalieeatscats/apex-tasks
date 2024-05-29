import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../api.ts';
import { tasksReducer } from './slices/tasks/tasks-slice.ts';
import { userReducer } from './slices/user/user-slice.ts';
import { apiReducer } from './slices/api/api-slice.ts';

export const store = configureStore({
  reducer: combineReducers({
    userState: userReducer,
    tasksState: tasksReducer,
    apiState: apiReducer,
    [api.reducerPath]: api.reducer
  }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(api.middleware);
  }
});
