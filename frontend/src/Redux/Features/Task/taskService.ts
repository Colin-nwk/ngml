// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { api } from '../../api';

type Task = {
  description: string | undefined;
  id: number;
  user_id: number;
  title: string;
  route: string;
  start_time: string;
  end_time: string;
  task_status: boolean;
}

type TaskResponse = {
 
  data: Task[] | [];
}


export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<TaskResponse, void>({
      query: () => ({
        url: '/notification/api/tasks',
        method: 'GET',
      }),
       providesTags: ['Tasks'],

     
    }),  
  }),
});

export const { useTasksQuery } = notificationApi;