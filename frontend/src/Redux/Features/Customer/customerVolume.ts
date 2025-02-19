
import { api } from '../../api';

export interface Filters {
    page: string;
    per_page?: string;
    customer_id?: string | null;
    customer_site_id?: string | null;
    created_at_from?: string | null;
    created_at_to?: string | null;
    status?: string | null;
}


export const customersApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getAllCustomersDailyVolume: builder.query<any, Filters>({
            query: (params) => ({
                url: '/gas/api/daily-volumes',
                method: 'POST',
                body: params,
            }),
            providesTags: ['DailyVolumes'],

        }),
        getCustomersDailyVolumeById: builder.query<any, number>({
            query: (customerId) => `/gas/api/daily-volumes/view/${customerId}`,
            providesTags: ['DailyVolumes'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllCustomersDailyVolumeQuery,
    useGetCustomersDailyVolumeByIdQuery,
} = customersApi;