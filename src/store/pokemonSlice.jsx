import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch Pokémon with ID ${id}:`, error);
    return null;
  }
};

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
        state.pokemons = Array.from(new Set(newPokemons.map(p => p.id)))
          .map(id => newPokemons.find(p => p.id === id));
        state.filteredPokemons = state.pokemons.filter(pokemon => 
          pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch Pokémon data';
      });
  },
});

export const { setSearchQuery, incrementPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;