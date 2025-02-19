
import { api } from '../../api';

export interface Designation {
  id?: number;                     
 role: string;                    
  description: string;                    
  created_at?: string;              
  updated_at?: string;              
}


export interface DesignationData {
  data: Designation[] | Designation;  
}


export const designationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDesignations: builder.query<DesignationData, void>({
      query: () => '/users/api/v1/designations',
      providesTags: ['Designations'],
    }),

    createDesignation: builder.mutation<DesignationData, Designation>({
      query: (data) => ({
        url: '/users/api/v1/create_designation',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['Designations'],
   
    }),

    deleteDesignation: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/api/v1/designations/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Designations'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateDesignationMutation, 
  useGetDesignationsQuery, 
  useDeleteDesignationMutation,
} = designationApi;
