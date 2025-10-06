exports.validateBookData = async(req, res, next) => {
    const { book_name, price, stock} = req.body;
    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if(!book_name || book_name.trim() === '') {
        res.status(404).json({ message: 'Nama buku tidak boleh kosong'});
    }

    if(!price || !Number.isFinite(numericPrice) || numericPrice < 0) {
        res.status(404).json({ message: 'price harus diisi dan berupa angka valid'});
    }

    if(!stock || !Number.isFinite(numericStock) || numericStock < 0) {
        res.status(404).json({ message: 'stock harus diisi dan berupa angka valid'});
    }

    next();
}