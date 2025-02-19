/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '../../api';

export const invoiceAdviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceAdvice: builder.query<any, void>({
      query: () => '/gas/api/v1/',
      providesTags: ['InvoiceAdvice'],
    }),

    createInvoice: builder.mutation<any, any>({
      query: (data) => ({
        url: '/gas/api/v1/create_department',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['InvoiceAdvice'],
   
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateInvoiceMutation,useGetInvoiceAdviceQuery
} = invoiceAdviceApi;
