import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productData: [],
  userInfo: null,
  orderData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
    //   state.productData = action.payload
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        // console.log(state.productData);
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (state,action) =>{
        const existingProduct = state.productData.find((item) => item._id === action.payload._id )
        existingProduct && existingProduct.quantity++
    },

    decreaseQuantity : (state,action) =>{
        const existingProduct = state.productData.find((item) => item._id === action.payload._id)
        if(existingProduct.quantity === 1){
            existingProduct.quantity === 1
        }
        else{
         existingProduct.quantity--

        }

    },
    resetCart : (state) =>{
        state.productData = []
    }, 

    deleteProduct : (state,action) => {
        state.productData = state.productData.filter((item) => 
              item._id !== action.payload._id
        )

    },

    addUser : (state,action) =>{
      state.userInfo = action.payload
    },

    deleteUser : (state) => {
      state.userInfo =  null
    },

    saveOrder: (state, action) => {
      state.orderData = action.payload;
    },
    resetOrder: (state) => {
      state.orderData = [];
    },
  },

 
});

// Action creators are generated for each case reducer function
export const { addToCart,increaseQuantity,decreaseQuantity,resetCart,deleteProduct,addUser,deleteUser} = cartSlice.actions;

export default cartSlice.reducer;
