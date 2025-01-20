import express from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Fetch Pokémon data from the API
app.get('/api/pokemons', async (req, res) => {
  const { page = 1 } = req.query;
  const pokemonData = [];

  try {
    for (let i = (page - 1) * 20 + 1; i <= page * 20; i++) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonData.push(response.data);
    }
    res.json(pokemonData);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).send({ message: 'Error fetching Pokémon data', error: error.message }); // More descriptive error message
  }
});

// Catch-all handler for all other requests (React routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
