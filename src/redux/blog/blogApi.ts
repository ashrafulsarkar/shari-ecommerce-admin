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
    getAllBlogs: builder.query<any, void>({
      query: () => `/api/blog_post/posts`,
      providesTags: ["AllBlogs"],
      keepUnusedDataFor: 600,
    }),
    // add blog
    addBlog: builder.mutation<IBlogResponse, IAddBlog>({
      query(data: any) {
        return {
          url: `/api/blog_post/posts`,
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
          url: `/api/blog_post/posts/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllBlogs"],
    }),
    // get single blog
    getBlog: builder.query<IAddBlog, string>({
      query: (id) => `/api/blog_post/posts/${id}`,
    }),
     // delete category
     deleteBlog: builder.mutation<{message:string}, string>({
      query(id: string) {
        return {
          url: `/api/blog_post/posts/${id}`,
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
