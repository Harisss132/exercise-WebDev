import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

function BookForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState({
    book_name: '',
    genre: '',
    price: '',
    stock: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(
    function () {
      if (initialData) {
        setForm(initialData);
      }
    },
    [initialData]
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    const priceNumber = Number(form.price);
    const stockNumber = Number(form.stock);

    if (!form.book_name || form.book_name.trim() === '') {
      newErrors.book_name = 'Judul buku tidak boleh kosong';
    }

    if (!priceNumber || !Number.isFinite(priceNumber) || priceNumber < 0) {
      newErrors.price = 'Harga harus diisi dan berupa angka valid';
    }

    if (!stockNumber || !Number.isFinite(stockNumber) || stockNumber < 0) {
      newErrors.stock = 'Stok harus diisi dan berupa angka valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Judul Buku</Form.Label>
        <Form.Control name="book_name" type="text" value={form.book_name} onChange={handleChange} isInvalid={!!errors.book_name} />
        {errors.book_name && <Form.Control.Feedback type="invalid">{errors.book_name}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control name="genre" type="text" value={form.genre} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga Buku</Form.Label>
        <Form.Control name="price" type="number" value={form.price} onChange={handleChange} isInvalid={!!errors.price} />
        {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stok Buku</Form.Label>
        <Form.Control name="stock" type="number" value={form.stock} onChange={handleChange} isInvalid={!!errors.stock} />
        {errors.stock && <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control name="description" as="textarea" rows={3} value={form.description} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        {buttonText}
      </Button>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Periksa kembali input yang belum benar
        </Alert>
      )}
    </Form>
  );
}

export default BookForm;
