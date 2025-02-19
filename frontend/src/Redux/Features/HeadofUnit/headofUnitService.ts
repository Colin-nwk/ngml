import { api } from '../../api';

export interface HeadOfUnit {
  id: number;
  user_id:string,
  location_id:string;
  unit_id:string;
  status:string;
}

export interface HeadsOfUnitData {
  data: HeadOfUnit[];
}

export interface HeadOfUnitSingleData {
  data: HeadOfUnit;
}

export interface HeadOfUnitCreateInterface{
  user_id:string,
  location_id:string;
  unit_id:string;
  status:string;
}


export const headOfUnitApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeadsOfUnit: builder.query<HeadsOfUnitData, void>({
      query: () => '/users/api/v1/headofunit',
      providesTags: ['HeadsOfUnit'],
     
    }),

    createHeadOfUnit: builder.mutation<HeadOfUnitSingleData, HeadOfUnitCreateInterface>({
      query: (headOfUnit) => ({
        url: '/users/api/v1/headofunit/create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: headOfUnit,
      }),
      invalidatesTags: ['HeadsOfUnit'],
    }),

  }),
  overrideExisting: false,
});

export const {
  useCreateHeadOfUnitMutation,
  useGetHeadsOfUnitQuery
} = headOfUnitApi;