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
  console.log(user)
  const { isLoggedIn, userData } = user;
  localStorage.setItem('user', JSON.stringify({ isLoggedIn, userData }));
});

// Rehydrate the user state from local storage
const persistedUserState = localStorage.getItem('user');
if (persistedUserState) {
  const { isLoggedIn, userData } = JSON.parse(persistedUserState);
  if (isLoggedIn) {
    store.dispatch(setUser(userData));
  } 
}

export default store;
