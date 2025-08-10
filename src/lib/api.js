// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () =>  `/products`,
    }),
    getAllCategories: build.query({
      query: () =>  `/categories`,
    }),
    createProduct: build.mutation({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
    }),
    createOrder: build.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});
  

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetAllProductsQuery , 
  useCreateOrderMutation, 
  useCreateProductMutation, 
  useGetAllCategoriesQuery } = api;

