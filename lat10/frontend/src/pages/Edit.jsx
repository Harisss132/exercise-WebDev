import React from 'react';
import MahasiswaForm from '../components/mahasiswaForm';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState([null]);
  const [loading, setLoading] = useState(false);
  const[fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/mahasiswa/${id}`);
        setMahasiswa(res.data);
      } catch (error) {
        alert('Gagal mengambil data mahasiswa');
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  async function handleEdit(data) {
    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/api/mahasiswa/${id}`, data);
      navigate('/');
    } catch (error) {
      alert('Gagal memperbarui data!');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p>Memuat data...</p>;

  return (
    <Card className='mt-3'>
      <div className='me-3 ms-3 mb-3 mt-3'>
        <h3>✏️ Edit Mahasiswa</h3>
        <MahasiswaForm initialData={mahasiswa} onSubmit={handleEdit} buttonText={loading ? 'Sedang memperbarui mahasiswa' : 'Simpan Perubahan'} disabled={loading} />
      </div>
    </Card>
  );
}

export default EditPage;
