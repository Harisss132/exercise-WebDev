import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getMahasiswas() {
    try {
      const res = await axios.get('http://localhost:4000/api/mahasiswa');
      setMahasiswas(res.data);
    } catch (error) {
      alert('Gagal mendapatkan data mahasiswa, periksa backend');
    } finally {
      setLoading(false);
    }
  }

  async function deleteMahasiswa(id) {
    if (confirm('Yakin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:4000/api/mahasiswa/${id}`);
        getMahasiswas();
      } catch (error) {
        alert('Gagal menghapus data mahasiswa');
      }
    }
  }

  useEffect(function () {
    getMahasiswas();
  }, []);

  const filteredMahasiswa = mahasiswas.filter(function (m) {
    return m.nama_mahasiswa.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className='mt-5'>
      <h3>🏫 Daftar Mahasiswa</h3>
      <div className="d-flex align-items-center gap-3 mb-3">
        <Form.Control
          placeholder="Masukan nama mahasiswa"
          value={query}
          onChange={function (e) {
            setQuery(e.target.value);
          }}
        />
        <Button
          className="flex-shrink-0"
          onClick={function () {
            navigate('/add');
          }}
        >
          Tambah Mahasiswa
        </Button>
      </div>
      {loading ? (
        <p>Memuat Data Mahasiswa...</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>NO</th>
              <th>NIM</th>
              <th>Nama Mahasiswa</th>
              <th>Email Mahasiswa</th>
              <th>Nomor Telpon</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMahasiswa.length > 0 ? (
              filteredMahasiswa.map((m, i) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td>{m.nim}</td>
                  <td>{m.nama_mahasiswa}</td>
                  <td>{m.email_mahasiswa}</td>
                  <td>{m.nomor_telpon}</td>
                  <td>{m.alamat}</td>
                  <td>
                    <Link to={`/edit/${m.id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={function () {
                        deleteMahasiswa(m.id);
                      }}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Tidak ada data mahasiswa ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default HomePage;
