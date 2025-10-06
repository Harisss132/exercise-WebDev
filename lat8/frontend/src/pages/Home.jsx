import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  async function getBooks() {
    const res = await axios.get('http://localhost:4000/api/book');
    setBooks(res.data);
  }

  async function deleteBook(id) {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      await axios.delete(`http://localhost:4000/api/book/${id}`);
      getBooks();
    }
  }

  useEffect(function () {
    getBooks();
  }, []);

  const filteredBooks = books.filter(function (b) {
    return b.book_name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <h3>📚 Daftar Buku</h3>

      <div className="d-flex align-items-center gap-3 mb-3">
        <Form.Control
          placeholder="Cari judul buku..."
          value={query}
          onChange={function (e) {
            setQuery(e.target.value);
          }}
        />
        <Button
          onClick={function () {
            navigate('/add');
          }}
          className="flex-shrink-0"
        >
          Tambah Buku
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Genre</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(function (b, i) {
            return (
              <tr key={b.book_id}>
                <td>{i + 1}</td>
                <td>{b.book_name}</td>
                <td>{b.genre}</td>
                <td>{b.price}</td>
                <td>{b.stock}</td>
                <td>
                  <Link to={`/book/${b.book_id}`} className="btn btn-info btn-sm me-2">
                    Detail
                  </Link>
                  <Link to={`/edit/${b.book_id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={function () {
                      deleteBook(b.book_id);
                    }}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
