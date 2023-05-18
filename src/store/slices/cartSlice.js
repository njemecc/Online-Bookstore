import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  subtotal: 0,
  booksToShow: [],
  libraryBooksToShow: [],
  libraryBooksToShowCopy: [],
  didThisUserRated: false,
  numberOfRaters: 0,
  sumOfRatings: 0,
  StarsValue: 0,
  modalOpen: false,
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
    changeDidUserRated(state) {
      state.didThisUserRated = !state.didThisUserRated;
    },
    setNumerOfRaters(state, payload) {
      state.numberOfRaters = payload.payload;
    },
    setSumOfRatings(state, payload) {
      state.sumOfRatings += payload.payload;
    },
    setStarsValue(state) {
      state.StarsValue = state.sumOfRatings / state.numberOfRaters;
    },
    setModalOpenTrue(state) {
      state.modalOpen = true;
    },
    setModalOpenFalse(state) {
      state.modalOpen = false;
    },
  },
});

export const cartActions = cartSlice.actions;
