// file untuk membuat server express
const express = require("express");
// install yarn add cors
let cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authsRoutes = require("./src/routes/auths");
const blogsRoutes = require("./src/routes/blogs");
// const router = express.Router();

// router.use("/product", (req, res, next) => {
//   res.json({
//     nama: "anwar",
//     email: "anwarsanusisan@gmail.com",
//   });
//   next();
// });

// router.use("/price", (req, res, next) => {
//   res.json({
//     price: 2000,
//   });
//   next();
// });

// // kita juga bisa membuat endpoint api dengan nethod spesifik
// router.get("/users", (req, res, next) => {
//   res.json({
//     username: "sans",
//     password: "mdjahdsajkhdia",
//   });
//   next();
// });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ketika mengakses localhost:4000 maka akan diarahkan ke app.use ke url '/' dan memanggil router
app.use("/v1/blog", blogsRoutes);
app.use("/v1/auth", authsRoutes);

mongoose
  .connect(
    "mongodb+srv://Admin:Admin@cluster0.otfug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, console.log("berhasil terhubung di mongodb"));
  })
  .catch((err) => console.log("err: ", err));
