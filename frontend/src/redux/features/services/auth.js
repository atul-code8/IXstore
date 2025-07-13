import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/auth/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),
    google: builder.mutation({
      query: (token) => ({
        url: "google",
        method: "POST",
        body: token,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGoogleMutation } = authApi;
