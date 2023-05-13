import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  subtotal: 0,
  booksToShow: [],
  libraryBooksToShow: [],
  libraryBooksToShowCopy: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    increaseSubTotal(state, payload) {
      state.subtotal += payload.payload;
    },
    decreaseSubTotal(state, payload) {
      state.subtotal -= payload.payload;
    },
    changeBooks(state, payload) {
      state.booksToShow = payload.payload;
    },
    changeBooksLibrary(state, payload) {
      state.libraryBooksToShow = payload.payload;
    },
    changeBooksLibraryCopy(state, payload) {
      state.libraryBooksToShowCopy = payload.payload;
    },
    emptyCart(state) {
      state.booksToShow = [];
    },
  },
});

export const cartActions = cartSlice.actions;
