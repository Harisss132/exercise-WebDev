import React from 'react';
import MahasiswaForm from '../components/mahasiswaForm';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleAdd(data) {
    try {
      setLoading(true);
      await axios.post('http://localhost:4000/api/mahasiswa', data);
      navigate('/');
    } catch (error) {
      alert('Gagal menambahkan data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mt-3'>
      <div className='me-3 ms-3 mt-3 mb-3'>
        <h3>➕ Tambah Mahasiswa</h3>
        <MahasiswaForm onSubmit={handleAdd} buttonText={loading ? 'Sedang menyimpan mahasiswa' : 'Tambah Mahasiswa'} disabled={loading} />
      </div>
    </Card>
  );
}

export default AddPage;
