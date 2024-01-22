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
        })
    })
});

export const {usePostTaskMutation, useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi;