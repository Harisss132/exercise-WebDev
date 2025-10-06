const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.getAllBooks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books');
        res.json(rows);
    } catch (error) {
        console.error('Gagal mendapatkan data');
        res.status(500).json({ message: 'Server Error'})
    }
}

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);
        if(rows.length === 0) {
           return res.status(404).json({ message: 'Buku tidak ditemukan'})
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Gagal mendapatkan data', error);
        res.status(500).json({ message: 'Server Error'})
    }
}

exports.createBook = async (req, res) => {
    const { book_name, genre, price, stock, description } = req.body;
    const newId = uuidv4();
    try {
        const [result] = await pool.query('INSERT INTO books (book_id, book_name, genre, price, stock, description) VALUES (?, ?, ?, ?, ?, ?)', [newId, book_name, genre, price, stock, description]);
        res.status(201).json({ id: newId, message: 'Data berhasil ditambahkan'})
    } catch (error) {
        console.error('Gagal mendapatkan data', error);
        res.status(500).json({ message: 'Server Error'})
    }
}

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { book_name, genre, price, stock, description } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE books SET book_name = ?, genre = ?, price = ?, stock = ?, description = ? WHERE book_id = ?',
      [book_name, genre, price, stock, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book tidak ditemukan' });
    }

    res.json({ message: 'Book berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal memperbarui data', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM books WHERE book_id = ?', [id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Buku tidak ditemukan'})
        }
        res.json({ message: 'Book berhasil dihapus'})
    } catch (error) {
        console.error('Gagal mendapatkan data', error);
        res.status(500).json({ message: 'Server Error'})
    }
}