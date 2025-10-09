const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mahasiswaRoutes = require('./routes/mahasiswaRoutes')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api/mahasiswa', mahasiswaRoutes)

app.listen(PORT, () => {
    console.log(`Server berjalan pada localhost:${PORT}`);
})