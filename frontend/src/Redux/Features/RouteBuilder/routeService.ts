
import { api } from '../../api';

export interface Route {
  id?: number;
  name: string;
  link: string;
  dynamic_content?:string;
  status?: number;
}

export interface RoutesData {
  data: Route[];
}

export interface RouteSingleData {
  data: Route;
}



export const routeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<RoutesData, void>({
      query: () => '/processflow/api/route',
      providesTags: ['Routes'],

    }),

    createRoute: builder.mutation<RouteSingleData, Route>({
      query: (processflow) => ({
        url: '/processflow/api/route/create',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: processflow,
      }),
      invalidatesTags: ['Routes'],
     
    }),
     updateRoute: builder.mutation<RouteSingleData, { id: number; data: Partial<Route> }>({
      query: ({ id, data }) => ({
        url: `/processflow/api/route/update/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['Routes'],
    }),

    deleteRoute: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/processflow/api/route/delete/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Routes'],
     
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateRouteMutation, 
  useGetRoutesQuery, 
  useDeleteRouteMutation,
  useUpdateRouteMutation
} = routeApi;
