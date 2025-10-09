import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

function MovieForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState({
    title: '',
    release_year: '',
    director: '',
    genre: '',
    rating: '',
    duration_minutes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)

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
    const NumericReleaseYear = Number(form.release_year);
    const NumericRating = Number(form.rating);
    const NumericDurationMinutes = Number(form.duration_minutes);

    if (!form.title || form.title.trim() === '') {
      newErrors.title = 'Title wajib diisi';
    }

    if (form.release_year !== '') {
      if (!Number.isFinite(NumericReleaseYear) || !(NumericReleaseYear >= 1878 && NumericReleaseYear <= 2050)) {
        newErrors.release_year = 'Tahun rilis harus berupa angka valid dan diantara tahun 1878 - 2050';
      }
    }

    if (form.rating !== '') {
      if (!Number.isFinite(NumericRating) || !(NumericRating >= 0 && NumericRating <= 10)) {
        newErrors.rating = 'Rating harus berupa angka valid dan diantara 0 sampai 10';
      }
    }

    if (form.duration_minutes !== '') {
      if (!Number.isFinite(NumericDurationMinutes) || !(NumericDurationMinutes >= 0 && NumericDurationMinutes <= 51420)) {
        newErrors.duration_minutes = 'Durasi harus berupa angka valid dan tidak lebih dari 857jam';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      release_year: form.release_year !== '' ? Number(form.release_year) : undefined,
      rating: form.rating !== '' ? Number(form.rating) : undefined,
      duration_minutes: form.duration_minutes !== '' ? Number(form.duration_minutes) : undefined,
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Masukan Title" value={form.title} onChange={handleChange} isInvalid={!!errors.title} />
        {errors.title && <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tahun Rilis</Form.Label>
        <Form.Control name="release_year" type="number" placeholder="Masukan tahun rilis" value={form.release_year} onChange={handleChange} isInvalid={!!errors.release_year} />
        {errors.release_year && <Form.Control.Feedback type="invalid">{errors.release_year}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sutradara</Form.Label>
        <Form.Control name="director" type="text" placeholder="Masukan Sutradara" value={form.director} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control name="genre" type="text" placeholder="Masukan Genre" value={form.genre} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control name="rating" type="number" min="0" max="10" step="0.1" value={form.rating} placeholder="Masukan Rating" onChange={handleChange} isInvalid={!!errors.rating} />
        {errors.rating && <Form.Control.Feedback type="invalid">{errors.rating}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Durasi</Form.Label>
        <Form.Control name="duration_minutes" type="number" min="1" max="51420" value={form.duration_minutes} placeholder="Masukan Durasi" onChange={handleChange} isInvalid={!!errors.duration_minutes} />
        {errors.duration_minutes && <Form.Control.Feedback type="invalid">{errors.duration_minutes}</Form.Control.Feedback>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {buttonText}
      </Button>

      {Object.keys(errors).length > 0 && (
        <Alert variant='danger' className='mt-3'>
            Periksa kembali inputan anda: {Object.keys(errors).join(', ')}
        </Alert>
      )}
    </Form>
  );
}

export default MovieForm;
