import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PhoneNumberUtil } from 'google-libphonenumber';
function MahasiswaForm({ initialData, onSubmit, buttonText, disabled }) {
    const phoneUtil = PhoneNumberUtil.getInstance();
  const [form, setForm] = useState({
    nim: '',
    nama_mahasiswa: '',
    email_mahasiswa: '',
    nomor_telpon: '',
    alamat: '',
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
    let newErrors = {};
    const numericNim = Number(form.nim);

    if (!form.nim || !Number.isFinite(numericNim) || numericNim <= 0 || form.nim.length <= 5 || form.nim.length >= 18) {
      newErrors.nim = 'NIM wajib diisi dan harus berupa angka valid dan lebih dari 5 maks 18';
    }

    if (!form.nama_mahasiswa.trim()) {
      newErrors.nama_mahasiswa = 'Nama mahasiswa wajib diisi';
    }

    if (!form.email_mahasiswa.trim() || !form.email_mahasiswa.includes('@')) {
      newErrors.email_mahasiswa = 'Email mahasiswa wajib diisi dan harus menggunakan @';
    }

    if (form.nomor_telpon) {
      try {
        const number = phoneUtil.parse(form.nomor_telpon, 'ID');
        if (!phoneUtil.isValidNumber(number)) {
          newErrors.nomor_telpon = 'Nomor telpon harus nomor indonesia';
        }
      } catch (error) {
        newErrors.nomor_telpon = 'Format nomor telpon salah';
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
      nomor_telpon: form.nomor_telpon ? form.nomor_telpon : undefined,
      alamat: form.alamat ? form.alamat : undefined,
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nim Mahasiswa</Form.Label>
        <Form.Control name="nim" type="number" placeholder="Masukan Nim" value={form.nim} onChange={handleChange} isInvalid={!!errors.nim} />
        {errors.nim && <Form.Control.Feedback type="invalid">{errors.nim}</Form.Control.Feedback>}
      </Form.Group>

     <Form.Group className="mb-3">
        <Form.Label>Nama Mahasiswa</Form.Label>
        <Form.Control name="nama_mahasiswa" type="text" placeholder="Masukan Nama" value={form.nama_mahasiswa} onChange={handleChange} isInvalid={!!errors.nama_mahasiswa} />
        {errors.nama_mahasiswa && <Form.Control.Feedback type="invalid">{errors.nama_mahasiswa}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email_mahasiswa" type="email" placeholder="Masukan Email" value={form.email_mahasiswa} onChange={handleChange} isInvalid={!!errors.email_mahasiswa} />
        {errors.email_mahasiswa && <Form.Control.Feedback type="invalid">{errors.email_mahasiswa}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nomor Telpon</Form.Label>
        <Form.Control name="nomor_telpon" type="tel" placeholder="Masukan Nomor Telpon" value={form.nomor_telpon} onChange={handleChange} isInvalid={!!errors.nomor_telpon} />
        {errors.nomor_telpon && <Form.Control.Feedback type="invalid">{errors.nomor_telpon}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Alamat</Form.Label>
        <Form.Control name="alamat" as="textarea" rows={3} placeholder="Masukan Alamat" value={form.alamat} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={disabled}>
        {buttonText}
      </Button>
    </Form>
  );
}

export default MahasiswaForm;