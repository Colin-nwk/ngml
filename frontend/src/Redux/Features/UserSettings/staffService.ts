import { api } from '../../api';

export interface User {
  id?: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  department_id: number | null;
}


export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData {
  current_page: number;
  data: User[] | [];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: PaginationLink[];
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
}

export interface UserResponse {
  success: boolean;
  data: PaginatedData;
}

export interface UserQueryParams {
  page?: number;
}

export const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaff: builder.query<UserResponse,UserQueryParams| void>({
      query: () => '/users/api/v1/users',
      providesTags: ['Staff'],
    }),
  }),

  overrideExisting: false,
});

export const {
 useGetAllStaffQuery
} = staffApi;

