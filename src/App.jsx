import React, { useEffect, useRef, useCallback } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import SearchBox from './components/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, incrementPage } from './store/pokemonSlice';

const App = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.pokemon.searchQuery);
  const filteredPokemons = useSelector(state => state.pokemon.filteredPokemons);
  const loading = useSelector(state => state.pokemon.loading);
  const hasMore = useSelector(state => state.pokemon.hasMore);
  const page = useSelector(state => state.pokemon.page);
  const observer = useRef();

  // Fetch Pokémon data when the page changes
  useEffect(() => {
    if (loading || !hasMore) return; // Prevent unnecessary API calls
    dispatch(fetchPokemons(page));
  }, [page]); // Only re-run when `page` changes

  // Infinite scroll logic
  const lastPokemonElementRef = useCallback(
    node => {
      if (loading || !hasMore) return; // Prevent unnecessary API calls
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage()); // Increment the page
        }
      });

      if (node) observer.current.observe(node); // Observe the last Pokémon element
    },
    [loading, hasMore, dispatch]
  );

  return (
    <>
      <div className="header">
        <h1>POKEDEX</h1>
        <SearchBox searchQuery={searchQuery} />
      </div>
      <PokemonList pokemons={filteredPokemons} lastPokemonElementRef={lastPokemonElementRef} />
      {loading && <div className="loading">Loading...</div>}
      {!hasMore && !loading && <div className="loading">No more Pokémon to load</div>}
    </>
  );
};

export default App;