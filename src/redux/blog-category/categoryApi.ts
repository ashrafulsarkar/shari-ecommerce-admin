import { apiSlice } from "../api/apiSlice";
import {
  CategoryResponse,
  IAddCategory,
  IAddCategoryResponse,
  ICategoryDeleteRes,
} from "@/types/blogCategory-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllBlogCategories: builder.query<any, void>({
      query: () => `/api/blog/categories`,
      providesTags: ["AllBlogCategory"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addBlogCategory: builder.mutation<IAddCategoryResponse, IAddCategory>({
      query(data: IAddCategory) {
        return {
          url: `/api/blog/categories`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogCategory"],
    }),

    // delete category
    deleteCategory: builder.mutation<ICategoryDeleteRes, string>({
      query(id: string) {
        return {
          url: `/api/blog/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllBlogCategory"],
    }),
    // editCategory
    editBlogCategory: builder.mutation<IAddCategoryResponse, { id: string; data: Partial<IAddCategory> }>({
      query({ id, data }) {
        return {
          url: `/api/blog/categories/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogCategory","getblogCategory"],
    }),
    // get single product
    getBlogCategory: builder.query<IAddCategory, string>({
      query: (id) => `/api/blog/categories/${id}`,
      providesTags:['getblogCategory']
    }),
  }),
});

export const {
  useGetAllBlogCategoriesQuery,
  useAddBlogCategoryMutation,
  useDeleteCategoryMutation,
  useEditBlogCategoryMutation,
  useGetBlogCategoryQuery,
} = authApi;
