import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from './productAPI';

export const getProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const data = await fetchProducts();
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;
