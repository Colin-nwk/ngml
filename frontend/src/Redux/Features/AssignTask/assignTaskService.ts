import { api } from '../../api';
 
export interface Task {
    id: number;
    processflow_step: string | null;
    processflow: string | null;
    task_status: string;
    assignment_status: string;
    processflow_history: string | null;
    entity: string;
    entity_site_id: string;
}
 
export interface User {
    id: number;
    name: string;
    email: string;
}
 
export interface TasksData {
    data: Task[];
}
 
export interface UsersData {
    data: User[];
}
 


export const taskAssignApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<TasksData, void>({
            query: () => '/automator/api/unassignedtasks',
            providesTags: ['AssignTasks'],
        }),
 
        getUsers: builder.query<UsersData, number>({
            query: (id) => `/automator/api/task-assignable-users/${id}`,
            providesTags: ['Users'],
        }),
 
        assignTask: builder.mutation<{ success: boolean; message: string }, { taskId: number; userId: number }>({
            query: ({ taskId, userId }) => ({
                url: '/automator/api/assign-task-to-user',
                method: 'POST',
                body: { task_id: taskId, user_id: userId },
            }),
            invalidatesTags: ['AssignTasks'],
    
        }),
    }),
 
    overrideExisting: false,
});
 
export const {
    useGetTasksQuery,
    useGetUsersQuery,
    useAssignTaskMutation,
} = taskAssignApi;