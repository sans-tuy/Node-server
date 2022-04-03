const { validationResult } = require("express-validator");
const blogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");

exports.postBlog = (req, res, next) => {
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const error = validationResult(req);

  // body request dari blogPost
  const Post = new blogPost({
    title: title,
    body: body,
    image: image,
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
  } else if (req.file === undefined) {
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
  let currentPage = req.query.page || 1;
  let perPage = req.query.perPage || 5;
  let totalData;

  blogPost
    .find()
    .countDocuments()
    .then((count) => {
      totalData = count;
      return blogPost
        .find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((result) => {
      res.status(200).json({
        message: "Get All Blog Success",
        data: result,
      });
    })
    .catch((err) => console.log(err));
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
    .catch((err) => {
      console.log(err);
    });
};

exports.updateBlog = (req, res, next) => {
  const postId = req.params.idPost;
  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const error = validationResult(req);

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
    blogPost
      .findById(postId)
      .then((result) => {
        result.title = title;
        result.image = image;
        result.body = body;
        return result.save();
      })
      .then((result) => {
        res.status(201).json({
          message: "Update Blog Berhasil",
          data: result,
        });
      })
      .catch((err) => console.log("err : ", err));
  }
};

exports.deleteBlog = (req, res, next) => {
  const postId = req.params.idPost;
  const removeImage = (pathImage) => {
    const linnk = path.join(__dirname, "../..", pathImage);
    fs.unlink(linnk, (err) => console.log("err: ", err));
  };

  blogPost
    .findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("data tidak ditemukan");
        error.status = 404;
        throw error;
      }
      removeImage(result.image);
      return blogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(201).json({
        message: "delete berhasil",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
