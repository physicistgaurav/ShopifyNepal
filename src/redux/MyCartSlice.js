import { createSlice } from "@reduxjs/toolkit";

const MyCartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProductToMyCart(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
        state.push({
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          brand: action.payload.brand,
          price: action.payload.price,
          qty: action.payload.qty + 1,
        });
      } else {
        state[myindex].qty = state[myindex].qty + 1;
      }
    },
    removeMyCartItem(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
    deleteMyCartItem(state, action) {
      return (state = state.filter((item) => item.id != action.payload));
    },
  },
});

export const { addProductToMyCart, removeMyCartItem, deleteMyCartItem } =
  MyCartSlice.actions;

export default MyCartSlice.reducer;
