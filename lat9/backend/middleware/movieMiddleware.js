exports.validateDataMovie = (req, res, next) => {
  const { title, release_year, rating, duration_minutes } = req.body;
  const NumericReleaseYear = Number(release_year);
  const NumericRating = Number(rating);
  const NumericDurationMinutes = Number(duration_minutes);

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title wajib diisi' });
  }

  if (release_year !== undefined && release_year !== null && release_year !== '') {
    if (!Number.isFinite(NumericReleaseYear) || !(NumericReleaseYear >= 1878 && NumericReleaseYear <= 2050)) {
      return res.status(400).json({ message: 'Tahun rilis harus berupa angka valid dan di antara 1878 - 2050' });
    }
  }

  if (rating !== undefined && rating !== null && rating !== '') {
    if (!Number.isFinite(NumericRating) || !(NumericRating >= 0 && NumericRating <= 10)) {
      return res.status(400).json({ message: 'Rating harus berupa angka valid dan di antara 0 - 10' });
    }
  }

  if (duration_minutes !== undefined && duration_minutes !== null && duration_minutes !== '') {
    if (!Number.isFinite(NumericDurationMinutes) || !(NumericDurationMinutes >= 0 && NumericDurationMinutes <= 51420)) {
      return res.status(400).json({ message: 'Durasi harus berupa angka valid dan tidak minus serta masuk akal' });
    }
  }

  next();
};
