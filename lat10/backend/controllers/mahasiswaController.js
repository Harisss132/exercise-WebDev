const pool = require('../config/db');

exports.getAllMahasiswa = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mahasiswa');
        return res.json(rows);
    } catch (error) {
        console.error('Gagal mendapatkan data mahasiswa', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.getMahasiswaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM mahasiswa WHERE id = ?', [id]);
        if(rows.length === 0) {
            return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan'});
        }
        return res.json(rows[0])
    } catch (error) {
        console.error('Gagal mendapatkan data mahasiswa by id', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.createMahasiswa = async (req, res) => {
    const { nim, nama_mahasiswa, email_mahasiswa, nomor_telpon, alamat } = req.body
    try {
        const [result] = await pool.query('INSERT INTO mahasiswa (nim, nama_mahasiswa, email_mahasiswa, nomor_telpon, alamat) VALUES (?, ?, ?, ?, ?)', [nim, nama_mahasiswa, email_mahasiswa, nomor_telpon, alamat]);
        return res.status(201).json({ id: result.insertId, data: {nim, nama_mahasiswa}, message: 'Mahasiswa Berhasil di tambahkan'});
    } catch (error) {
        console.error('Gagal menambahkan data mahasiswa', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.updateMahasiswa = async (req, res) => {
    const { id } = req.params;
    const { nim, nama_mahasiswa, email_mahasiswa, nomor_telpon, alamat } = req.body
    try {
        const [result] = await pool.query('UPDATE mahasiswa SET nim = ?, nama_mahasiswa = ?,email_mahasiswa = ?, nomor_telpon = ?, alamat = ? WHERE id = ?', [nim, nama_mahasiswa, email_mahasiswa, nomor_telpon, alamat, id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan'})
        }
        return res.json({message: 'Mahasiswa berhasil diperbarui'})
    } catch (error) {
        console.error('Gagal memperbarui data mahasiswa', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
};

exports.deleteMahasiswa = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'Data mahasiswa tidak ditemukan'});
        }
        return res.json({ message: 'Mahasiswa berhasil dihapus'})
    } catch (error) {
        console.error('Gagal menghapus data mahasiswa', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
};