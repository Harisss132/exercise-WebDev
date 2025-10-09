import React from 'react';
import axios from 'axios';
import MovieForm from '../components/MovieForm';
import { Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/movie/${id}`);
        setMovie(res.data);
      } catch (error) {
        alert('Gagal mengambil data movie');
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  async function handleUpdate(data) {
    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/api/movie/${id}`, data);
      navigate('/');
    } catch (error) {
      alert('Gagal memperbarui movie');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p>Memuat data movie...</p>;
  return (
    <Card>
      <div className='ms-3 me-3 mb-3 mt-3'>
        <h3>✏️ Edit Movie</h3>
        <MovieForm initialData={movie} onSubmit={handleUpdate} buttonText={loading ? 'Sedang Menyimpan Perubahan...' : 'Simpan Perubahan'} disabled={loading}/>
      </div>
    </Card>
  );
}

export default EditMovie;
