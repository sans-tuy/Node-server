exports.getProduct = (req, res, next) => {
  res.json({
    message: "Berhasil memanggil data",
    data: [
      {
        id: 1,
        nama: "laptop",
        qty: 90,
      },
      {
        id: 2,
        nama: "smartphone",
        qty: 80,
      },
    ],
  });
  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};

exports.createProduct = (req, res, next) => {
  res.json({
    message: "berhasil create product",
    data: {
      id: 3,
      nama: "Layar desktop",
      qty: 80,
    },
  });
  next();
};
