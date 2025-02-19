import { api } from '../../api';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const productsApi = api.injectEndpoints({

  endpoints: (builder) => ({

    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      // providesTags: ['Products'],
    }),
    addProduct: builder.mutation<Product, Omit<Product, 'id'>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: product,
      }),
      // invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
      query: ({ id, ...updates }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updates,
      }),
      // invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
          headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      }),
      // invalidatesTags: ['Products'],
    }),
  }),
   overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;