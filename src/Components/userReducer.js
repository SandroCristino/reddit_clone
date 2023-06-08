import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: null,
  userData: null,
  showCreateFeed: false,
  loading: true,
  loadedObjects: 0,
  sorting: 'Any',
  searchInput: '',
  searchInputSpan: '',
  runFilterFromSearchBar: false,
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
      state.loading = action.payload
    },
    setLoadedObjects: (state, action) => {
      state.loadedObjects = action.payload
    },
    setSorting: (state, action) => {
      state.sorting = action.payload
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload
    }, 
    setSearchInputSpan: (state, action) => {
      state.searchInputSpan = action.payload
    }, 
    setRunFilterFromSearchBar: (state, action) => {
      state.runFilterFromSearchBar = action.payload
    }, 
    setUserName: (state, action) => {
      state.name = action.payload
    }
  },
});



export const { 
  setUser, 
  clearUser, 
  setShowCreateFeed, 
  setLoading, 
  setLoadedObjects,
  setSorting, 
  setSearchInput,
  setSearchInputSpan,
  setRunFilterFromSearchBar,
  setUserName,
} = userSlice.actions;

export default userSlice.reducer
