import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import PokemonList from './components/PokemonList';
import SearchBox from './components/SearchBox';
import { fetchPokemons, incrementPage } from './store/pokemonSlice';

const App = () => {
  const dispatch = useDispatch();
  const { filteredPokemons, loading, error, hasMore, page } = useSelector(state => state.pokemon);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchPokemons(page));
  }, [dispatch, page]);

  const lastPokemonElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(incrementPage());
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, dispatch]);

  return (
    <div className="App">
      <div className="header">
        <h1>POKEDEX</h1>
        <SearchBox />
      </div>
      {error && <div className="error">{error}</div>}
      <PokemonList pokemons={filteredPokemons} lastPokemonElementRef={lastPokemonElementRef} />
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;