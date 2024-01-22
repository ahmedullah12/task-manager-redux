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
        })
    })
});

export const {usePostTaskMutation, useGetTasksQuery} = tasksApi;