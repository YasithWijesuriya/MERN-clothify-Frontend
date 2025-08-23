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
   tagTypes: ['Products','Reviews'],
  endpoints: (build) => ({


    getAllProducts: build.query({
      query: ({ categorySlug, colorSlug ,sortByPrice } = {}) => {
        const params = new URLSearchParams();
        if (categorySlug) params.append('categorySlug', categorySlug.toLowerCase());
        if (colorSlug) params.append('colorSlug', colorSlug.toLowerCase());
        if (sortByPrice) params.append('sortByPrice', sortByPrice);
        const qs = params.toString();
        return `/products${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result = []) =>
        result.length
          ? [
              ...result.map((p) => ({ type: 'Products', id: p._id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
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
          providesTags: (result, error, productId) =>
            result
              ? [
                  ...result.map((r) => ({ type: 'Reviews', id: r._id })),
                  { type: 'Reviews', id: productId },
                ]
              : [{ type: 'Reviews', id: productId }],
      }),

    getColors: build.query({
          query: () => '/colors',
          providesTags: (result = []) => [
            ...result.map(({ _id }) => ({ type: 'Colors', id: _id })),
            { type: 'Colors', id: 'LIST' },
          ],
    }),
    getAllOrders:build.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),

    getMyOrdersByUser: build.query({
      query: () => "/orders/my-orders",
    }),
    createProduct: build.mutation({
          query: (productData) => ({
            url: '/products',
            method: 'POST',
            body: productData,
          }),
          invalidatesTags: [
            { type: "Products", id: "LIST" }
          ],
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
          }),
          invalidatesTags: (result, error, arg) => [
            { type: 'Reviews', id: arg.productId },
          ],
    }),

    deleteProduct: build.mutation({
          query: (productId) => ({
            url: `/products/${productId}`,
            method: 'DELETE',
          }),
          invalidatesTags: (result, error, productId) => 
            [{ type: 'Products', id: productId },
              {type:"products",id:"LIST"},
            ],
        
    }),
    deleteReview: build.mutation({
            query: (reviewId) => ({
              url: `/reviews/${reviewId}`,
              method: 'DELETE',
            }),
            invalidatesTags: (result, error, { productId }) => 
          [{ type: 'Reviews', id: productId }],
    }),
    getDailySales: build.query({
        queryFn: async (days, _queryApi, _extraOptions, fetchWithBQ) => {
          // full URL override
          const result = await fetchWithBQ(`/orders/daily-sales?days=${days}`);
          return result.error ? { error: result.error } : { data: result.data };
        },
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
  useGetReviewsByProductQuery,
  useDeleteProductMutation,
  useDeleteReviewMutation,
  useGetColorsQuery,
  useGetMyOrdersByUserQuery,
  useGetAllOrdersQuery,
  useGetDailySalesQuery
} = api;


