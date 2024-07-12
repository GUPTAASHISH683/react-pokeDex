import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, lastPokemonElementRef }) => {
  return (
    <div className="container">
      {pokemons.map((pokemon, index) => {
        if (pokemons.length === index + 1) {
          return <PokemonCard ref={lastPokemonElementRef} key={pokemon.id} pokemon={pokemon} />;
        } else {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        }
      })}
    </div>
  );
};

export default PokemonList;
