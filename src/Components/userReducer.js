import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: null,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      state.name = action.payload.name
    },
    clearUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.name = null
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
