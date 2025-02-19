import { api } from '../../api';

export interface Site {
  id: number;
  task_id: string;
  site_address: string;
  ngml_zone_id: string;
  site_name: string;
  phone_number: string;
  email: string;
  site_contact_person_name: string;
  site_contact_person_email: string;
  site_contact_person_phone_number: string;
  site_existing_status: boolean;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerSite {
  id: number;
  task_id: string;
  company_name: string;
  email: string;
  phone_number: string;
  created_by_user_id: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  sites: Site[];  
}

export interface CustomerWithSite {
  data: CustomerSite;  
}

// New interface for individual customer data
export interface CustomerData {
  id: number;
  task_id: string;
  company_name: string;
  email: string;
  phone_number: string;
  created_by_user_id: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

// Updated interface for the API response
export interface CustomerResponse {
  data: CustomerData[];
}

// Interface for a single customer response
export interface SingleCustomerResponse {
  data: CustomerData;
}

// type ErrorResponse = {
//   error: string;
// };

export interface FormField {
  id: number;
  name?: string;
  text?: string;
  elementType: string;
  placeholder?: string;
  key?: string;
};

export interface DollarRate {
  rate: string | number | null;
  updatedAt?: Date;
}

export interface DollarFormData {
  [key: string]: string | number | File | null;
}


export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomerResponse, void>({
      query: () => '/customer/api/customers',
      providesTags: ['Customers'],
     
    }),
    getCustomerById: builder.query<CustomerWithSite, number>({
      query: (id) => `/customer/api/customers/${id}`,
    
      providesTags: ['Customers'],
    }),
    addCustomer: builder.mutation<CustomerResponse, Omit<CustomerData, 'id' | 'created_at' | 'updated_at'>>({
      query: (customer) => ({
        url: '/customer/api/customers',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: customer,
      }),
      invalidatesTags: ['Forms', 'Customers', 'Tasks'],
     
    }),
    updateCustomer: builder.mutation<CustomerResponse, Partial<CustomerData> & { id: number }>({
      query: ({ id, ...updates }) => ({
        url: `/customer/api/customers/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updates,
      }),
     
    }),
    deleteCustomer: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/customer/api/customers/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Forms', 'Customers', 'Tasks'],
     
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;