const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())
app.use('/api/book', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server berjalan pada localhost:${PORT}`)
})