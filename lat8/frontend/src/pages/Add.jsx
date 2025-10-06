import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { Card } from 'react-bootstrap';

function AddBook() {
  const navigate = useNavigate();

  async function handleAdd(data) {
    await axios.post('http://localhost:4000/api/book', data);
    navigate('/');
  }

  return (
    <Card>
      <div className='ms-3 me-3 mt-3 mb-3'>
        <h3>➕ Tambah Buku</h3>
        <BookForm onSubmit={handleAdd} buttonText={'Tambah Buku'}/>
      </div>
    </Card>
  );
}

export default AddBook;
