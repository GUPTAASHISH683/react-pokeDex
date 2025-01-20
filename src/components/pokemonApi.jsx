import axios from 'axios';

export const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch Pokémon with ID ${id}:`, error);
    return null; // Return null on error to prevent adding undefined Pokémon
  }
};