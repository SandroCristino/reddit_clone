import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: null,
  userData: null,
  showCreateFeed: false,
  loading: true,
  loadedObjects: 0,
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
    setShowCreateFeed: (state, action) => {
      state.showCreateFeed = action.payload
    },
    setLoading: (state, action) => {
      state.loading = state.loading = false
    },
    setLoadedObjects: (state, action) => {
      state.loadedObjects = action.payload
    }
  },
});



export const { setUser, clearUser, setShowCreateFeed, setLoading, setLoadedObjects } = userSlice.actions;
export default userSlice.reducer
