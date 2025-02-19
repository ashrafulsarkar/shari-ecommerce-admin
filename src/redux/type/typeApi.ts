import { apiSlice } from "../api/apiSlice";
import { TypeDelResponse, TypeResponse, ITypeAddResponse, IAddType } from "@/types/type-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all Types
    getAllTypes: builder.query<TypeResponse, void>({
      query: () => `/api/type/all`,
      providesTags: ["AllTypes"],
      keepUnusedDataFor: 600,
    }),
    // add category
    addType: builder.mutation<ITypeAddResponse, IAddType>({
      query(data: IAddType) {
        return {
          url: `/api/type/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllTypes"],
    }),
    // editCategory
    editType: builder.mutation<ITypeAddResponse, { id: string; data: Partial<IAddType> }>({
      query({ id, data }) {
        return {
          url: `/api/type/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllTypes", "getType"],
    }),
    // get single product
    getType: builder.query<IAddType, string>({
      query: (id) => `/api/type/get/${id}`,
      providesTags: ['getType']
    }),
    // delete type
    deleteType: builder.mutation<TypeDelResponse, string>({
      query(id: string) {
        return {
          url: `/api/type/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllTypes"],
    }),
  }),
});

export const {
  useGetAllTypesQuery,
  useDeleteTypeMutation,
  useAddTypeMutation,
  useEditTypeMutation,
  useGetTypeQuery,
} = authApi;
