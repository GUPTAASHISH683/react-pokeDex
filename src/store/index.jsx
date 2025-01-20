import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Optional: Disable serializability check if needed
    }),
});

export default store;
