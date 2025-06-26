import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistData: [],  // Changed from productData
  userInfo: null,
  // Removed orderData since it's not needed for wishlist
};

export const wishlistSlice = createSlice({
  name: "wishlist",  // Changed from cart
  initialState,
  reducers: {
    // Simplified add - no quantity handling
    addToWishlist: (state, action) => {
      const existingProduct = state.wishlistData.find(
        (item) => item._id === action.payload._id
      );
      if (!existingProduct) {
        state.wishlistData.push(action.payload);
      }
    },
    
    // Removed quantity-related reducers
    
    resetWishlist: (state) => {  // Changed from resetCart
      state.wishlistData = [];
    }, 

    removeFromWishlist: (state, action) => {  // Changed from deleteProduct
      state.wishlistData = state.wishlistData.filter((item) => 
        item._id !== action.payload._id
      );
    },

    // Kept user-related functions (optional)
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },

    deleteUser: (state) => {
      state.userInfo = null;
    },

    // Removed order-related functions
  },
});

// Updated action creators
export const { 
  addToWishlist, 
  resetWishlist, 
  removeFromWishlist,
  addUser,
  deleteUser
} = wishlistSlice.actions;

export default wishlistSlice.reducer;