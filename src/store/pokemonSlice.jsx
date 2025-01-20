import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemon } from '../components/pokemonApi';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (page) => {
    const pokemonData = [];
    for (let i = (page - 1) * 20 + 1; i <= page * 20; i++) {
      const data = await getPokemon(i);
      if (data) pokemonData.push(data);
    }
    return pokemonData;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    filteredPokemons: [],
    page: 1,
    searchQuery: '',
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredPokemons = state.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        const newPokemons = [...state.pokemons, ...action.payload];
        const uniquePokemons = Array.from(new Map(newPokemons.map(p => [p.id, p])).values());
        state.pokemons = uniquePokemons;
        state.filteredPokemons = uniquePokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        state.hasMore = action.payload.length > 0; // Set hasMore based on the fetched data
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, incrementPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;