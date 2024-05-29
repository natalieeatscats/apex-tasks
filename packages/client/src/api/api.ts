import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setActiveUser,
  setUsers,
  updateActiveUser
} from './store/slices/user/user-slice.ts';
import { setAuth } from './store/slices/api/api-slice.ts';
import { setTasks, updateTasks } from './store/slices/tasks/tasks-slice.ts';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['User', 'Task'],
  endpoints: ({ query, mutation }) => ({
    getUsers: query({
      query: () => '/user',
      providesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    getTasks: query({
      query: () => '/task',
      providesTags: ['Task'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTasks(data));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    createTask: mutation({
      query: (data) => ({
        url: '/task',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      invalidatesTags: ['Task', 'User'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateTasks(data));
          dispatch(updateActiveUser({ tasks: data }));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    updateUser: mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveUser(data.user));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    updateTask: mutation({
      query: ({ id, data }) => ({
        url: `/task/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      invalidatesTags: ['Task']
    }),
    deleteTask: mutation({
      query: ({ id }) => ({
        url: `/task/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      invalidatesTags: ['Task']
    }),
    deleteUser: mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      invalidatesTags: ['User']
    }),
    remember: query({
      query: () => ({
        url: '/auth/login/remember',
        method: 'POST',
        body: {},
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(1);
          const { accessToken, refreshToken, user } = data;
          window.localStorage.setItem('apex-tasks-refresh_token', refreshToken);
          window.localStorage.setItem('apex-tasks-access_token', accessToken);
          dispatch(setAuth(true));
          dispatch(setActiveUser(user));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    login: mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;
          window.localStorage.setItem('apex-tasks-refresh_token', refreshToken);
          window.localStorage.setItem('apex-tasks-access_token', accessToken);
          dispatch(setAuth(true));
          dispatch(setActiveUser(user));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    register: mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken, user } = data;
          window.localStorage.setItem('apex-tasks-access_token', accessToken);
          window.localStorage.setItem('apex-tasks-refresh_token', refreshToken);
          dispatch(setAuth(true));
          dispatch(setActiveUser(user));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    logout: mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('apex-tasks-access_token')}`
        }
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          window.localStorage.setItem('apex-tasks-access_token', '');
          window.localStorage.setItem('apex-tasks-refresh_token', '');
          dispatch(setAuth(false));
          dispatch(setActiveUser(null));
        } catch (e) {
          console.error(e);
        }
      }
    })
  })
});

export const { useGetUsersQuery, useGetTasksQuery } = api;
export const {
  useCreateTaskMutation,
  useUpdateUserMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteUserMutation,
  useRememberQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation
} = api;
