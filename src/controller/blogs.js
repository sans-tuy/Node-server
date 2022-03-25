const { validationResult } = require("express-validator");
const blogPost = require("../models/blog");

exports.postBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;
  const error = validationResult(req);

  // body request dari blogPost
  const Post = new blogPost({
    title: title,
    body: body,
    image: req.file.path,
    author: {
      uid: 1,
      name: "sans",
    },
  });

  // validasi form
  if (!error.isEmpty()) {
    //vaidasi input
    res.status(400).json({
      message: "terdapat kesalahan input mohon dicek kembali",
      data: error.array(),
    });
  } else if (!req.file) {
    //validasi image
    res.status(402).json({
      message: "image wajib diupload",
      data: error.array(),
    });
  } else {
    //post data ke mongodb
    Post.save()
      .then((result) =>
        res.status(201).json({
          message: "Create Blog Success",
          data: result,
        })
      )
      .catch((err) => console.log("ERR : ", err));
  }
};

exports.getBlog = (req, res, next) => {
  blogPost
    .find()
    .then((result) => {
      res.status(200).json({
        message: "Get All Blog Success",
        data: result,
      });
    })
    .catch((err) => console.log(error));
};

exports.getBlogById = (req, res, next) => {
  const postId = req.params.idPost;
  blogPost
    .findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("data tidak ditemukan");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: "data ditemukan",
        data: result,
      });
    })
    .catch(() => {
      const error = new Error("data tidak ditemukan");
      error.status = 404;
      throw error;
    });
};

exports.updateBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;
  const idBlog = req.body.post_id;

  const data = {
    message: "Update Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: image,
      body: body,
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };

  res.status(201).json(data);
};

exports.deleteBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const body = req.body.body;

  const data = {
    message: "Delete Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: image,
      body: body,
      created_at: "21/03/2022",
      author: {
        uid: 1,
        name: "sans",
      },
    },
  };

  res.status(201).json(data);
  next(); //next digunakan untuk meneruskan ke fungsi method selanjutnya jika ada
};
