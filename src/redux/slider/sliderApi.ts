import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllSliders: builder.query<any, void>({
      query: () => `/api/slider`,
      providesTags: ["AllSlider"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addSlider: builder.mutation<any, any>({
      query(data: any) {
        return {
          url: `/api/slider`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllSlider"],
    }),

    // delete category
    deleteSlider: builder.mutation<any, string>({
      query(id: string) {
        return {
          url: `/api/slider/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllSlider"],
    }),
    // editCategory
    editSlider: builder.mutation<any, { id: string; data: Partial<any> }>({
      query({ id, data }) {
        return {
          url: `/api/slider/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllSlider"],
    }),
    // get single product
    getSlider: builder.query<any, string>({
      query: (id) => `/api/slider/${id}`,
      providesTags:['getSlider']
    }),
  }),
});

export const {
  useGetAllSlidersQuery,
  useAddSliderMutation,
  useDeleteSliderMutation,
  useEditSliderMutation,
  useGetSliderQuery,
} = authApi;
