import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/pokemonSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.pokemon.searchQuery);

  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchBox;