
import { api } from '../../api';

export interface Department {
  id?: number;                     
  name: string;                    
  description: string;              
  status?: string;                 
  created_at?: string;              
  updated_at?: string;              
}


export interface DepartmentData {
  data: Department[] | Department ;  
}


export const departmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentData, void>({
      query: () => '/users/api/v1/department',
      providesTags: ['Departments'],
    }),

    createDepartment: builder.mutation<DepartmentData, Department>({
      query: (data) => ({
        url: '/users/api/v1/create_department',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['Departments'],
   
    }),

    deleteDepartment: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/api/v1/department/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Departments'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateDepartmentMutation, 
  useGetDepartmentsQuery, 
  useDeleteDepartmentMutation,
} = departmentApi;
