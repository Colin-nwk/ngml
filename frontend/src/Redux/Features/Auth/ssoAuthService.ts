/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '../../api';

interface SSOUser {
  email: string;
  name: string;
  status: number | string;
  updated_at: string;
  created_at: string;
  id: number;
}

interface SSSORegistrationResponse {
  message: string;
  user: SSOUser;
}

interface FormData {
  location_id: string;
  designation_id: string;
  unit_id: string;
  department_id: string;
  user_id: string;
}

export const ssoAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    initialize: builder.query<any, void>({
      query: () => '/users/api/auth/initialize',
      providesTags: ['SSO_init'],
    }),

    userInfo: builder.mutation<FormData, FormData>({
      query: (data) => ({
        url: '/users/api/v1/initialize_user_basic_info',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
    }),

    callback: builder.mutation<SSSORegistrationResponse, any>({
      query: (data) => ({
        url: '/users/api/auth/callback',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useInitializeQuery, useCallbackMutation, useUserInfoMutation } =
  ssoAuthApi;
