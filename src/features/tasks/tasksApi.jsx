import apiSlice from "../api/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tasks"]
        }),
        getTasks: builder.query({
            query: (email) => ({
                url: `/tasks/${email}`
            }),
            providesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTask: builder.mutation({
            query: ({id, data}) => ({
                url: `/task/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Tasks"]
        }),
        postCompletedTask: builder.mutation({
            query: (data) => ({
                url: `/completedTasks`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["CompletedTasks"],
        }),
        completedTasks: builder.query({
            query: (email) => ({
                url: `/completedTasks/${email}`,
            }),
            providesTags: ["CompletedTasks"],
        }),
    })
});

export const {
    usePostTaskMutation,
    useGetTasksQuery, 
    useDeleteTaskMutation, 
    useUpdateTaskMutation, 
    usePostCompletedTaskMutation,
    useCompletedTasksQuery,
} = tasksApi;