import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllAlbums: builder.query<any, void>({
      query: () => `/api/album`,
      providesTags: ["AllAlbum"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addAlbum: builder.mutation<any, any>({
      query(data: any) {
        return {
          url: `/api/album`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllAlbum"],
    }),

    // delete category
    deleteAlbum: builder.mutation<any, string>({
      query(id: string) {
        return {
          url: `/api/album/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllAlbum"],
    }),
    // editCategory
    editAlbum: builder.mutation<any, { id: string; data: Partial<any> }>({
      query({ id, data }) {
        return {
          url: `/api/album/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllAlbum"],
    }),
    // get single product
    getAlbum: builder.query<any, string>({
      query: (id) => `/api/album/${id}`,
      providesTags:['getAlbum']
    }),
  }),
});

export const {
  useGetAllAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
  useEditAlbumMutation,
  useGetAlbumQuery,
} = authApi;
