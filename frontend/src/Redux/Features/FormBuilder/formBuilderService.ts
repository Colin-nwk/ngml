/* eslint-disable @typescript-eslint/no-explicit-any */


import { api } from '../../api';




interface Option {
  label: string;
  value: string;
}

export interface FormField {
  id: number;
  name?: string;
  label?: string;
  type: 'number' | 'text' | 'password' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'location' | 'email' | 'tel' | 'hidden' | 'file' | 'dynamic';
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  value?: string;
  url?: string;
}


interface Task {
  id: number;
  form_builder_id: string;
  form_field_answers: string | null;
  automator_task_id: string;
  process_flow_history_id: string | null;
  entity: string;
  entity_id: string;
  entity_site_id: string | null;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}


export interface FormBuilderData {
  id?: number;
  name?: string;
  json_form: string;
  process_flow_id: string | number | undefined | null;
  process_flow_step_id: string | number | undefined;
  tag_id?: string;
  form_data: string[] | [];
  description?: string;
  
}



export interface FormSubmission {
  form_builder_id?: string | undefined;
  form_field_answers: string;
  data_id?: number;
  process_flow_id?: string | number | undefined;
  process_flow_step_id?: string | number | undefined;
  tag_id?: string;
}


export interface FormBuilderApiResponse {
  data: FormBuilderData;
  status?: string;
  // task?: Task;

}



export interface FormFieldAnswer {
  field_id: number;
  answer: string;
}


export interface FormFieldAnswerTwo {
  id: number;
  form_builder_id: string;
  form_field_answers: string | null;
  automator_task_id: string;
  process_flow_history_id: string | null;
  entity: string;
  entity_id: string;
  entity_site_id: string | null;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FormBuilderDataTwo {
  id: number;
  name: string;
  json_form: string;
  process_flow_id: string | null;
  process_flow_step_id: string | null;
  tag_id: string;
  form_data: FormFieldAnswerTwo[];
}


export interface ApiResponseTwo {
  data: FormBuilderDataTwo;
  status: string;
  task?: Task;
}


export const CREATE_NEW_CUSTOMER_FORM_ID = 6;
export const CREATE_NEW_CUSTOMER_SITE_FORM_ID = 5;


export const formBuilderApi = api.injectEndpoints({
  endpoints: (builder) => ({

    createForm: builder.mutation<FormBuilderApiResponse, Partial<FormBuilderData>>({
      query: (formData) => ({
        url: '/formbuilder/api/forms/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Forms'],

    }),
    updateForm: builder.mutation<FormBuilderApiResponse, Partial<FormBuilderData>>({
      query: (formData) => {
        const { id, ...bodyData } = formData;
        return {
          url: `/formbuilder/api/forms/update/${id}`,
          method: 'PUT',
          body: bodyData,
        };
      },
      invalidatesTags: ['Forms'],
    }),

    getForms: builder.query<FormBuilderApiResponse, void>({
      query: () => '/formbuilder/api/forms',
      providesTags: ['Forms'],

    }),
    getDynamicFetch: builder.query<any, any>({
      query: (url) => `/${url}`,
      providesTags: ['DynamicContent'],

    }),
    getTags: builder.query<any, void>({
      query: () => '/formbuilder/api/tag',
      providesTags: ['Tags'],

    }),
    getFormById: builder.query<FormBuilderApiResponse, number>({
      query: (id) => `/formbuilder/api/forms/${id}`,
      providesTags: ['Forms'],

    }),
    getFormByEntityId: builder.query<ApiResponseTwo, string>({
      query: (url) => `/formbuilder/api/forms/view/${url}`,
      providesTags: ['Forms'],

    }),

    getFormByName: builder.query<ApiResponseTwo, string>({
      query: (name) => `/formbuilder/api/forms/view/${name}`,
      providesTags: ['Forms'],

    }),

    submitForm: builder.mutation<FormSubmission, FormSubmission>({
      query: (formData) => ({
        url: '/formbuilder/api/form-data/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Forms', 'Customers', 'Tasks', 'DynamicContent'],
    }),

    saveForm: builder.mutation<FormBuilderApiResponse, Partial<FormBuilderData>>({
      query: (formData) => ({
        url: '/formbuilder/api/forms/save',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Forms'],

    }),

  }),
  overrideExisting: false,
});






export const {
  useGetDynamicFetchQuery,
  useUpdateFormMutation,
  useGetTagsQuery,
  useCreateFormMutation,
  useGetFormByEntityIdQuery,
  useGetFormByNameQuery,
  useGetFormsQuery,
  useGetFormByIdQuery,
  useSubmitFormMutation,
  useSaveFormMutation
} = formBuilderApi;






















