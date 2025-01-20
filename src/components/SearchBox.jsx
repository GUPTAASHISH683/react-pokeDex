import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/pokemonSlice';

const SearchBox = ({ searchQuery }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <input
      type="text"
      value={searchQuery}  // Bind the input value to the searchQuery from Redux
      placeholder="Search Pokémon"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;