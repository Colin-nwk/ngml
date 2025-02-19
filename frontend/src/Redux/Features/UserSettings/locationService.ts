
import { api } from '../../api';

export interface Location {
  id?: number;                     
  location: string;                    
  zone: string;    
  state: string;                         
  created_at?: string;              
  updated_at?: string;              
}


export interface LocationData {
  data: Location[] | Location ;  
}


export const locationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<LocationData, void>({
      query: () => '/users/api/v1/locations',
      providesTags: ['Locations'],
    }),

    createLocation: builder.mutation<LocationData, Location>({
      query: (data) => ({
        url: '/users/api/v1/create_location',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
      invalidatesTags: ['Locations'],
   
    }),

    deleteLocation: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/api/v1/locations/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Locations'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateLocationMutation, 
  useGetLocationsQuery, 
  useDeleteLocationMutation,
} = locationApi;
