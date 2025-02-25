import { apiSlice } from "../api/apiSlice";
import { IAddBlog, BlogResponse } from "@/types/blog-type";

interface IBlogResponse {
  success: boolean;
  status: string;
  message: string;
  data: any;
}

interface IBlogEditResponse {
  data: IAddBlog;
  message: string;
}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getUserOrders
    getAllBlogs: builder.query<BlogResponse, void>({
      query: () => `/api/blog/all`,
      providesTags: ["AllBlogs"],
      keepUnusedDataFor: 600,
    }),
    // add blog
    addBlog: builder.mutation<IBlogResponse, IAddBlog>({
      query(data: IAddBlog) {
        return {
          url: `/api/blog/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    // edit blog
    editBlog: builder.mutation<
      IBlogEditResponse,
      { id: string; data: Partial<IAddBlog> }
    >({
      query({ id, data }) {
        return {
          url: `/api/blog/edit-blog/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    // get single blog
    getBlog: builder.query<IAddBlog, string>({
      query: (id) => `/api/blog/single-blog/${id}`,
    }),
     // delete category
     deleteBlog: builder.mutation<{message:string}, string>({
      query(id: string) {
        return {
          url: `/api/blog/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useAddBlogMutation,
  useEditBlogMutation,
  useGetBlogQuery,
  useDeleteBlogMutation,
} = authApi;
