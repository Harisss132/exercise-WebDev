import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(
    function () {
      axios.get(`http://localhost:4000/api/book/${id}`).then(function (res) {
        setBook(res.data);
      });
    },
    [id]
  );

  if (!book) return <p>Loading...</p>;

  return (
    <Card>
      <Card.Header><h3>{book.book_name}</h3></Card.Header>
      <Card.Body>
        <p>
          <strong>Genre: </strong>
          {book.genre}
        </p>
        <p>
          <strong>Price: </strong>
          {book.price}
        </p>
        <p>
          <strong>Stock: </strong>
          {book.stock}
        </p>
        <p>
          <strong>Deskripsi: </strong>
          {book.description}
        </p>
        <Button
          variant="secondary"
          onClick={function () {
            navigate('/');
          }}
        >
          Kembali
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookDetail;
