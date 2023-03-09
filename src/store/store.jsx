import { configureStore, createSlice } from "@reduxjs/toolkit";
//===========CREATE POPUP SLICE===================
const popupSlice = createSlice({
  name: "popup",
  initialState: {
    popup: false,
    value: {},
  },
  reducers: {
    showPopup: (state, action) => {
      state.popup = true;
      state.value = action.payload;
    },
    hidePopup: (state) => {
      state.popup = false;
    },
  },
});
//=============CREATE AUTHENTICATION SLICE=================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
  },
  reducers: {
    onLogin: (state) => {
      state.auth = true;
    },
    onLogout: (state) => {
      state.auth = false;
    },
  },
});
//============CREATE CART SLICE=====================
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      const pos = state.cart.findIndex((x) => {
        return x.item._id === action.payload.item._id;
      });
      if (pos !== -1) {
        state.cart[pos].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    deleteCart: (state, action) => {
      const pos = state.cart.findIndex((x) => {
        return x.item._id === action.payload._id;
      });
      state.cart.splice(pos, 1);
    },
    increase: (state, action) => {
      const pos = state.cart.findIndex((x) => {
        return x.item._id === action.payload;
      });
      state.cart[pos].quantity += 1;
    },
    decrea: (state, action) => {
      const pos = state.cart.findIndex((x) => {
        return x.item._id === action.payload;
      });
      state.cart[pos].quantity -= 1;
    },
  },
});
//=============CREATE STORE==================
const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
//===============EXPORT ALL ACTIONS================
export const { showPopup, hidePopup } = popupSlice.actions;
export const { onLogin, onLogout } = authSlice.actions;
export const { addCart, deleteCart, updateCart, increase, decrea } =
  cartSlice.actions;
export default store;
