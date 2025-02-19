import { api } from '../../api';

type GCCCreate = {
  customer_id: number;
  customer_site_id: number;
  list_item: string;
};

type GCCInit = {
  customer_id: number;
  customer_site_id: number;
};

export const gccApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGCC: builder.mutation<{ success: boolean }, GCCCreate>({
      query: (gccData) => ({
        url: 'billing/api/gcc/create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: gccData,
      }),
    }),
    initGCC: builder.mutation<{ success: boolean }, GCCInit>({
      query: (gccData) => ({
        url: 'billing/api/gcc-init',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: gccData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateGCCMutation,
  useInitGCCMutation,
} = gccApi;
