import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { Card } from 'react-bootstrap';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(
    function () {
      axios.get(`http://localhost:4000/api/book/${id}`).then(function (res) {
        setBook(res.data);
      });
    },
    [id]
  );

  async function handleUpdate(data) {
    await axios.put(`http://localhost:4000/api/book/${id}`, data);
    navigate('/');
  }

  if (!book) return <p>Loading...</p>;

  return (
    <Card>
      <div className="ms-3 me-3 mt-3 mb-3">
        <h3>✏️ Edit Buku</h3>
        <BookForm initialData={book} onSubmit={handleUpdate} buttonText={'Simpan Perubahan'} />
      </div>
    </Card>
  );
}

export default EditBook;
