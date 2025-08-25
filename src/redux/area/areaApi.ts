import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllAreas: builder.query<any, void>({
      query: () => `/api/area`,
      providesTags: ["AllArea"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addArea: builder.mutation<any, any>({
      query(data: any) {
        return {
          url: `/api/area`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllArea"],
    }),

    // delete category
    deleteArea: builder.mutation<any, string>({
      query(id: string) {
        return {
          url: `/api/area/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllArea"],
    }),
    // editCategory
    editArea: builder.mutation<any, { id: string; data: Partial<any> }>({
      query({ id, data }) {
        return {
          url: `/api/area/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllArea"],
    }),
    // get single product
    getArea: builder.query<any, string>({
      query: (id) => `/api/area/${id}`,
      providesTags:['getArea']
    }),
  }),
});

export const {
  useGetAllAreasQuery,
  useAddAreaMutation,
  useDeleteAreaMutation,
  useEditAreaMutation,
  useGetAreaQuery,
} = authApi;
