import React from 'react';
import axios from 'axios';
import MovieForm from '../components/MovieForm';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddMovie() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  async function handleAdd(data) {
    try {
        setLoading(true)
        await axios.post('http://localhost:4000/api/movie', data);
        navigate('/');
    } catch (error) {
        alert('Gagal menambahkan movie')
    } finally {
        setLoading(false)
    }
  }
  return (
    <Card>
      <div className='ms-3 me-3 mb-3 mt-3'>
        <h3>➕ Tambah Movie</h3>
        <MovieForm onSubmit={handleAdd} buttonText={loading ? 'Sedang Menyimpan Movie...' : 'Tambah Movie'} disabled={loading} />
      </div>
    </Card>
  );
}

export default AddMovie; 