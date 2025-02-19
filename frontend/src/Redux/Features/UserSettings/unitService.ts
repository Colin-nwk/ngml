
import { api } from '../../api';

export interface Unit {
  id?: number;
  name: string;
  description: string;
  departmentId: number|string;
}

export interface UnitData {
  data: Unit[] | Unit;
}


export const unitApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<UnitData, void>({
      query: () => '/users/api/v1/units',
      providesTags: ['Units'],
    }),

    createUnit: builder.mutation<UnitData, Unit>({
      query: (data) => ({
        url: '/users/api/v1/create_unit',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['Units'],
   
    }),

    deleteUnit: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/api/v1/unit/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Units'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateUnitMutation, 
  useGetUnitsQuery, 
  useDeleteUnitMutation,
} = unitApi;
