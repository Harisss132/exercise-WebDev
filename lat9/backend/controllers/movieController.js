const pool = require('../config/db');

exports.getAllMovies = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM movies');
        return res.json(rows);
    } catch (error) {
        console.error('Gagal mendapatkan movies', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [id]);
        if(rows.length === 0) {
            return res.status(404).json({ message: 'Movie tidak ditemukan'})
        }
        return res.json(rows[0]);
    } catch (error) {
        console.error('Gagal mendapatkan movie by id', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};

exports.createMovie = async (req, res) => {
    const { title, release_year, director, genre, rating, duration_minutes} = req.body;
    try {
        const [result] = await pool.query('INSERT INTO movies (title, release_year, director, genre, rating, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)', [title, release_year, director, genre, rating, duration_minutes]);
        return res.status(201).json({ id: result.insertId, message: 'Movie berhasil ditambahkan'});
    } catch (error) {
        console.error('Gagal menambahkan movie', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};

exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, release_year, director, genre, rating, duration_minutes} = req.body;
    try {
        const [result] = await pool.query('UPDATE movies SET title = ?, release_year = ?, director = ?, genre = ?, rating = ?, duration_minutes = ? WHERE movie_id = ?', [title, release_year, director, genre, rating, duration_minutes, id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie tidak ditemukan'})
        }
        return res.json({ message: 'Movie berhasil diperbarui'})
    } catch (error) {
        console.error('Gagal memperbarui movie', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM movies WHERE movie_id = ?', [id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie tidak ditemukan'})
        }
        return res.json({ message: 'Movie berhasil dihapus'});
    } catch (error) {
        console.error('Gagal menghapus movie', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};