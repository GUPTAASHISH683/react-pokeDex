import React, { forwardRef } from 'react';

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#F4E7DA',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#dfa7df',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const main_types = Object.keys(colors);

const PokemonCard = forwardRef(({ pokemon }, ref) => {
  console.log("Rendering Pokémon Card:", pokemon); // Log the Pokémon data

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');
  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  const imgURL = pokemon.sprites?.other['official-artwork']?.front_default || 'https://via.placeholder.com/120?text=No+Image';

  return (
    <div className="pokemon" style={{ backgroundColor: color }} ref={ref}>
      <div className="img-container">
        <img src={imgURL} alt={name} />
      </div>
      <div className="info">
        <span className="number">#{id}</span>
        <h3 className="name">{name}</h3>
        <small className="type">
          Type: <span>{type}</span>
        </small>
      </div>
    </div>
  );
});

export default PokemonCard;