// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//client-side data fetching with Redux Toolkit Query (RTK Query)
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
    getProductsByCategory: build.query({
      query: (categoryId) => `/products?categoryId=${categoryId}`,
  }),
    getAllCategories: build.query({
      query: () =>  `/categories`,
    }),
    getAllReviews :build.query({
      query: () => `/reviews`,
    }),
    getReviewsByProduct: build.query({
  query: (productId) => `/reviews/${productId}`, 
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
    createReviews: build.mutation({
      query: (reviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: reviewData,
      })
    }),
  }),
})
  

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useCreateOrderMutation, 
  useCreateProductMutation, 
  useGetAllCategoriesQuery,
  useGetAllReviewsQuery,
  useCreateReviewsMutation,
  useGetReviewsByProductQuery
} = api;


