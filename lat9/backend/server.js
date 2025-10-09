const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api/movie', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server berjalan pada localhost:${PORT}`)
});