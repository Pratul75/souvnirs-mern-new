import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

export const collectionConditionApi = createApi({
  reducerPath: "collectionConditions",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getCollectionConditionById: builder.query({
      query: (id) =>
        `/collection-condition/get-collection-condition-by-id/${id}`,
    }),
  }),
});

export const { useGetCollectionConditionByIdQuery } = collectionConditionApi;
