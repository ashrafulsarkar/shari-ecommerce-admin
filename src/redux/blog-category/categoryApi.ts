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
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => `/api/blog-category/all`,
      providesTags: ["AllBlogCategory"],
      keepUnusedDataFor: 600,
    }),

    // add category
    addCategory: builder.mutation<IAddCategoryResponse, IAddCategory>({
      query(data: IAddCategory) {
        return {
          url: `/api/blog-category/add`,
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
          url: `/api/blog-category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllBlogCategory"],
    }),
    // editCategory
    editCategory: builder.mutation<IAddCategoryResponse, { id: string; data: Partial<IAddCategory> }>({
      query({ id, data }) {
        return {
          url: `/api/blog-category/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogCategory","getblogCategory"],
    }),
    // get single product
    getCategory: builder.query<IAddCategory, string>({
      query: (id) => `/api/blog-category/get/${id}`,
      providesTags:['getblogCategory']
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery, 
} = authApi;
