import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser } from './userReducer.js';



const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Save the user state to local storage whenever it changes
store.subscribe(() => {
  const { user } = store.getState();
  const { isLoggedIn, userData, showCreateFeed } = user;
  try {
    localStorage.setItem('user', JSON.stringify({ isLoggedIn, userData, showCreateFeed }));
  } catch (error) {
    console.log(`Problem setItem localStorage: ${error}`)
  }});

// Rehydrate the user state from local storage
try {
  const persistedUserState = localStorage.getItem('user');
  if (persistedUserState) {
    const { isLoggedIn, userData } = JSON.parse(persistedUserState);
    if (isLoggedIn) {
      store.dispatch(setUser(userData));
    } 
  }
} catch (error) {
  console.log(`Problem getItem localStorage: ${error}`)
}

export default store;
