import axios from "axios";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken: string | null = null;

instance.interceptors.request.use((request) => {
  try {
    const token = localStorage.getItem("token") || null;

    if (request && request.headers && token) {
      request.headers.Authorization = token ? `Bearer ${token}` : false;
    }

    return request;
  } catch (error) {
    return request;
  }
});

instance.interceptors.request.use((request) => {
  try {
    authToken = localStorage.getItem("authToken") || null;

    if (request && request.headers && authToken) {
      request.headers.Authorization = authToken ? `Bearer ${authToken}` : false;
    }

    return request;
  } catch (error) {
    return request;
  }
});

///////////////////////////////////////////////////////////////////////////////////////////

// type Task = {
//   id: string;
//   title: string;
//   description: string;
// };

// type UpdateRequest = {
//   id: string;
//   updatedRequest: Partial<Task>;
// };
// const baseQuery = fetchBaseQuery({
//   baseUrl: apiUrl,
//   prepareHeaders: (headers) => {
//     try {
//       const authToken = localStorage.getItem("authToken") || null;

//       if (headers && authToken) {
//         headers.set("Authorization", `Bearer ${authToken}`);
//       }

//       return headers;
//     } catch (error) {
//       return headers;
//     }
//   },
// });

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: baseQuery,
//   endpoints: (builder) => ({
//     getTasks: builder.query<Task[], void>({
//       query: () => "/todos",
//       transformResponse: (response: Task[]) => response,
//     }),
//     updateTask: builder.mutation<void, UpdateRequest>({
//       query: ({ id, updatedRequest }) => ({
//         url: `/todos/${id}`,
//         method: "PUT",
//         body: updatedRequest,
//       }),
//     }),
//     addTask: builder.mutation<void, Task>({
//       query: (newTask) => ({
//         url: "/todos",
//         method: "POST",
//         body: newTask,
//       }),
//     }),
//     deleteTask: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/todos/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetTasksQuery,
//   useUpdateTaskMutation,
//   useAddTaskMutation,
//   useDeleteTaskMutation,
// } = api;
