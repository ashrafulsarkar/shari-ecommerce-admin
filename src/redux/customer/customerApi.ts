import { apiSlice } from "../api/apiSlice";


export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all customer
    getAllCustomer: builder.query<any, void>({
      query: () => `/api/customer`,
      providesTags: ["AllCustomer"],
      keepUnusedDataFor: 600,
    }),

    // add customer
    addCustomer: builder.mutation<any, any>({
      query(data: any) {
        return {
          url: `/api/customer`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCustomer"],
    }),

    // delete customer
    deleteCustomer: builder.mutation<any, string>({
      query(id: string) {
        return {
          url: `/api/customer/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCustomer"],
    }),
    // edit customer
    editCustomer: builder.mutation<any, { id: string; data: Partial<any> }>({
      query({ id, data }) {
        return {
          url: `/api/customer/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ['AllCustomer'],
    }),
    // get single customer
    getCustomer: builder.query<any, string>({
      query: (id) => `/api/customer/${id}`,
      providesTags:['getCustomer']
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
  useGetCustomerQuery,
} = authApi;
