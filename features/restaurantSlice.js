import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
};

export const basketSlice = createSlice({
  name: "restuarant",
  initialState,
  reducers: {
    setRestuarant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestuarant } = restuarantSlice.actions;

export const selectRestuarant = (state) => state.restuarant.restuarant;

export default restuarantSlice.reducer;
