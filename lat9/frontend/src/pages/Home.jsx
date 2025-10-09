import React from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getMovies() {
    try {
      const res = await axios.get('http://localhost:4000/api/movie');
      setMovies(res.data);
    } catch (error) {
      alert('Gagal mendapatkan movie, coba periksa backend');
    } finally {
      setLoading(false);
    }
  }

  async function deleteMovie(id) {
    if (confirm('Yakin ingin menghapus movie ini?')) {
      try {
        await axios.delete(`http://localhost:4000/api/movie/${id}`);
        getMovies();
      } catch (error) {
        alert('Gagal menghapus movie..');
      }
    }
  }

  useEffect(function () {
    getMovies();
  }, []);

  const filteredMovies = movies.filter(function (m) {
    return m.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <h3>🎞️ Daftar Film</h3>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Form.Control
          placeholder="Masukan title..."
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
          Tambah Movie
        </Button>
      </div>
      {loading ? (
        <p>Memuat data movie...</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Tahun Rilis</th>
              <th>Sutradara</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Durasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((m) => (
                <tr key={m.movie_id}>
                  <td>{m.movie_id}</td>
                  <td>{m.title}</td>
                  <td>{m.release_year}</td>
                  <td>{m.director}</td>
                  <td>{m.genre}</td>
                  <td>{m.rating}</td>
                  <td>{m.duration_minutes}</td>
                  <td>
                    <Link to={`/edit/${m.movie_id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={function () {
                        deleteMovie(m.movie_id);
                      }}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  Tidak ada film ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Home;
