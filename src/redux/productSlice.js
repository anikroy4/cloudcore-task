import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  try {
    console.log('Fetching products from API...'); // Debug log
    const response = await axios.get('https://admin.refabry.com/api/all/product/get');
    console.log('API Response:', response.data.data.data); // Debug log
    return response.data.data.data; // Assuming the API returns products in `data.data`
  } catch (error) {
    console.error('Error fetching products:', error); // Debug log
    return rejectWithValue(error.response?.data || 'Failed to fetch products');
  }
});

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('Fetching products...'); // Debug log
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('Products fetched successfully:', action.payload); // Debug log
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error('Failed to fetch products:', action.payload); // Debug log
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
