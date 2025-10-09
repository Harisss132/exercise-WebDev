const { PhoneNumberUtil } = require('google-libphonenumber');

exports.validateDataMahasiswa = (req, res, next) => {
  const { nim, nama_mahasiswa, email_mahasiswa, nomor_telpon } = req.body;
  const phoneUtil = PhoneNumberUtil.getInstance();
  const numericNim = Number(nim);

  if (!nim || nim.toString().trim() === '' ||!Number.isFinite(numericNim) || numericNim < 0) {
    return res.status(400).json({ message: 'NIM wajib diisi dan harus berupa angka valid' });
  }

  if (!nama_mahasiswa || nama_mahasiswa.trim() === '') {
    return res.status(400).json({ message: 'Nama mahasiswa wajib diisi' });
  }

  if (!email_mahasiswa || email_mahasiswa.trim() === '' || !email_mahasiswa.includes('@')) {
    return res.status(400).json({ message: 'Email mahasiswa wajib diisi dan harus menggunakan @' });
  }

  if (nomor_telpon) {
    try {
      const number = phoneUtil.parse(nomor_telpon, 'ID');
      if (!phoneUtil.isValidNumber(number)) {
        return res.status(400).json({ message: 'Nomor telpon harus nomor indonesia' });
      }
      req.body.nomor_telpon = phoneUtil.format(number, 1);
    } catch (error) {
        console.error('Format nomor telpon salah', error);
        return res.status(400).json({message: 'Format nomor telpon salah'})
    }
  }

  next();
};
